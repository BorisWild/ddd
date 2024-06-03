import pool from '../models/pg.js';
import {
    check_var,
    check_sort
} from '../models/help.funcs.js';
import config from "config";

class Category_controller {
    constructor () {

    }

    async create_category(req, res) {
        try {
            const { title } = req.body;

            if (check_var(title))
                return res.status(403).json(`Request parameters are not correct: title: ${title}`);

            const rows = await process.pg.query(`INSERT INTO categories ("name")
                                                 VALUES ('${title}')
                                                 RETURNING *`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_category(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            let { title } = req.body;

            const data = await process.pg.query(`SELECT name
                                                FROM categories
                                                WHERE id=${ id }`);

            if (data[0] == null) {
                throw { message: "Category dose not exist" };
            }

            if (check_var(title))
                title = data[0].name;

            const rows = await process.pg.query(`UPDATE categories
                                                SET name='${title}',
                                                    updated_at=DEFAULT
                                                WHERE id=${ id }`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async delete_category(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);
            
            const rows = await process.pg.query(`BEGIN TRANSACTION;
                                                    DELETE FROM orders
                                                    WHERE solution_id IN (
                                                        SELECT id
                                                        FROM solution
                                                        WHERE subcategory_id IN (
                                                            SELECT id
                                                            FROM subcategories
                                                            WHERE category_id = ${id}
                                                        )
                                                    );

                                                    DELETE FROM solution2element
                                                    WHERE solution_id IN (
                                                        SELECT id
                                                        FROM solution
                                                        WHERE subcategory_id IN (
                                                            SELECT id
                                                            FROM subcategories
                                                            WHERE category_id = ${id}
                                                        )
                                                    );

                                                    DELETE FROM saved
                                                    WHERE solution_id IN (
                                                        SELECT id
                                                        FROM solution
                                                        WHERE subcategory_id IN (
                                                            SELECT id
                                                            FROM subcategories
                                                            WHERE category_id = ${id}
                                                        )
                                                    );

                                                    DELETE FROM solution
                                                    WHERE subcategory_id IN (
                                                        SELECT id
                                                        FROM subcategories
                                                        WHERE category_id = ${id}
                                                    );

                                                    DELETE FROM subcategories
                                                    WHERE category_id = ${ id };

                                                    DELETE FROM categories
                                                    WHERE id=${ id };                               
                                                COMMIT;`);
            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_categories(req, res) {
        try {
            const sort = check_sort({
                id: req.query.sort_id,
                title: req.query.sort_title,
                children_num: req.query.sort_children,
                solutions: req.query.sort_solutions,
                created_at: req.query.sort_create_date,
                updated_at: req.query.sort_update_date
            });

            const rows = await process.pg.query(`SELECT c.id, c.name AS title, c.created_at, c.updated_at, 
                                                        array_remove(array_agg(m.id), NULL) AS children,
                                                        coalesce(COUNT(m.id)::int, 0) AS children_num,
                                                        coalesce(SUM(m.sol_num)::int, 0) as solutions
                                                FROM categories c
                                                LEFT JOIN (
                                                    SELECT s.category_id, s.id, COUNT(sol.id) as sol_num
                                                    FROM subcategories s
                                                    LEFT JOIN solution sol
                                                    ON sol.subcategory_id = s.id
                                                    GROUP BY s.id,  s.category_id
                                                ) m
                                                ON m.category_id = c.id
                                                GROUP BY c.id, c.name, c.created_at, c.updated_at
                                                ORDER BY ${sort.col_name} ${sort.sort_order}`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_category(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);

            const rows = await process.pg.query(`SELECT c.id, c.name AS title, c.created_at, c.updated_at,
                                                        array_remove(array_agg(m.id), NULL) as children,
                                                        COALESCE(SUM(m.sol_num)::int, 0) as solutions \
                                                FROM categories c
                                                LEFT JOIN (
                                                    SELECT s.category_id, s.id, COUNT(sol.id) as sol_num
                                                    FROM subcategories s \
                                                    LEFT JOIN solution sol
                                                    ON sol.subcategory_id = s.id
                                                    GROUP BY s.id,  s.category_id
                                                ) m
                                                ON m.category_id = c.id
                                                WHERE c.id = ${id}
                                                GROUP BY c.id, c.name, c.created_at, c.updated_at`);
            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_popular_categories(req, res) {
        try {
            const rows = await process.pg.query(`SELECT c.id, c.name AS title, array_remove(array_agg(DISTINCT m.video_link), NULL)
                                                        AS video_link, COALESCE(COUNT(m.sol_id)::int, 0) as solutions,
                                                        array_remove(array_agg(NULLIF(json_strip_nulls(json_build_object(
                                                            'image', m.image, 'name', m.name, 'length', m.length,
                                                            'width', m.width, 'height', m.height, 'weight', m.weight,
                                                            'updated_at', m.updated_at, 'created_at', m.created_at,
                                                            'solution_id', m.sol_id
                                                        ))::text, '{}')), NULL)::json[] AS solution_objects,
                                                        array_remove(array_agg(DISTINCT m.id), NULL) AS subcategory_id
                                                FROM categories c
                                                LEFT JOIN (
                                                    SELECT s.category_id, s.id, sol.image, sol.id AS sol_id,
                                                        sol.name, sol.length, sol.width, sol.height,
                                                        sol.weight, sol.updated_at, sol.created_at,
                                                        s.video_link
                                                    FROM subcategories s
                                                    LEFT JOIN solution sol
                                                    ON sol.subcategory_id = s.id
                                                    ORDER BY sol.created_at
                                                ) m
                                                ON m.category_id = c.id
                                                GROUP BY c.id, c.name
                                                ORDER BY solutions DESC
                                                FETCH FIRST 5 ROW ONLY`);

            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Category_controller();