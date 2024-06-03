import controller from '../controller/email.auth.controller.js'
import { check } from 'express-validator';
import { 
        authenticate_token,
        check_user_manager_permissions,
        check_admin_permissions,
        check_privelege_permissions,
        check_manager_permissions,
        check_user_permissions,
        check_private_permissions,
        authenticate_password_token
} from '../models/auth.access.js'

export default (router) => {

/**
 * @swagger
 * components:
 *   schemas:
 *     Email_signup:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: full user name
 *           example: Иванов Иван Иванович
 *         email:
 *           type: string
 *           description: user email
 *           example: ivanov@gmail.com
 *         password:
 *           type: string
 *           description: user password
 *           example: 12345678
 *         role:
 *           type: integer
 *           description: user role, 1 - admin, 2 - manager
 *           example: 1
 *     Email_login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *           example: ivanov@gmail.com
 *         password:
 *           type: string
 *           description: user password
 *           example: 12345678
 *     Verify_email:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: verify token of email
 *           example: Put token here
 *         secret:
 *           type: int
 *           description: secret code for email verification
 *           example: Put verify code here
 *     Send_secret_email:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: user id
 *           example: 1
 *         role:
 *           type: integer
 *           description: user role
 *           example: 1
 *         email:
 *           type: string
 *           description: email address
 *           example: olegrasputina@gmail.com
 *     Update_email:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *           example: ivanov@gmail.com
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     Bearer:
 *       type: apiKey
 *       name: Authorization
 *       in: header
 *       description: Enter your bearer token in the format **Bearer &lt;token>**
 */

/**
 * @swagger
 * tags:
 *      name: Email_auth
 *      description: The Auth description API
 */
    router

/**
 * @swagger
 * /api/auth/email_signup:
 *   post:
 *     summary: Create the user by email
 *     tags: [Email_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email_signup'
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .post('/auth/email_signup',
    [
        check('email', "Wrong email").isEmail(),
        check('password', "The password is less then 8 symbols")
        .isLength({ min: 8 })
    ],
    controller.email_signup)

/**
 * @swagger
 * /api/auth/email_login:
 *   post:
 *     summary: Login user by into system
 *     tags: [Email_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email_login'
 *     responses:
 *       200:
 *         description: Token 
 */
      .post('/auth/email_login',
      [
            check('email', "email is not correct").normalizeEmail().isEmail(),
            check('password', "Please, write the password").exists()
      ],
      controller.email_login)
    
/**
 * @swagger
 * /api/auth/send_secret_email:
 *   post:
 *     summary: Send secret code by email
 *     tags: [Email_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Send_secret_email'
 *     responses:
 *       200:
 *         description: Success 
 */
      .post('/auth/send_secret_email',
      [
            check('email', "email is not correct").normalizeEmail().isEmail(),
      ],
      controller.send_secret_email)


 /**
 * @swagger
 * /api/auth/verify_email:
 *   post:
 *     summary: Verify email token
 *     tags: [Email_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verify_email'
 *     responses:
 *       200:
 *         description: Token
 */ 
      .post("/auth/verify_email", controller.verify_email)

/**
 * @swagger
 * /api/auth/update_email/{id}:
 *   post:
 *     summary: Update email
 *     tags: [Email_auth]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: ID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *         example: 1
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update_email'
 *     responses:
 *       200:
 *         description: Succsess 
 */
      .post('/auth/update_email/:id',
      authenticate_token,
      check_user_manager_permissions,
      [
            check('email', "Wrong email").isEmail(),
            check('email', "Please, write the email").exists()
      ],
      controller.update_email)

      return router;
}

