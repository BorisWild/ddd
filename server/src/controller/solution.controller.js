import pool from "../models/pg.js";
import config from "config";
import { delete_file } from "../models/fs.check.js";
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Solution_controller {
    constructor () {

    }

    async create_solution(req, res) {
        try {
            let {
                title, length, width, user_id,
                height, weight, subcategory_id
            } = req.body;

            if (check_var(title) || check_var(length) ||
                check_var(width) || check_var(height) ||
                check_var(subcategory_id) || check_var(weight))
                return res.status(403).json(`Request parameters are not correct: length: ${length},
                                            title: ${title}, width: ${width}, height: ${height},
                                            subcategory_id:${subcategory_id}, weight: ${weight}`);
            if (check_var(user_id)) user_id = null;

            let file = config.get("solution.default_json_file_path");
            let image = config.get("solution.default_image_file_path");
            let ar_file = "";

            if (req?.files?.image != null) {
                image = config.get("solution.query_image_dir") + req.files.image[0].filename;
            } 
            if (req?.files?.file != null) {
                file = config.get("solution.query_file_dir") + req.files.file[0].filename;
            }
            if (req?.files?.ar_file != null) {
                ar_file = config.get("solution.query_ar_file_dir") + req.files.ar_file[0].filename;
            }
            console.log(req.files)

            image = JSON.stringify({ "src": image });
            file = JSON.stringify({ "src": file });
            ar_file = JSON.stringify({ "src": ar_file });
            console.log(ar_file)

            const rows = await process.pg.query(`INSERT INTO solution ("name", "length", "weight", "user_id",
                                                                        "image", "height", "file", "ar_file",
                                                                        "width", "subcategory_id")
                                                    VALUES ('${title}', ${length}, ${weight}, ${user_id}, '${image}',
                                                            ${height}, '${file}', '${ar_file}', ${width}, ${subcategory_id})
                                                    RETURNING *`);

            res.status(200).json({ solution_id: rows[0].id, message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_solution(req, res) {
        try {
            const { id } = req.params;

            let { title, length, width, height,
                weight, subcategory_id, user_id } = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const data = await process.pg.query(`SELECT name, length, file,
                                                        width, height, weight,
                                                        subcategory_id, image, file,
                                                        ar_file, user_id
                                                 FROM solution
                                                 WHERE id=${ id }`);

            if (data[0] == null) {
                throw  { error: "Solution dose not exist" };
            }

            if (check_var(title))
                title = data[0].name;
            if (check_var(length))
                length = data[0].length;
            if (check_var(width))
                width = data[0].width;
            if (check_var(height))
                height = data[0].height;
            if (check_var(weight))
                weight = data[0].weight;
            if (check_var(subcategory_id))
                subcategory_id = data[0].subcategory_id;
            if (!user_id)
                user_id = data[0].user_id;

            let file = data[0].file;
            let image = data[0].image;
            let ar_file = data[0].ar_file;

            if (req.files?.file != null) {
                file = config.get("solution.query_file_dir") + req.files.file[0].filename;
                file = JSON.stringify({ "src": file });
                delete_file(data[0].file, config.get("solution.default_json_file_path"));
            }

            if (req.files?.ar_file != null) {
                ar_file = config.get("solution.query_ar_file_dir") + req.files.ar_file[0].filename;
                ar_file = JSON.stringify({ "src": ar_file });
                delete_file(data[0].ar_file, null);
            }

            if (req.files?.image != null) {
                image = image = config.get("solution.query_image_dir") + req.files.image[0].filename;
                image = JSON.stringify({ "src": image });
                delete_file(data[0].image, config.get("solution.default_image_file_path"));
            }
            
            const rows = await process.pg.query(`UPDATE solution
                                                 SET name='${title}', height=${height},
                                                     image='${image}', width=${width},
                                                     file='${file}', weight=${weight},
                                                     length=${length}, subcategory_id=${subcategory_id},
                                                     updated_at=DEFAULT, ar_file='${ar_file}',
                                                     user_id=${user_id}
                                                 WHERE id=${ id }
                                                 RETURNING *`);
            
            res.status(200).json({ solution_id: rows[0].id, message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_solution(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: length: id: ${id}`);

            const data = await process.pg.query(`SELECT file, image
                                                 FROM solution
                                                 WHERE id=${ id }`);
            
            if (data[0] == null) {
                throw new Error({message: "Solution dose Not exist"});
            }
            
            delete_file(data[0].file, config.get("solution.default_json_file_path"));
            delete_file(data[0].image, config.get("solution.default_image_file_path"));

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    DELETE FROM saved
                                                    WHERE solution_id = ${id};

                                                    DELETE FROM solution2element
                                                    WHERE solution_id = ${id};

                                                    DELETE FROM orders
                                                    WHERE solution_id = ${id};

                                                    DELETE FROM solution
                                                    WHERE id=${ id };
                                                COMMIT;`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_one_solution(req, res) {
        try {
            let { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: length: id: ${id}`);

            const sort = check_sort({
                id: req.query.sort_element_id,
                e_name: req.query.sort_element_title,
                t_name: req.query.sort_texture,
                se_quantity: req.query.sort_quantity,
                e_weight: req.query.sort_weight,
                et_cost: req.query.sort_cost
            });

            const rows = await process.pg.query(`SELECT s.id, s.name, s.image, s.length, s.height, s.ar_file,
                                                        s.width, s.weight, s.file, s.created_at, s.updated_at,
                                                        array_remove(array_agg(NULLIF(json_strip_nulls(json_build_object('quantity', m.se_quantity,
                                                                            'cost', m.et_cost, 'element_title', m.e_name, 'element_id', m.id,
                                                                            'element_weigth', m.e_weight, 'element_dimensions', m.e_dimensions,
                                                                            'texture_id', m.t_id, 'texture_name', m.t_name,
                                                                            'texture_image', m.t_image))::text, '{}')), NULL)::json[] AS parts
                                                FROM solution s
                                                LEFT JOIN (
                                                    SELECT se.solution_id AS se_sol_id, se.quantity AS se_quantity, et.cost AS et_cost,
                                                            e.name AS e_name, e.id, e.weight AS e_weight,
                                                            e.dimensions AS e_dimensions, t.id AS t_id, t.name AS t_name, t.image AS t_image
                                                    FROM solution2element se
                                                    INNER JOIN element2texture et
                                                    ON et.id = se.element2texture_id
                                                    INNER JOIN elements e
                                                    ON e.id = et.element_id
                                                    INNER JOIN textures t
                                                    ON t.id = et. texture_id
                                                    ORDER BY ${sort.col_name} ${sort.sort_order}
                                                ) m ON m.se_sol_id = s.id
                                                WHERE s.id = ${ id }
                                                GROUP BY s.id, s.name, s.image, s.length, s.height, s.width, s.weight, s.file, s.created_at, s.updated_at \
                                                `);

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_solution_by_subcategory(req, res) {
        try {
            const { subcategory_id } = req.params;

            if (check_var(subcategory_id))
                return res.status(403).json(`Request parameters are not correct: id: ${subcategory_id}`);
            
            const sort = check_sort({
                id: req.query.sort_id,
                name: req.query.sort_title,
                length: req.query.sort_length,
                width: req.query.sort_width,
                weight: req.query.sort_weight,
                height: req.query.sort_height,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT id, name, length, width, height, weight, updated_at, created_at
                                                FROM solution
                                                WHERE subcategory_id=${ subcategory_id }
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_catalog(req, res) {
        try {
            const { subcategory_id, page } = req.query;

            if (check_var(page)) {
                page = 1;
            }

            if (check_var(subcategory_id))
                return res.status(403).json(`Request parameters are not correct: subcategory_id: ${subcategory_id}`);
            
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

            const rows = await process.pg.query(`SELECT s.id, s.image, s.name AS title, s.length, s.width, 
                                                        s.height, s.weight, s.updated_at, s.created_at
                                                FROM solution s
                                                INNER JOIN subcategories sub
                                                ON sub.id = s.subcategory_id
                                                WHERE sub.id = ${ subcategory_id }
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                FETCH FIRST 10 ROW ONLY`);

            const total = await process.pg.query(`SELECT COUNT(*)::int
                                                FROM solution s
                                                INNER JOIN subcategories sub
                                                ON sub.id = s.subcategory_id
                                                WHERE sub.id = ${ subcategory_id }`);

            console.log(total)

            res.status(200).json({ rows: rows, total: total[0].count });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_solutions(req, res) {
        try {
            let { page } = req.query;

            const sort = check_sort({
                id: req.query.sort_id,
                name: req.query.sort_name,
                full_name: req.query.sort_full_name,
                length: req.query.sort_length,
                width: req.query.sort_width,
                weight: req.query.sort_weight,
                height: req.query.sort_height,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            if (check_var(page)) {
                page = 1;
            }

            const rows = await process.pg.query(`SELECT s.id, s.name, s.image, s.file,
                                                        s.length, s.height, s.width,
                                                        s.weight, s.subcategory_id,
                                                        s.created_at, s.updated_at, 
                                                        COALESCE(u.full_name, '') AS full_name,
                                                        (
                                                            SELECT COUNT(*)
                                                            FROM solution
                                                        )::int AS total
                                                FROM solution s
                                                LEFT JOIN users u
                                                ON s.user_id = u.id
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                FETCH FIRST 10 ROW ONLY`);
            
            let total = rows[0].total;
            for (let i in rows) {
                delete rows[i].total;
            }

            res.status(200).json({rows: rows, total: total});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_popular_solutions(req, res) {
        try {
            const rows = await process.pg.query(`SELECT sol.id, sol.image, sol.name AS title, sol.length, sol.width, 
                                                        sol.height, sol.weight, sol.updated_at, sol.created_at
                                                FROM saved s
                                                INNER JOIN solution sol
                                                ON sol.id = s.solution_id     
                                                GROUP BY sol.id
                                                ORDER BY COUNT(s.solution_id)::int DESC                             
                                                FETCH FIRST 3 ROW ONLY`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_manager_solution(req, res) {
        try {
            const sort = check_sort({
                id: req.query.sort_id,
                name: req.query.sort_title,
                length: req.query.sort_length,
                width: req.query.sort_width,
                weight: req.query.sort_weight,
                height: req.query.sort_height,
                full_name: req.query.sort_full_name,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT s.id, s.name, u.full_name, s.length, s.width, 
                                                        s.height, s.weight, s.updated_at, s.created_at
                                                FROM solution s
                                                INNER JOIN users u
                                                ON u.id = s.user_id
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Solution_controller();