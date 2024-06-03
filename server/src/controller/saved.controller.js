import pool from '../models/pg.js';
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';
import { send_file_by_mail } from '../models/mailer.js';

class Saved_controller {
    constructor() {
        
    }

    async create_saved(req, res) {
        try {
            const { solution_id } = req.body;

            if (check_var(solution_id))
                return res.status(403).json(`Request parameters are not correct:
                                            solution_id: ${solution_id}`);

            const rows = await process.pg.query(`INSERT INTO saved ("user_id", "solution_id")
                                                 VALUES (${req.id}, ${solution_id})
                                                 RETURNING id`);

            const info = await process.pg.query(`WITH p AS (
                                                    SELECT se.solution_id AS se_sol_id,
                                                            se.quantity AS se_quantity,
                                                            et.cost AS et_cost
                                                    FROM solution2element se
                                                    INNER JOIN element2texture et
                                                    ON et.id = se.element2texture_id
                                                )
                                                
                                                SELECT u.email, u.full_name, sol.image,
                                                        s.updated_at, sol.name, sol.length,
                                                        sol.height, sol.width, SUM((
                                                            SELECT COALESCE(SUM(et_cost * se_quantity), 0)
                                                            FROM p
                                                            WHERE se_sol_id = s.solution_id
                                                        ))::int AS price
                                                FROM saved s
                                                INNER JOIN users u
                                                ON u.id = s.user_id
                                                INNER JOIN solution sol
                                                ON sol.id = s.solution_id
                                                WHERE s.id=${rows[0].id}
                                                GROUP BY u.email, u.full_name, sol.image,
                                                        s.updated_at, sol.name, sol.length,
                                                        sol.height, sol.width`);

            console.log(info)

            if (info[0]?.email) {
                let updated_at = new Date(info[0].updated_at)

                const month_names = [
                    "января", "февраля", "марта", "апреля", "мая", "июня",
                    "июля", "августа", "сентября", "октября", "ноября", "декабря"
                ];

                const mail = send_file_by_mail(info[0].email, 
                    "saved.html", "Изменение данных", {
                    "{full_name}": info[0].full_name,
                    "{month}": month_names[updated_at.getMonth()],
                    "{year}": updated_at.getFullYear(),
                    "{day}": updated_at.getDate(),
                    "{solution_src}": "https://drimo.dev-2-tech.ru:4321/" + JSON.parse(info[0].image).src,
                    "{solution_name}": info[0].name,
                    "{length}": info[0].length,
                    "{height}": info[0].height,
                    "{width}": info[0].width,
                    "{solution_price}": info[0].price
                })

                if (!mail.success)
                    return res.status(500).json({message: mail.message})
            }

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_saved(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`DELETE FROM saved
                                                WHERE id=${ id }`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_types(req, res) {
        try {
            const rows = await process.pg.query(`SELECT sub.name AS type, COUNT(*) as solution_num
                                                FROM saved s
                                                INNER JOIN solution sol
                                                ON sol.id = s.solution_id
                                                INNER JOIN subcategories sub
                                                ON sub.id = sol.subcategory_id
                                                WHERE s.user_id = ${req.id}
                                                GROUP BY sub.name`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_all_saved(req, res) {
        try {
            const { type, page } = req.query;
            let fetch = 'FETCH FIRST 10 ROW ONLY';

            if (check_var(page)) {
                page = 1;
            }

            if (check_var(type)) {
                fetch = '';
            }

            const rows = await process.pg.query(`SELECT s.id, sol.id AS solution_id, sol.name AS title,
                                                        sol.image, sol.height, sol.width, sol.length,
                                                        s.created_at, s.updated_at, (
                                                            SELECT COUNT(*)
                                                            FROM saved s
                                                            INNER JOIN solution sol
                                                            ON sol.id = s.solution_id
                                                            INNER JOIN subcategories sub
                                                            ON sub.id = sol.subcategory_id
                                                            WHERE s.user_id = ${req.id} AND
                                                                sub.name = (
                                                                    CASE 
                                                                        WHEN '${type}'!='undefined' THEN '${type}'
                                                                        ELSE sub.name
                                                                    END
                                                                )
                                                        )::int AS total
                                                FROM saved s
                                                INNER JOIN solution sol
                                                ON sol.id = s.solution_id
                                                INNER JOIN subcategories sub
                                                ON sub.id = sol.subcategory_id
                                                WHERE s.user_id = ${req.id} AND
                                                    sub.name = (
                                                        CASE 
                                                            WHEN '${type}'!='undefined' THEN '${type}'
                                                            ELSE sub.name
                                                        END
                                                    )
                                                OFFSET ${(page - 1) * 10} ROWS
                                                ${fetch}`);
                                                        
            let total = 0;
            if (rows[0]?.total)  {
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

    async get_manager_saved(req, res) {
        try {
            const { page } = req.query;
            const { user_id } = req.params;

            if (check_var(user_id))
                return res.status(403).json(`Request parameters are not correct: user_id: ${user_id}`);

            if (check_var(page)) {
                page = 1;
            }

            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                length: req.query.sort_length,
                width: req.query.sort_width,
                weight: req.query.sort_weight,
                height: req.query.sort_height,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });
            
            const rows = await process.pg.query(`SELECT s.id, sol.id AS solution_id, sol.name AS title,
                                                        sol.image, sol.height, sol.weight, sol.width,
                                                        sol.length, s.created_at, s.updated_at
                                                FROM saved s
                                                INNER JOIN solution sol
                                                ON sol.id = s.solution_id
                                                INNER JOIN subcategories sub
                                                ON sub.id = sol.subcategory_id
                                                WHERE s.user_id = ${user_id}
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                FETCH FIRST 10 ROW ONLY`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_saved(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT s.id, sol.id AS solution_id, sol.name AS title,
                                                            sol.image, sol.height, sol.width, sol.length
                                                    FROM saved s
                                                    INNER JOIN solution sol
                                                    ON sol.id = s.solution_id
                                                    WHERE s.user_id = ${req.id} AND
                                                        s.id = ${id}`);

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Saved_controller();