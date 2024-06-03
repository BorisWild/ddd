import pool from '../models/pg.js';
import { delete_file } from "../models/fs.check.js";
import config from "config";
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Subcategory_controller {
    constructor () {

    }

    async create_subcategory(req, res) {
        try {
            const { title, parent_id } = req.body;
            let video = config.get("subcategory.default_file_path");

            if (check_var(title) ||
                check_var(parent_id))
                return res.status(403).json(`Request parameters are not correct:
                                        parent_id: ${parent_id}, title: ${title}`);

            if (req?.file != null) {
                video = config.get("subcategory.query_file_dir") + req.file.filename;
            }

            video = JSON.stringify({ "src": video });

            const rows = await process.pg.query(`INSERT INTO subcategories ("name", "video_link", "category_id")
                                                 VALUES ('${title}', '${video}', ${parent_id})
                                                 RETURNING *`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_subcategory(req, res) {
        try {
            const { id } = req.params;
            let { title, parent_id } = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const data = await process.pg.query(`SELECT video_link, name, category_id
                                                FROM subcategories
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw { message: "Subcategory dose not exist" };
            }

            if (check_var(title)) {
                title = data[0].name;
            }
            if (check_var(parent_id)) {
                parent_id = data[0].parent_id;
            }

            let video = data[0].video_link;

            if (req?.file != null) {
                video = config.get("subcategory.query_file_dir") + req.file.filename;
                video = JSON.stringify({ "src": video });
                delete_file(data[0].video_link, config.get("subcategory.default_file_path"));
            }

            const rows = await process.pg.query(`UPDATE subcategories
                                                SET name='${ title }',
                                                    video_link='${ video }',
                                                    category_id='${ parent_id }',
                                                    updated_at=DEFAULT
                                                WHERE id=${ id }`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_subcategory(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct:
                                        parent_id: id: ${id}`);

            const data = await process.pg.query(`SELECT video_link\
                                                FROM subcategories \
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw { message: "Subcategory does not exist" };
            }
                
            delete_file(data[0].video_link, config.get("subcategory.default_file_path"));

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    DELETE FROM orders
                                                    WHERE solution_id IN (
                                                        SELECT id
                                                        FROM solution
                                                        WHERE subcategory_id = ${id}
                                                    );

                                                    DELETE FROM saved
                                                    WHERE solution_id IN (
                                                        SELECT id
                                                        FROM solution
                                                        WHERE subcategory_id = ${id}
                                                    );

                                                    DELETE FROM solution2element
                                                    WHERE solution_id IN (
                                                        SELECT id
                                                        FROM solution
                                                        WHERE subcategory_id = ${id}
                                                    );

                                                    DELETE FROM solution
                                                    WHERE subcategory_id = ${id};

                                                    DELETE FROM subcategories
                                                    WHERE id=${ id };
                                                COMMIT;`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_subcategories(req, res) {
        try {
            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                solutions: req.query.sort_solutions,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT s.id, s.name AS title, s.created_at, s.updated_at,
                                                        s.video_link, array_remove(array_agg(sol.id), NULL) as solutions
                                                FROM subcategories s
                                                LEFT JOIN solution sol
                                                ON sol.subcategory_id = s.id
                                                GROUP BY s.id, s.name, s.created_at, s.updated_at
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_subcategory(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT s.id, s.category_id AS parent_id, s.name AS title, s.video_link,
                                                        s.created_at, s.updated_at, array_remove(array_agg(sol.id), NULL) as solutions
                                                FROM subcategories s
                                                LEFT JOIN solution sol
                                                ON sol.subcategory_id = s.id
                                                GROUP BY s.id, s.name, s.created_at, s.updated_at
                                                HAVING s.id=${ id }`);
            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_popular_subcategories(req, res) {
        try {
            const rows = await process.pg.query(`SELECT s.name AS title, s.category_id, s.id, s.video_link, COALESCE(COUNT(sol.id)::int, 0) as sol_num,
                                                    array_remove(array_agg(NULLIF(json_strip_nulls(json_build_object(
                                                        'image', sol.image, 'name', sol.name, 'length', sol.length,
                                                        'width', sol.width, 'height', sol.height, 'weight', sol.weight,
                                                        'updated_at', sol.updated_at, 'created_at', sol.created_at,
                                                        'solution_id', sol.id
                                                    ))::text, '{}')), NULL)::json[] AS solution_objects
                                                FROM subcategories s
                                                LEFT JOIN (
                                                    SELECT *
                                                    FROM solution
                                                    ORDER BY created_at
                                                ) sol
                                                ON sol.subcategory_id = s.id
                                                GROUP BY s.category_id, s.id, s.video_link
                                                ORDER BY sol_num DESC
                                                FETCH FIRST 5 ROW ONLY`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_subcategory_by_category(req, res) {
        try {
            let { parent_id } = req.params;
            
            if (check_var(parent_id))
                return res.status(403). json(`Request parameters are not correct:
                                            parent_id: ${parent_id}`);

            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                solutions: req.query.sort_solutions,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT s.id, s.name AS title, s.created_at, s.updated_at, s.video_link, 
                                                        array_remove(array_agg(sol.id), NULL) as solutions
                                                FROM subcategories s
                                                LEFT JOIN solution sol
                                                ON sol.subcategory_id = s.id
                                                WHERE s.category_id =${parent_id}
                                                GROUP BY s.id, s.name, s.created_at, s.updated_at
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Subcategory_controller();