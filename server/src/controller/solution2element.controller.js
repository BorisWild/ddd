import pool from '../models/pg.js';
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Solution2element_controller {
    constructor () {

    }

    async create_solution2element(req, res) {
        try {
            const { element2texture_id, solution_id, quantity } = req.body;

            if (check_var(element2texture_id) ||
                check_var(solution_id) ||
                check_var(quantity))
                return res.status(403).json(`Request parameters are not correct:
                                            element2texture_id: ${element2texture_id},
                                            solution_id: ${solution_id},
                                            quantity: ${quantity}`);

            const rows = await process.pg.query(`INSERT INTO solution2element ("element2texture_id", "solution_id", "quantity") \
                                                 VALUES (${element2texture_id}, ${solution_id}, ${quantity}) \
                                                 RETURNING *`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_solution2element(req, res) {
        try {
            const { id } = req.params;
            let { element2texture_id, solution_id, quantity } = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const data = await process.pg.query(`SELECT element2texture_id, solution_id, quantity
                                                FROM solution2element
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw { message: "Solution2element dose not exist" };
            }

            if (check_var(element2texture_id)) {
                element2texture_id = data[0].element2texture_id;
            }
            if (check_var(solution_id)) {
                solution_id = data[0].solution_id;
            }
            if (check_var(quantity)) {
                quantity = data[0].quantity;
            }

            const rows = await process.pg.query(`UPDATE solution2element
                                                SET element2texture_id=${element2texture_id},
                                                    solution_id=${solution_id},
                                                    quantity=${quantity},
                                                    updated_at=DEFAULT
                                                WHERE id=${ id }`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_solution2element(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`DELETE FROM solution2element
                                                WHERE id=${ id }`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_solution_solution2element(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`DELETE FROM solution2element
                                                WHERE solution_id=${ id }`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_solution2elements(req, res) {
        try {
            let { page } = req.query;

            const sort = check_sort({
                id: req.query.sort_id,
                element2texture_id: req.query.sort_element2texture_id,
                solution_id: req.query.sort_solution_id
            });

            if (check_var(page)) {
                page = 1;
            }
            
            const rows = await process.pg.query(`SELECT * FROM solution2element
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                FETCH FIRST 10 ROW ONLY`);
            const total = await process.pg.query(`SELECT COUNT(*) FROM solution2element`);

            res.status(200).json({rows: rows, total: total[0]});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_solution2element(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT *
                                                FROM solution2element
                                                WHERE id=${ id }`);
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Solution2element_controller();