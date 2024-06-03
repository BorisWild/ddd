import pool from '../models/pg.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import { 
    generate_access_token, 
    generate_refresh_token,
    generate_verification_token,
    send_phone_msg,
    generate_rnum
} from '../models/auth.access.js';
import { phone } from 'phone';
import { 
    check_var
} from '../models/help.funcs.js';
import { send_file_by_mail } from '../models/mailer.js';

class Phone_auth_controller {
    constructor() {

    }

    async phone_signup(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data phone or password"
                });
            }

            let { full_name, phone_number } = req.body;
            
            const phone_info = phone(phone_number);
            if (!phone_info.isValid) {
                return res.status(200).json({message: 'Phone is not valid'});
            }
            phone_number = phone_info.phoneNumber;

            const user = await process.pg.query(`SELECT phone
                                                FROM users
                                                WHERE phone='${phone_number}'`);

            if (user[0] != null) {
                throw {message: "User already exist"};
            }

            var row = await process.pg.query(`INSERT INTO users ("full_name", "phone",
                                                                 "phone_ver", "role")
                                                VALUES ('${full_name}', '${phone_number}',
                                                        false, ${config.get("role.user")}) 
                                                RETURNING *`);

            res.status(200).json({ id: row[0].id, role: row[0].role });
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async phone_login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data phone or password in entrance"
                });
            }

            let { phone_number } = req.body;
            
            const phone_info = phone(phone_number);
            if (!phone_info.isValid) {
                return res.status(200).json({message: 'Phone is not valid'});
            }
            phone_number = phone_info.phoneNumber;

            const user = await process.pg.query(`SELECT phone, id, role
                                                FROM users
                                                WHERE phone='${phone_number}'`);

            if (user[0] == null) {
                throw { message: "User does not exist" };
            }
            
            let rnum = generate_rnum();
            const verification_token = generate_verification_token(user[0].id, rnum, 
                                        config.get("auth.verification_phone_secret"), user[0].role);

            let promise = send_phone_msg(rnum, phone_number);
            promise.then(response => {
                const { data } = response;
                if (!data.success) {
                    throw {data: `${data}`, message: "Head server error"};
                }
            })
            .catch(error => {
                console.log(error);
            });

            console.log(rnum);

            res.status(200).json({token: verification_token});
        } catch (e) {
            return res.status(500).json(e)
        }
    }

    async verify_phone(req, res) {
        try {
            const {token, secret} = req.body;

            if (check_var(token) || check_var(secret))
                return res.status(403).json(`Requested parameters are not correct: token, secret`);

            jwt.verify(token, config.get('auth.verification_phone_secret'), (err, auth_data) => {
                if (err || auth_data.verinfo != secret ||
                    auth_data.user_role != config.get("role.user")) {
                    return res.status(403).json({message: "Forbidden"});
                }

                const access_token = generate_access_token(auth_data.user_id, auth_data.user_role, true);
                const refresh_token = generate_refresh_token(auth_data.user_id, auth_data.user_role, true);
        
                const row = process.pg.query(`UPDATE users
                                                SET phone_ver=true,
                                                    token='${refresh_token}'
                                                WHERE id='${auth_data.user_id}'`);

                return res.json({ access_token: access_token, refresh_token: refresh_token, id: auth_data.user_id});
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_phone(req, res) {
        try {
            let { phone_number } = req.body;
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Requested parameters are not correct: user id: ${id}`);
            
            const phone_info = phone(phone_number);
            if (!phone_info.isValid) {
                return res.status(200).json({message: 'Phone is not valid'});
            }
            phone_number = phone_info.phoneNumber;

            const user = await process.pg.query(`SELECT phone, email, full_name
                                                FROM users
                                                WHERE id=${id}`);

            if (user[0].phone == `${phone_number}`) {
                return res.status(400).json({ message: "This phone number already exist"});
            }

            await process.pg.query(`UPDATE users
                                    SET phone='${phone_number}'
                                    WHERE id=${id}`);

            if (user[0]?.email) {
                const mail = send_file_by_mail(user[0].email, 
                    "index.html", "Изменение данных", {
                    "{phone}": phone_number,
                    "{full_name}": user[0].full_name
                })

                if (!mail.success)
                    return res.status(500).json({message: mail.message})
            }

            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Phone_auth_controller();
