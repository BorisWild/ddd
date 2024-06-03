import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import { 
    generate_access_token, 
    generate_refresh_token,
    generate_verification_token,
    send_email_msg,
    generate_rnum
} from '../models/auth.access.js';
import { 
    check_var
} from '../models/help.funcs.js';

class Email_auth_controller {
    constructor () {

    }
    
    async email_login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data email or password in entrance"
                });
            }

            const {email, password} = req.body;

            if (check_var(email) || check_var(password))
                return res.status(403).json(`Requested parameters are not correct`);

            const user = await process.pg.query(`SELECT email, password, id,
                                                        email_ver, role
                                                FROM users
                                                WHERE email='${email}'`);

            if (user[0] == null) {
                throw { message: "User does NOT exist" };
            }

            const is_match = await bcrypt.compare(password, user[0].password);

            if (!is_match) {
                throw { message: "Wrong data, try again" };
            }

            const access_token = generate_access_token(user[0].id, user[0].role, user[0].email_ver);
            const refresh_token = generate_refresh_token(user[0].id, user[0].role, user[0].email_ver);
        
            const row = process.pg.query(`UPDATE users
                                            SET token='${refresh_token}'
                                            WHERE id='${user[0].id}'`);

            return res.json({ access_token: access_token, refresh_token: refresh_token, id: user[0].id});
        } catch (e) {
            return res.status(500).json(e)
        }
    }


    async email_signup(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data phone or password"
                });
            }

            const { full_name, email, role, password } = req.body;

            if (check_var(full_name) || check_var(email) ||
                check_var(role) || check_var(password))
                return res.status(403).json(`Request parameters are not correct`);

            const user = await process.pg.query(`SELECT email
                                                FROM users
                                                WHERE email='${email}'`);

            if (user[0] != null) {
                throw {message: "User aready exist"};
            }

            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);

            const row = await process.pg.query(`INSERT INTO users ("full_name", "email",
                                                                "password", "role", "email_ver")
                                                VALUES ('${full_name}', '${email}',
                                                        '${hashed_password}', ${role}, false)
                                                RETURNING *`);

            res.json({ id: row[0].id, role: row[0].role });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async send_secret_email(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong data email or password"
                });
            }

            let { email, role, id } = req.body;

            if (check_var(email) || check_var(role) || check_var(id))
                return res.status(403).json(`Request parameters are not correct`);

            const user = await process.pg.query(`SELECT email, id, role, email_ver
                                                FROM users
                                                WHERE email='${email}'`);

            if (user[0] == null) {
                throw {message: "User dose not exist"};
            }

            if (role != user[0].role || id != user[0].id) {
                throw {message: "id or role are incorrect for that user"};
            }

            if (user[0].email_ver) {
                throw {message: "Email already verified"};
            }

            let rnum = generate_rnum();
            const verification_token = generate_verification_token(id, rnum, 
                                        config.get("auth.verification_email_secret"), role);

            let response = send_email_msg(email,
                'Account Verification secret code',
                'Hello, Dear user\n',
                `<b>Do NOT share your code with anyone</b> \
                <p>${secret}</p>`);

            response.then(msg => {
                if (msg.message != "Success") {
                    throw { message: "Head email server error" };
                }
            })
            .catch(error => console.log(error));

            return res.status(200).json({ token: verification_token });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async verify_email(req, res) {
        try {
            const {token, secret} = req.body;

            if (check_var(token) || check_var(secret))
                return res.status(403).json(`Request parameters are not correct: token, secret`);

            jwt.verify(token, config.get('auth.verification_email_secret'), (err, auth_data) => {
                if (err || auth_data.verinfo != secret ||
                    (auth_data.user_role != config.get("role.admin") && 
                     auth_data.user_role != config.get("role.manager"))) {
                    return res.status(403).json({message: "Forbidden"});
                }

                let row = process.pg.query(`UPDATE users
                                            SET email_ver=true
                                            WHERE id = ${auth_data.user_id}`);

                res.json({ message: "Success" });                
            });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async update_email(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong email data"
                });
            }

            const { email } = req.body;
            const { id } = req.params;

            if (check_var(id))
                return res.status(403).json(`Requested parameters are not correct: user id: ${id}`);

            const user = await process.pg.query(`SELECT email
                                                FROM users
                                                WHERE email='${email}'`);

            if (user[0]) {
                return res.status(400).json({message: "User with this email already exist"});
            }

            await process.pg.query(`UPDATE users
                                    SET email='${email}'
                                    WHERE id=${ id }`);

            res.status(200).json({message: "Success"});
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Email_auth_controller();