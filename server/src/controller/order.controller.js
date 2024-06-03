import {
    check_var,
    check_sort
} from '../models/help.funcs.js';
import { send_file_by_mail } from '../models/mailer.js';


async function send_order_email(id, email, user_name, file, theme,
                                status = null) {
    const mail_data = await process.pg.query(`WITH i AS (
                                            SELECT i.name, i.image, i.comment, i.cost,
                                                    io.quantity 
                                            FROM instrument2order io
                                            INNER JOIN instruments i
                                            ON io.instrument_id = i.id
                                            WHERE io.order_id = ${id}
                                        ), p AS (
                                            SELECT se.solution_id AS se_sol_id, se.quantity AS se_quantity,
                                                    et.cost AS et_cost, e.name AS e_name, t.image AS t_image
                                            FROM solution2element se
                                            INNER JOIN element2texture et
                                            ON et.id = se.element2texture_id
                                            INNER JOIN elements e
                                            ON e.id = et.element_id
                                            INNER JOIN textures t
                                            ON t.id = et. texture_id
                                        )
                                        
                                        SELECT o.id, o.status, SUM((
                                                    SELECT COALESCE(SUM(cost * quantity), 0)
                                                    FROM i
                                                ) + (
                                                    SELECT COALESCE(SUM(et_cost * se_quantity), 0)
                                                    FROM p
                                                    WHERE se_sol_id = o.solution_id
                                                ) + COALESCE(dlr.cost, 0))::int AS price, pmt.name AS payment_name, dlr.name AS delivery_name,
                                                COALESCE(o.comment, '') AS comment, dlr.cost::int AS delivery_price, s.weight,
                                                COALESCE((
                                                    SELECT array_agg(json_strip_nulls(json_build_object(
                                                            'quantity', quantity, 'cost', cost,
                                                            'name', name, 'image', image, 'comment', comment
                                                        )))
                                                    FROM i
                                                ), '{}') AS instruments,
                                                COALESCE((
                                                    SELECT SUM(se_quantity)
                                                    FROM p
                                                    WHERE se_sol_id = o.solution_id
                                                )::int, 0) AS parts_number,
                                                json_build_object('city', o.city, 'street', o.street,
                                                'building', o.building, 'flat', o.flat) AS address,
                                                o.solution_id, o.updated_at, o.created_at,
                                                s.name, s.image, s.length, s.height, s.width
                                        FROM orders o
                                        LEFT JOIN solution s
                                        ON s.id = o.solution_id
                                        INNER JOIN delivery_methods dlr
                                        ON o.delivery_method_id = dlr.id
                                        INNER JOIN payment_methods pmt
                                        ON o.payment_method_id = pmt.id
                                        WHERE o.id = ${id}
                                        GROUP BY o.id, pmt.name, dlr.name, dlr.cost, s.weight,
                                            s.name, s.image, s.length, s.height, s.width`);

    let updated_at = new Date(mail_data[0].updated_at)

    const month_names = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    console.log(mail_data[0].instruments)

    const mail = send_file_by_mail(email, file, theme, {
        "{full_name}": user_name,
        "{id}": mail_data[0].id,
        "{month}": month_names[updated_at.getMonth()],
        "{year}": updated_at.getFullYear(),
        "{day}": updated_at.getDate(),
        "{solution_name}": mail_data[0].name,
        "{comment}": mail_data[0].comment,
        "{payment_method}": mail_data[0].payment_name,
        "{delivery_method}": mail_data[0].delivery_name,
        "{status}": (status) ? status : mail_data[0].status,
        "{solution_src}": "https://drimo.dev-2-tech.ru:4321/" + JSON.parse(mail_data[0].image).src,
        "{length}": mail_data[0].length,
        "{height}": mail_data[0].height,
        "{width}": mail_data[0].width,
        "{solution_price}": (mail_data[0].price - mail_data[0].delivery_price),
        "{delivery_price}": mail_data[0].delivery_price,
        "{weight}": mail_data[0].weight / 1000,
        "{parts_number}": mail_data[0].parts_number,
        "{general_cost}": mail_data[0].price,
        "{instrument_object}": mail_data[0].instruments
    })

    if (!mail.success)
        return {
            code: 500,
            message: mail.message
        }

    return {
        code: 200,
        message: "Success"
    }
}

class Order_controller {
    constructor() {

    }

    async create_order(req, res) {
        try {
            const { solution_id, status, city, email,
                    street, building, flat, user_name,
                    payment_id, delivery_id, user_id, comment } = req.body;

            if (check_var(solution_id) || check_var(status) ||
                check_var(city) || check_var(street) ||
                check_var(building) || check_var(flat) ||
                check_var(payment_id) || check_var(delivery_id) ||
                check_var(user_id) || check_var(comment) ||
                check_var(user_name) || check_var(email))
                return res.status(403).json(`Request parameters are not correct:
                                            solution_id: ${solution_id}, status: ${status},
                                            city: ${city}, street: ${street},
                                            building: ${building}, flat: ${flat},
                                            payment_id: ${payment_id}, delivery_id: ${delivery_id},
                                            user_id: ${user_id}, comment: ${comment}`);

            const rows = await process.pg.query(`INSERT INTO orders ("solution_id", "status", "city",
                                                                    "street", "building", "flat",
                                                                    "payment_method_id", "delivery_method_id", 
                                                                    "user_id", "comment", "user_name", "email")
                                                VALUES (${solution_id}, '${status}', '${city}',
                                                        '${street}', '${building}', '${flat}',
                                                        ${payment_id}, ${delivery_id}, ${user_id},
                                                        '${comment}', '${user_name}', '${email}')
                                                RETURNING id`);

            let mail_data = await send_order_email(
                rows[0].id, email, user_name, "order.html", "Информация о заказе"
            );

            res.status(mail_data.code).json({ message: mail_data.message });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_order(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            let { solution_id, status, city, 
                    street, building, flat, comment,
                    payment_id, delivery_id, user_id } = req.body;

            const data = await process.pg.query(`SELECT solution_id, status, city, 
                                                        street, building, flat,
                                                        payment_method_id, delivery_method_id,
                                                        user_id, comment, email, user_name
                                                FROM orders
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw  { error: "Order dose not exist" };
            }

            if (!check_var(status) && status != data[0].status) {
                let mail_data = await send_order_email(
                    id, data[0].email, data[0].user_name, "status.html",
                    "Информация о заказе", status
                );

                if (mail_data.code != 200) {
                    return res.status(mail_data.code).json({ message: mail_data.message });
                }
            }


            if (check_var(solution_id))
                solution_id = data[0].solution_id;
            if (check_var(status))
                status = data[0].status;
            if (check_var(city))
                city = data[0].city;
            if (check_var(street))
                street = data[0].street;
            if (check_var(building))
                building = data[0].building;
            if (check_var(flat))
                flat = data[0].flat;
            if (check_var(payment_id))
                payment_id = data[0].payment_id;
            if (check_var(delivery_id))
                delivery_id = data[0].delivery_id;
            if (check_var(user_id))
                user_id = data[0].user_id;
            if (check_var(comment))
                user_id = data[0].comment;

            const rows = await process.pg.query(`UPDATE orders 
                                                SET solution_id=${solution_id}, status='${status}',
                                                    city='${city}', payment_method_id=${payment_id},
                                                    delivery_method_id=${delivery_id}, user_id=${user_id},
                                                    street='${street}', building='${building}', flat='${flat}',
                                                    comment='${comment}', updated_at=DEFAULT
                                                WHERE id=${ id }`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_order_status(req, res) {
        try {
            const rows = await process.pg.query(`SELECT status, COUNT(id)::int AS orders_num
                                                FROM orders
                                                GROUP BY status`);
    
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }


    async delete_order(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: length: id: ${id}`);

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                
                                                DELETE FROM instrument2order
                                                WHERE order_id = ${ id };

                                                DELETE FROM orders
                                                WHERE id=${ id };
                                                
                                                COMMIT;`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_orders(req, res) {
        try {
            let { page, status_type, delivery_type, payment_type } = req.query;
            
            const sort = check_sort({
                id: req.query.sort_id,
                solution_name: req.query.sort_solution_name,
                solution_id: req.query.sort_solution_id,
                status: req.query.sort_status,
                price: req.query.sort_price,
                payment_method_name: req.query.sort_payment_name,
                delivery_method_name: req.query.sort_delivery_name,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            if (!check_var(status_type)) {
                if (Array.isArray(status_type)) {
                    status_type = status_type.join(',');
                }
            }
            if (!check_var(delivery_type)) {
                if (Array.isArray(delivery_type)) {
                    delivery_type = delivery_type.join(',');
                }
            }
            if (!check_var(payment_type)) {
                if (Array.isArray(payment_type)) {
                    payment_type = payment_type.join(',');
                }
            }
            if (check_var(page)) page = 1;
            
            const rows = await process.pg.query(`SELECT o.id, s.name AS solution_name, o.solution_id, o.status,
                                                        (
                                                            SELECT COALESCE(SUM(se.quantity * et.cost) + (
                                                                SELECT cost AS price
                                                                FROM delivery_methods
                                                                WHERE id = o.delivery_method_id
                                                            ), 0)::int AS price
                                                            FROM solution2element se
                                                            INNER JOIN element2texture et
                                                            ON et.id = se.element2texture_id
                                                            WHERE se.solution_id = o.solution_id
                                                        ) AS price, pmt.name AS payment_method_name,
                                                        dlr.name AS delivery_method_name,
                                                        json_build_object('city', o.city, 'street', o.street,
                                                        'building', o.building, 'flat', o.flat) AS address,
                                                        o.comment, o.updated_at, o.created_at, (
                                                            SELECT COUNT(*)
                                                            FROM orders o
                                                            LEFT JOIN solution s
                                                            ON s.id = o.solution_id
                                                            INNER JOIN delivery_methods dlr
                                                            ON o.delivery_method_id = dlr.id
                                                            INNER JOIN payment_methods pmt
                                                            ON o.payment_method_id = pmt.id
                                                            WHERE o.status = ANY (string_to_array((
                                                                CASE 
                                                                    WHEN '${status_type}'!='undefined' THEN '${status_type}'
                                                                    ELSE o.status
                                                                END
                                                            ), ',')::text[]) AND dlr.name = ANY (string_to_array((
                                                                CASE 
                                                                    WHEN '${delivery_type}'!='undefined' THEN '${delivery_type}'
                                                                    ELSE dlr.name
                                                                END
                                                            ), ',')::text[]) AND pmt.name = ANY (string_to_array((
                                                                CASE 
                                                                    WHEN '${payment_type}'!='undefined' THEN '${payment_type}'
                                                                    ELSE pmt.name
                                                                END
                                                            ), ',')::text[])
                                                        )::int AS total
                                                FROM orders o
                                                LEFT JOIN solution s
                                                ON s.id = o.solution_id
                                                INNER JOIN delivery_methods dlr
                                                ON o.delivery_method_id = dlr.id
                                                INNER JOIN payment_methods pmt
                                                ON o.payment_method_id = pmt.id
                                                WHERE o.status = ANY (string_to_array((
                                                    CASE 
                                                        WHEN '${status_type}'!='undefined' THEN '${status_type}'
                                                        ELSE o.status
                                                    END
                                                ), ',')::text[]) AND dlr.name = ANY (string_to_array((
                                                    CASE 
                                                        WHEN '${delivery_type}'!='undefined' THEN '${delivery_type}'
                                                        ELSE dlr.name
                                                    END
                                                ), ',')::text[]) AND pmt.name = ANY (string_to_array((
                                                    CASE 
                                                        WHEN '${payment_type}'!='undefined' THEN '${payment_type}'
                                                        ELSE pmt.name
                                                    END
                                                ), ',')::text[])
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                FETCH FIRST 10 ROW ONLY`);

            let total = 0;
            if (rows[0]?.total) {
                total = rows[0].total;

                for (let i in rows) {
                    delete rows[i].total;
                }
            }

            res.status(200).json({rows: rows, total: total});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_private_orders(req, res) {
        try {
            const rows = await process.pg.query(`SELECT o.id, s.image AS solution_image, o.status,
                                                        (
                                                            SELECT COALESCE(SUM(se.quantity * et.cost), 0)::int + 
                                                            (
                                                                SELECT COALESCE(cost, 0)::int AS price
                                                                FROM delivery_methods
                                                                WHERE id = o.delivery_method_id
                                                            )::int AS price
                                                            FROM solution2element se
                                                            INNER JOIN element2texture et
                                                            ON et.id = se.element2texture_id
                                                            WHERE se.solution_id = o.solution_id
                                                        ) AS price, o.comment, o.updated_at, o.created_at
                                                FROM orders o
                                                LEFT JOIN solution s
                                                ON s.id = o.solution_id
                                                WHERE o.user_id=${req.id}`);
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_private_order(req, res) {
        try {
            let { id } = req.params;
            
            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            req.id = req.headers["id"];
            const rows = await process.pg.query(`WITH i AS (
                                                    SELECT i.name, i.image, i.comment, i.cost,
                                                            io.quantity 
                                                    FROM instrument2order io
                                                    INNER JOIN instruments i
                                                    ON io.instrument_id = i.id
                                                    WHERE io.order_id = ${id}
                                                ), p AS (
                                                    SELECT se.solution_id AS se_sol_id, se.quantity AS se_quantity,
                                                            et.cost AS et_cost, e.name AS e_name, t.image AS t_image
                                                    FROM solution2element se
                                                    INNER JOIN element2texture et
                                                    ON et.id = se.element2texture_id
                                                    INNER JOIN elements e
                                                    ON e.id = et.element_id
                                                    INNER JOIN textures t
                                                    ON t.id = et. texture_id
                                                )
                                                
                                                SELECT o.id, o.status, SUM((
                                                            SELECT COALESCE(SUM(cost * quantity), 0)
                                                            FROM i
                                                        ) + (
                                                            SELECT COALESCE(SUM(et_cost * se_quantity), 0)
                                                            FROM p
                                                            WHERE se_sol_id = o.solution_id
                                                        ) + COALESCE(dlr.cost, 0))::int AS price, pmt.name AS payment_name, dlr.name AS delivery_name,
                                                        COALESCE(o.comment, '') AS comment, dlr.cost::int AS delivery_price, s.weight, 
                                                        COALESCE((
                                                            SELECT array_agg(json_strip_nulls(json_build_object(
                                                                    'quantity', se_quantity, 'cost', et_cost,
                                                                    'name', e_name, 'image', t_image
                                                                )))
                                                            FROM p
                                                            WHERE se_sol_id = o.solution_id
                                                        ), '{}') AS parts,
                                                        COALESCE((
                                                            SELECT SUM(se_quantity)
                                                            FROM p
                                                            WHERE se_sol_id = o.solution_id
                                                        )::int, 0) AS parts_number,
                                                        COALESCE((
                                                            SELECT array_agg(json_strip_nulls(json_build_object(
                                                                    'quantity', quantity, 'cost', cost,
                                                                    'name', name, 'image', image, 'comment', comment
                                                                )))
                                                            FROM i
                                                        ), '{}') AS instruments,
                                                        json_build_object('city', o.city, 'street', o.street,
                                                        'building', o.building, 'flat', o.flat) AS address,
                                                        o.solution_id, o.updated_at, o.created_at
                                                FROM orders o
                                                LEFT JOIN solution s
                                                ON s.id = o.solution_id
                                                INNER JOIN delivery_methods dlr
                                                ON o.delivery_method_id = dlr.id
                                                INNER JOIN payment_methods pmt
                                                ON o.payment_method_id = pmt.id
                                                WHERE o.user_id=${req.id} AND o.id = ${id}
                                                GROUP BY o.id, pmt.name, dlr.name, dlr.cost, s.weight`);
            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_order_by_id(req, res) {
        try {
            let { id } = req.params;
            
            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`WITH i AS (
                                                    SELECT i.name, i.image, i.comment, i.cost,
                                                            io.quantity 
                                                    FROM instrument2order io
                                                    INNER JOIN instruments i
                                                    ON io.instrument_id = i.id
                                                    WHERE io.order_id = ${id}
                                                ), p AS (
                                                    SELECT se.solution_id AS se_sol_id, se.quantity AS se_quantity,
                                                            et.cost AS et_cost, e.name AS e_name, t.image AS t_image
                                                    FROM solution2element se
                                                    INNER JOIN element2texture et
                                                    ON et.id = se.element2texture_id
                                                    INNER JOIN elements e
                                                    ON e.id = et.element_id
                                                    INNER JOIN textures t
                                                    ON t.id = et. texture_id
                                                )
                                                
                                                SELECT o.id, o.status, SUM((
                                                            SELECT COALESCE(SUM(cost * quantity), 0)
                                                            FROM i
                                                        ) + (
                                                            SELECT COALESCE(SUM(et_cost * se_quantity), 0)
                                                            FROM p
                                                            WHERE se_sol_id = o.solution_id
                                                        ) + COALESCE(dlr.cost, 0))::int AS price, pmt.name AS payment_name, dlr.name AS delivery_name,
                                                        COALESCE(o.comment, '') AS comment, dlr.cost::int AS delivery_price, s.weight, 
                                                        COALESCE((
                                                            SELECT array_agg(json_strip_nulls(json_build_object(
                                                                    'quantity', se_quantity, 'cost', et_cost,
                                                                    'name', e_name, 'image', t_image
                                                                )))
                                                            FROM p
                                                            WHERE se_sol_id = o.solution_id
                                                        ), '{}') AS parts,
                                                        COALESCE((
                                                            SELECT SUM(se_quantity)
                                                            FROM p
                                                            WHERE se_sol_id = o.solution_id
                                                        )::int, 0) AS parts_number,
                                                        COALESCE((
                                                            SELECT array_agg(json_strip_nulls(json_build_object(
                                                                    'quantity', quantity, 'cost', cost,
                                                                    'name', name, 'image', image, 'comment', comment
                                                                )))
                                                            FROM i
                                                        ), '{}') AS instruments,
                                                        json_build_object('city', o.city, 'street', o.street,
                                                        'building', o.building, 'flat', o.flat) AS address,
                                                        o.solution_id, o.updated_at, o.created_at, o.user_name,
                                                        o.email, u.phone
                                                FROM orders o
                                                LEFT JOIN solution s
                                                ON s.id = o.solution_id
                                                INNER JOIN delivery_methods dlr
                                                ON o.delivery_method_id = dlr.id
                                                INNER JOIN payment_methods pmt
                                                ON o.payment_method_id = pmt.id
                                                INNER JOIN users u
                                                ON u.id = o.user_id
                                                WHERE o.id = ${id}
                                                GROUP BY o.id, pmt.name, dlr.name, dlr.cost, s.weight,
                                                        o.user_name, o.email, u.phone`);
            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_order(req, res) {
        try {
            const { user_id } = req.params;

            if (check_var(user_id))
                return res.status(403).json(`Request parameters are not correct: user_id: ${user_id}`);

            const sort = check_sort({
                id: req.query.sort_id,
                solution_name: req.query.sort_solution_name,
                solution_id: req.query.sort_solution_id,
                status: req.query.sort_status,
                price: req.query.sort_price,
                payment_method_id: req.query.sort_payment_id,
                delivery_method_id: req.query.sort_delivery_id,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });
            
            const rows = await process.pg.query(`SELECT o.id, s.name AS solution_name, o.solution_id, o.status,
                                                        (
                                                            SELECT COALESCE(SUM(se.quantity * et.cost), 0)::int + COALESCE((
                                                                SELECT cost AS price
                                                                FROM delivery_methods
                                                                WHERE id = o.delivery_method_id
                                                            ), 0)::int AS price
                                                            FROM solution2element se
                                                            INNER JOIN element2texture et
                                                            ON et.id = se.element2texture_id
                                                            WHERE se.solution_id = o.solution_id
                                                        ) AS price, dlr.name AS payment_method_name,
                                                        pmt.name AS delivery_method_name,
                                                        json_build_object('city', o.city, 'street', o.street,
                                                        'building', o.building, 'flat', o.flat) AS address,
                                                        o.comment, o.updated_at, o.created_at
                                                FROM orders o
                                                LEFT JOIN solution s
                                                ON s.id = o.solution_id
                                                INNER JOIN delivery_methods dlr
                                                ON o.delivery_method_id = dlr.id
                                                INNER JOIN payment_methods pmt
                                                ON o.payment_method_id = pmt.id
                                                WHERE o.user_id=${user_id}
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Order_controller();