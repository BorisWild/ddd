import pool from '../models/pg.js';
import {
    check_sort,
    check_var
} from '../models/help.funcs.js';

class Element2texture_controller {
    constructor () {

    }

    async create_element2texture(req, res) {
        try {
            const { element_id, texture_id, cost } = req.body;

            if (check_var(element_id) || check_var(element_id) ||
                check_var(cost) || cost >= 10e8)
                return res.status(403).json(`Requested params are not correct: element_id: ${element_id}, element_id: ${element_id}, cost: ${cost}`);

            const rows = await process.pg.query(`INSERT INTO element2texture ("element_id", "texture_id", "cost")
                                                 VALUES (${element_id}, ${texture_id}, ${cost})
                                                 RETURNING *`);
            

            res.status(200).json({message: "Success"});
        } catch (e) {
            console.log(e)
            return res.status(500).json(e);
        }
    }

    async update_element2texture(req, res) {
        try {
            const { id } = req.params;
            let { cost } = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);
 
            const data = await process.pg.query(`SELECT e.file, et.cost
                                                 FROM element2texture et
                                                 LEFT JOIN elements e
                                                 ON e.id = et.element_id
                                                 WHERE et.id = ${ id }`);
                                            
            if (data[0] == null) {
                throw {message: "Element2texture dose not exist"};
            }

            if (check_var(cost)) {
                cost = data[0].cost;
            }

            let file = data[0].file;

            if (req?.file != null) {
                file = req.file.path;
                file = JSON.stringify({ "src": file });
                delete_file(data[0].file, config.get("element.default_file_path"));
            }

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    UPDATE element2texture
                                                    SET cost=${ cost }
                                                    WHERE id=${ id };

                                                    UPDATE elements
                                                    SET file = '${ file }',
                                                        updated_at=DEFAULT
                                                    WHERE id IN (
                                                        SELECT e.id
                                                        FROM element2texture et
                                                        LEFT JOIN elements e
                                                        ON et.element_id = e.id
                                                        WHERE et.id =${ id }
                                                    );
                                                COMMIT`);
            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_element2texture(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);
 
            const rows = await process.pg.query(`SELECT *
                                                FROM element2texture
                                                WHERE id=${ id }`);
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_element2texture(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`DELETE FROM element2texture \
                                                WHERE id=${ id }`);
            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_element2textures(req, res) {
        try {
            let { page } = req.query;
            let fetch = 'FETCH FIRST 10 ROW ONLY';
                
            if (check_var(page)) {
                page = 1;
                fetch = '';
            }

            const sort = check_sort({
                id: req.query.sort_id,
                element_id: req.query.sort_element_id,
                texture_id: req.query.sort_texture_id
            });
            
            const rows = await process.pg.query(`SELECT id, element_id, texture_id, cost::int
                                                FROM element2texture
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                ${fetch}`);
            const total = await process.pg.query(`SELECT COUNT(*) FROM element2texture`);

            res.status(200).json({rows: rows, total: total[0]});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_element2textures_by_texture(req, res) {
        try {
            const {texture_id} = req.params;

            if (check_var(texture_id))
                return res.status(403).json(`Request parameters are not correct: id: ${texture_id}`);

            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                weight: req.query.sort_weight,
                cost: req.query.sort_cost,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT et.id, e.name AS title, e.weight, et.cost,
                                                        e.file AS scan, e.updated_at, e.created_at
                                                FROM element2texture et
                                                LEFT JOIN elements e
                                                ON et.element_id = e.id
                                                WHERE texture_id=${texture_id}
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Element2texture_controller();