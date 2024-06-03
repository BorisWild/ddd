import pool from '../models/pg.js';
import config from 'config'
import { delete_file } from "../models/fs.check.js"
import {
    check_var,
    check_sort
} from '../models/help.funcs.js';


class Element_controller {
    constructor () {

    }

    async create_element(req, res) {
        try {
            const {
                name, type,
                weigth, dimensions
            } = req.body;

            if (check_var(name) || check_var(type) ||
                check_var(weigth) || check_var(dimensions))
                return res.status(403).json(`Request parameters are not correct:
                                            name: ${name}, type: ${type},
                                            weigth: ${weigth}, dimensions: ${dimensions}`);

            let file = config.get("element.default_file_path");

            if (req?.file != null) {
                file = config.get("element.query_file_dir") + req.file.filename;
            }

            file = JSON.stringify({ "src": file });

            const rows = await process.pg.query(`INSERT INTO elements ("name", "type",
                                                                       "dimensions", "weigth", 
                                                                       "file")
                                                 VALUES ('${name}', ${type},
                                                         '${dimensions}', ${weigth},
                                                         '${file}')
                                                 RETURNING *`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_element(req, res) {
        try {
            const { id } = req.params;
            
            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            let {
                name, type,
                weight, dimensions
            } = req.body;
            

            const data = await process.pg.query(`SELECT file, name, type,
                                                        weight, dimensions
                                                    FROM elements
                                                    WHERE id=${ id }`);
            
            if (data[0] == null) {
                throw {message: "Element dose not exist"};
            }

            if (check_var(name))
                name = data[0].name;
            if (check_var(type))
                type = data[0].type;
            if (check_var(weight))
                weight = data[0].weight;
            if (check_var(dimensions))
                dimensions = data[0].dimensions;

            let file = data[0].file;

            if (req.file != null) {
                file = config.get("element.query_file_dir") + req.file.filename;
                file = JSON.stringify({ "src": file });
                delete_file(data[0].file, config.get("element.default_file_path"));
            }

            const rows = await process.pg.query(`UPDATE elements
                                                SET name='${name}', type='${type}',
                                                    weight=${weight},
                                                    dimensions='${dimensions}',
                                                    file='${file}', updated_at=DEFAULT
                                                WHERE id=${ id }`);
            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_element(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const data = await process.pg.query(`SELECT file
                                                FROM elements
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw {message: "Element dose Not exist"};
            }
                
            delete_file(data[0].file, config.get("element.default_file_path"));

            const rows = await process.pg.query(`DELETE FROM elements
                                                WHERE id=${ id }`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_elements(req, res) {
        try {
            let { type, page } = req.query;
            let fetch = 'FETCH FIRST 10 ROW ONLY';

            if (check_var(page)) {
                page = 1;
                fetch = '';
            }

            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                weight: req.query.sort_weight,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT id, name AS title, type,
                                                        file, weight, dimensions,
                                                        updated_at, created_at
                                                FROM elements
                                                WHERE type = (
                                                    CASE
                                                        WHEN '${type}' = 'undefined' THEN type
                                                        ELSE '${type}'
                                                    END
                                                )
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                ${fetch}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_one_element(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT id, name AS title, file,
                                                        weight, updated_at, created_at
                                                FROM elements
                                                WHERE id = ${ id }`);
            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Element_controller();