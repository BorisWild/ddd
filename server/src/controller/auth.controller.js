import pool from '../models/pg.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import { 
    generate_access_token, 
    generate_refresh_token,
    generate_verification_token,
    send_email_msg,
    send_phone_msg,
    generate_rnum,
    generate_verification_password_token
} from '../models/auth.access.js';
import { phone } from 'phone';
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Auth_controller {
    constructor () {

    }

    async get_users(req, res) {
        try {
            let { page } = req.query;

            if (check_var(page)) {
                page = 1;
            }

            const collection = {
                id: req.query.sort_id,
                full_name: req.query.sort_full_name,
                email: req.query.sort_email,
                phone: req.query.sort_phone,
                orders: req.query.sort_orders,
                saved_constructions: req.query.sort_saved_constructions,
                created_at: req.query.sort_created_at,
                updated_at: req.query.sort_updated_at
            }

            const sort = check_sort(collection);

            const rows = await process.pg.query(`SELECT u.full_name, u.id, u.phone, (
                                                    SELECT COUNT(*)
                                                    FROM users
                                                )::int AS total, 
                                                u.email, array_remove(array_agg(DISTINCT o.id), NULL) AS orders, 
                                                array_remove(array_agg(DISTINCT s.id), NULL) AS saved_constructions,
                                                u.updated_at, u.created_at
                                            FROM users u
                                            LEFT JOIN saved s
                                            ON u.id = s.user_id
                                            LEFT JOIN orders o
                                            ON u.id = o.user_id
                                            GROUP BY u.full_name, u.id, u.phone
                                            ORDER BY ${sort.col_name} ${sort.sort_order}
                                            OFFSET ${(page - 1) * 10} ROWS
                                            FETCH FIRST 10 ROW ONLY`);
            
            let total = 0;
            if (rows[0].total) {
                total = rows[0].total;

                for (let i in rows) {
                    delete rows[i].total;
                }
            }

            res.status(200).json({ rows: rows, total: total });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_user(req, res) {
        try {
            const { user_id } = req.params;

            if (check_var(user_id))
                return res.status(403).json(`Request parameters are not correct: user_id: ${user_id}`);
        
            const rows = await process.pg.query(`SELECT u.full_name, u.id, u.phone,
                                                u.email, array_remove(array_agg(DISTINCT o.id), NULL) AS orders, 
                                                array_remove(array_agg(DISTINCT s.id), NULL) AS saved_constructions,
                                                u.updated_at, u.created_at
                                            FROM users u
                                            LEFT JOIN saved s
                                            ON u.id = s.user_id
                                            LEFT JOIN orders o
                                            ON u.id = o.user_id
                                            WHERE u.id = ${ user_id }
                                            GROUP BY u.full_name, u.id, u.phone`); 

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_user_data(req, res) {
        try {
            const rows = await process.pg.query(`SELECT full_name, phone, email, email_ver, phone_ver
                                                FROM users
                                                WHERE id = ${ req.id }`); 

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async change_password(req, res) {
        try {
            const { token } = req.body;

            jwt.verify(token, config.get('verification_password_secret'), async (err, auth_data) => {
                if (err) return res.status(403).json({msg: "Forbidden"});

                const { password, verpass } = req.body;

                if (password !== verpass) {
                    throw new Error({message: "Passwords are different"});
                }

                const salt = await bcrypt.genSalt(10);
                const hashed_password = await bcrypt.hash(password, salt);
                await process.pg.query(`UPDATE users
                                            SET password='${hashed_password}'
                                            WHERE id=${auth_data.user_id}`);

                return res.status(200).json({message: "Password changed"});
            });
        } catch (e) {
            return res.status(500).json({ message: "Updating user failed", error: e });
        }
    }

    async update_user(req, res) {
        try {
            const { full_name } = req.body;
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Requested parameters are not correct: user id: ${id}`);        

            const data = await process.pg.query(`SELECT full_name
                                                FROM users
                                                WHERE id=${ id }`);
            
            if (data[0] == null) {
                throw {message: "User dose not exist"};
            }

            if (check_var(full_name))
                full_name = data[0].full_name;
            
            await process.pg.query(`UPDATE users
                                    SET full_name='${full_name}'
                                    WHERE id=${ id }`);

            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async logout_user(req, res) {
        try {
            await process.pg.query(`UPDATE users
                                    SET token=NULL
                                    WHERE id='${req.id}'`);

            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json();
        }
    }

    async refresh_access_token(req, res) {
        try {
            const refresh_token = req.body.token;

            if (check_var(refresh_token))
                return res.status(403).json(`Requested parameters are not correct: refresh_token`);

            jwt.verify(refresh_token, config.get('auth.refresh_token_secret'), (err, auth_data) => {
                if (err) 
                    return res.status(403).json({message: "Permission denied"});

                const access_token = generate_access_token(auth_data.user_id, auth_data.user_role, auth_data.verinfo);

                return res.status(200).json({ token: access_token });
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async generate_phone_token(req, res) {
        try {
            const rows = await process.pg.query(`SELECT phone_ver \
                                                FROM users
                                                WHERE id='${req.id}'`);
            if (rows[0] == null) {
                return res.status(200).json({ message: "User dose NOT exist" });
            }

            if (rows[0].phone_ver == true) {
                return res.status(200).json({ message: "Phone has been verified" });
            }

            const { phone } = req.body; 
            let rnum = generate_rnum();
            const verification_token = generate_verification_token(req.id, rnum, 
                                        config.get("verification_phone_secret"), req.role);

            let promise = send_phone_msg(rnum, phone);
            promise.then(response => {
                const { data } = response;
                if (!data.success) {
                    throw new Error({data: `${data}`, message: "Head server error"});
                }
            })
            .catch(error => {
                console.log(error.message.data + "\n" + error.message.message);
            });

            res.status(200).json({token: verification_token});
        } catch (e) {
            return res.status(500).json({ message: "Generate phone token failed", error: e });
        }
    }

    async delete_user(req, res) {
        try {
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Request parameters are not correct: id: ${id}`);
        
            const rows = await process.pg.query(`BEGIN TRANSACTION;

                                                DELETE FROM instrument2order
                                                WHERE order_id IN (
                                                    SELECT id
                                                    FROM orders
                                                    WHERE user_id = '${id}'
                                                );

                                                DELETE FROM orders
                                                WHERE user_id = '${id}';

                                                DELETE FROM user_box
                                                WHERE user_id = '${id}';

                                                DELETE FROM saved
                                                WHERE user_id = '${id}';

                                                DELETE FROM users
                                                WHERE id = '${id}';
                                               
                                                COMMIT;`); 

            res.status(200).json({message: 'Success'});
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Auth_controller();
