
import jwt from 'jsonwebtoken';
import config from 'config';
import nodeMailer from 'nodemailer';
import SMSAero from 'smsaero-api-v2';
import { check_var } from '../models/help.funcs.js';

function generate_access_token(id, role, verinfo) {
    return jwt.sign (
        { 
            user_role: role,
            verinfo: verinfo,
            user_id: id
        },
        config.get("auth.access_token_secret"),
        {expiresIn: "30d"}
    );
}

function generate_verification_token(id, verinfo, type, user_role) {
    return jwt.sign (
        { 
            user_id: id,
            verinfo: verinfo,
            user_role: user_role
        },
        type,
        {expiresIn: "10m"}
    );
}

function generate_verification_password_token(verinfo, id, type) {
    return jwt.sign (
        {
            user_id: id,
            verinfo: verinfo
        },
        type,
        {expiresIn: "10m"}
    );
}

function generate_refresh_token(id, role) {
    return jwt.sign(
        { 
            user_role: role,
            user_id: id
        },
        config.get('auth.refresh_token_secret'),
        {expiresIn: "365d"}
    );
}

function authenticate_token(req, res, next) {
    const auth_header = req.headers["authorization"];
    const token = auth_header && auth_header.split(' ')[1];
  
    if (check_var(token))
        return res.status(401).json({mesage: "Wrong authorization"});
  
    jwt.verify(token, config.get("auth.access_token_secret"), (err, auth_data) => {
        if (err)
            return res.status(403).json({message: `Rights can't be verified: ${err}`});
  
        req.role = auth_data.user_role;
        req.id = auth_data.user_id;
        next();
    });
}

function authenticate_password_token(req, res) {
    const {token, secret} = req.body;
  
    if (token == null) return res.status(401).json({mesage: "Wrong authorization"});
  
    jwt.verify(token, config.get('auth.verification_password_secret'), (err, auth_data) => {
        if (err) return res.status(403).json({message: "Permission denied"});

        if (auth_data.verinfo != secret) {
            return res.status(403).json({message: "Permission denied"});
        }

        const new_token = generate_verification_password_token(null, auth_data.user_id,
                                    config.get('auth.verification_password_secret'));

        return res.status(200).json({token: new_token});
    });
}

function send_email_msg(email, subject, text, html) {
    let transporter = nodeMailer.createTransport({
        service: 'yandex',
        auth: {
            user: config.get("send_email.email"),
            pass: config.get("send_email.password")
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: config.get("send_email.email"), // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
    };

    const repl = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return resolve({ message: error });
            }

            return resolve({ message: "Success" });
        })
    });

    return repl;
}

function send_phone_msg(secret_code, phone) {
    var sms = new SMSAero(config.get("sms_aero.email"), config.get("sms_aero.password"), "json");

    return sms.send({
        number: phone,
        sign: 'SMS Aero',
        text: `Delaem. - verification code: ${ secret_code }`
    });
}

function check_private_permissions(req, res, next) {
    const user_id = req.headers["id"];

    if (req.id != user_id) {
        return res.status(403).json({message: "Permission denied"});
    }

    next();
}

function check_privelege_permissions(req, res, next) {
    const user_id = req.headers["id"];

    if ((req.role != 1 && req.role != 2) ||
        req.id != user_id) {
        return res.status(403).json({message: "Permission denied"});
    }

    next();
}

function check_user_manager_permissions(req, res, next) {
    const user_id = req.headers["id"];

    if ((req.role != 3 && req.role != 2) ||
        req.id != user_id) {
        return res.status(403).json({message: "Permission denied"});
    }

    next();
}

function check_user_permissions(req, res, next) {
    const user_id = req.headers["id"];

    if (req.role != 3 ||
        req.id != user_id) {
        return res.status(403).json({message: "Permission denied"});
    }

    next();
}

function check_admin_permissions(req, res, next) {
    const user_id = req.headers["id"];

    if (req.role != 1 ||
        req.id != user_id) {
        return res.status(403).json({message: "Permission denied"});
    }

    next();
}

function check_manager_permissions(req, res, next) {
    const user_id = req.headers["id"];

    if (req.role != 2 ||
        req.id != user_id) {
        return res.status(403).json({message: "Permission denied"});
    }

    next();
}

function generate_rnum() {
    var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    return seq;
}

export {
    check_admin_permissions,
    check_privelege_permissions,
    check_manager_permissions,
    check_user_permissions,
    authenticate_token,
    generate_access_token,
    generate_refresh_token,
    generate_verification_token,
    check_private_permissions,
    check_user_manager_permissions,
    send_email_msg,
    send_phone_msg,
    generate_rnum,
    generate_verification_password_token,
    authenticate_password_token
}