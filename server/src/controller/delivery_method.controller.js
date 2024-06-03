import pool from '../models/pg.js';
import {
    check_var,
    check_sort
} from '../models/help.funcs.js';

import { DelApi } from '../models/del.api';

class Delivery_method_controller {
    constructor () {

    }

    async create_delivery_method(req, res) {
        try {
            const { name, description, cost } = req.body;

            if (check_var(name) || check_var(cost))
                return res.status(403).json(`Request parameters are not correct:
                                            name: ${name},
                                            cost: ${cost}`);

            if (check_var(description)) description = "";
            
            const rows = await process.pg.query(`INSERT INTO delivery_methods ("name", "description", "cost")
                                                 VALUES ('${name}', '${description}', ${cost})
                                                 RETURNING *`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_delivery_method(req, res) {
        try {
            const { id } = req.params;
            let { name, description, cost } = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const data = await process.pg.query(`SELECT name, description, cost
                                                FROM delivery_methods
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw { message: "Delivery method dose not exist" };
            }

            if (check_var(name))
                name = data[0].name;
            if (check_var(description))
                description = data[0].description;
            if (check_var(cost))
                cost = data[0].cost;

            const rows = await process.pg.query(`UPDATE delivery_methods 
                                                SET name='${name}',
                                                    description='${description}',
                                                    cost=${cost},
                                                    updated_at=DEFAULT
                                                WHERE id=${ id }`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_delivery_method(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    DELETE FROM instrument2order
                                                    WHERE order_id IN (
                                                        SELECT id
                                                        FROM orders
                                                        WHERE delivery_method_id=${ id }
                                                    );
    
                                                    DELETE FROM orders
                                                    WHERE  delivery_method_id=${ id };
            
                                                    DELETE FROM delivery_methods
                                                    WHERE id=${ id };
                                                COMMIT;`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_delivery_methods(req, res) {
        try {
            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                cost: req.query.sort_cost,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });
            
            const rows = await process.pg.query(`SELECT id, name AS title, cost,
                                                        description, updated_at, created_at
                                                FROM delivery_methods
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_delivery_method_types(req, res) {
        try {
            const rows = await process.pg.query(`SELECT dm.name, COUNT(o.id)::int AS orders_num
                                                FROM orders o
                                                INNER JOIN delivery_methods dm
                                                ON o.delivery_method_id = dm.id
                                                GROUP BY dm.name`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_delivery_method(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT id, name AS title, cost,
                                                        description, updated_at, created_at
                                                FROM delivery_methods
                                                WHERE id = ${ id }`);

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async calculate_delivery(req, res) {
        try {
            const { city, address } = req.params;

            let list = [];
            let price = 0;
            let apiResponse = null;

            try {
                const api = new DelApi(1);

                apiResponse = api.calculate(city, 'г. Москва, ул. Пушкиснкая, д. 7', address, 0.875);
            } catch (e) {}

            res.status(200).json({
                'addresses': list,
                'price': price,
                'request': req,
                'response': apiResponse
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Delivery_method_controller();