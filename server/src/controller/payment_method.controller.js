import pool from '../models/pg.js';
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Payment_method_controller {
    constructor() {

    }

    async create_payment_method(req, res) {
        try {
            const { name, description } = req.body;

            if (check_var(name))
                return res.status(403).json(`Request parameters are not correct:
                                            name: ${name}`);

            if (check_var(description)) description = "";

            const rows = await process.pg.query(`INSERT INTO payment_methods ("name", "description")
                                                 VALUES ('${name}', '${description}')
                                                 RETURNING *`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_payment_method(req, res) {
        try {
            const { id } = req.params;
            let { name, description } = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: name: ${id}`);

            const data = await process.pg.query(`SELECT name, description
                                                FROM payment_methods
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw  { error: "Payment method dose not exist" };
            }

            if (check_var(name))
                name = data[0].name;
            if (check_var(description))
                description = data[0].description;

            const rows = await process.pg.query(`UPDATE payment_methods 
                                                SET name='${name}',
                                                    description='${description}',
                                                    updated_at=DEFAULT
                                                WHERE id=${ id }`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_payment_method_types(req, res) {
        try {
            const rows = await process.pg.query(`SELECT pm.name, COUNT(o.id)::int AS orders_num
                                                FROM orders o
                                                INNER JOIN payment_methods pm
                                                ON o.payment_method_id = pm.id
                                                GROUP BY pm.name`);

                                                
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_payment_method(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    DELETE FROM instrument2order
                                                    WHERE order_id IN (
                                                        SELECT id
                                                        FROM orders
                                                        WHERE payment_method_id=${ id }
                                                    );
    
                                                    DELETE FROM orders
                                                    WHERE payment_method_id=${ id };

                                                    DELETE FROM payment_methods
                                                    WHERE id=${ id };
                                                COMMIT;`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_payment_methods(req, res) {
        try {
            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });
            
            const rows = await process.pg.query(`SELECT id, name AS title,
                                                        description, updated_at, created_at
                                                FROM payment_methods
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_payment_method(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT id, name AS title,
                                                        description, updated_at, created_at
                                                FROM payment_methods
                                                WHERE id = ${ id }`);

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Payment_method_controller();