import pool from "../models/pg.js";
import config from 'config'
import { delete_file } from "../models/fs.check.js"
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Texture_controller {
    constructor () {

    }
    
    async create_texture(req, res) {
        try {
            const { name, status, type } = req.body;
            let image = config.get("texture.default_file_path");

            if (check_var(status) ||
                check_var(name) ||
                check_var(type))
                return res.status(403).json(`Request parameters are not correct: status: ${status},
                                            name: ${name}, type: ${type}`);

            if (req?.file != null) {
                image = config.get("texture.query_image_dir") + req.file.filename;
            }

            image = JSON.stringify({ "src": image });

            const rows = await process.pg.query(`WITH ins AS (
                                                    INSERT INTO textures ("name", "type", "image", "status")
                                                    VALUES ('${name}', '${type}', '${image}', '${status}')
                                                    RETURNING id
                                                )
                                                    
                                                INSERT INTO element2texture ("element_id", "texture_id", "cost")
                                                SELECT e.id, i.id, 0
                                                FROM elements e, ins i`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_one_texture(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT * \
                                                FROM textures \
                                                WHERE id=${ id }`);
            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_texture(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const data = await process.pg.query(`SELECT image \
                                                FROM textures \
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw {message: "Texture dose not exist"};
            }
                
            delete_file(data[0].image, config.get("texture.default_file_path"));

            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    DELETE FROM solution2element
                                                    WHERE element2texture_id IN (
                                                        SELECT id
                                                        FROM element2texture
                                                        WHERE texture_id = ${id}
                                                    );

                                                    DELETE FROM element2texture
                                                    WHERE texture_id = ${ id };

                                                    DELETE FROM textures
                                                    WHERE id = ${ id };
                                                COMMIT;`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_texture(req, res) {
        try {
            const { id } = req.params;
            let {name, status, type} = req.body;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);
            
            const data = await process.pg.query(`SELECT image, name, type
                                                    FROM textures
                                                    WHERE id=${ id }`);

            if (data[0] == null) {
                throw {message: "Texture dose not exist"};
            }

            if (check_var(name)) {
                name = data[0].name;
            }
            if (check_var(type)) {
                type = data[0].type;
            }

            let image = data[0].image;

            if (req.file != null) {
                image = config.get("texture.query_image_dir") + req.file.filename;
                image = JSON.stringify({ "src": image });
                delete_file(data[0].image, config.get("texture.default_file_path"));
            }

            const rows = await process.pg.query(`UPDATE textures
                                                SET name='${name}',
                                                    type='${type}',
                                                    image='${image}',
                                                    status='${status}',
                                                    updated_at=DEFAULT
                                                WHERE id=${ id }`);
            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_texture_types(req, res) {
        try {
            
            const rows = await process.pg.query(`SELECT type, COUNT(id)
                                                FROM textures
                                                GROUP BY type`);

                                                
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_textures(req, res) {
        try {
            let { page, type } = req.query;
            let fetch = 'FETCH FIRST 10 ROW ONLY';

            if (!check_var(type)) {
                if (Array.isArray(type)) {
                    type = type.join(',');
                }
            }
            if (check_var(page)) {
                page = 1;
                fetch = '';
            }

            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                type: req.query.sort_type,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            });

            const rows = await process.pg.query(`SELECT id, name AS title, type, image,
                                                        status, updated_at, created_at, updated_at
                                                FROM textures
                                                WHERE type = ANY (string_to_array((
                                                    CASE 
                                                        WHEN '${type}'!='undefined' THEN '${type}'
                                                        ELSE type
                                                    END
                                                ), ',')::text[])
                                                ORDER BY ${sort.col_name} ${sort.sort_order}
                                                OFFSET ${(page - 1) * 10} ROWS
                                                ${fetch}`);
            const total = await process.pg.query(`SELECT COUNT(id)::int
                                                FROM textures
                                                WHERE type = ANY (string_to_array((
                                                    CASE 
                                                        WHEN '${type}'!='undefined' THEN '${type}'
                                                        ELSE type
                                                    END
                                                ), ',')::text[])`);

            res.status(200).json({rows: rows, total: total[0].count});
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Texture_controller();