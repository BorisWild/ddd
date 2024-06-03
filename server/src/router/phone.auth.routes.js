import controller from '../controller/phone.auth.controller.js'
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
 *     Phone_signup:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: full user name
 *           example: Иванов Иван Иванович
 *         phone_number:
 *           type: string
 *           description: user phone number
 *           example: +7(977)706-82-66
 *     Phone_login:
 *       type: object
 *       properties:
 *         phone_number:
 *           type: string
 *           description: user phone
 *           example: +7(977)706-82-66
 *     Verify_phone:
 *       type: object
 *       properties:
 *         secret:
 *           type: integer
 *           description: secret code for phone verification
 *           example: Put verify code here
 *         token:
 *           type: apiKey
 *           description: verify token of phone
 *           example: Put token here
 *     Update_phone:
 *       type: object
 *       properties:
 *         phone_number:
 *           type: string
 *           description: user phone
 *           example: +7(977)706-82-66
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
 *      name: Phone_auth
 *      description: The Auth description API
 */
    router

/**
 * @swagger
 * /api/auth/verify_phone:
 *   post:
 *     summary: Verify phone token
 *     tags: [Phone_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Verify_phone'
 *     responses:
 *       200:
 *         description: Token
 */ 
      .post("/auth/verify_phone", controller.verify_phone)
 
/**
 * @swagger
 * /api/auth/phone_signup:
 *   post:
 *     summary: Create the user by phone number
 *     tags: [Phone_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Phone_signup'
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .post('/auth/phone_signup',
    [
        check('phone_number', "Please, write the phone number").exists()
    ],
    controller.phone_signup)

/**
 * @swagger
 * /api/auth/phone_login:
 *   post:
 *     summary: Login by phone number into system
 *     tags: [Phone_auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Phone_login'
 *     responses:
 *       200:
 *         description: Token 
 */
    .post('/auth/phone_login',
    [
        check('phone_number', "Please, write the phone number").exists()
    ],
    controller.phone_login)

/**
 * @swagger
 * /api/auth/update_phone/{id}:
 *   post:
 *     summary: Update phone
 *     tags: [Phone_auth]
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
 *             $ref: '#/components/schemas/Update_phone'
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .post('/auth/update_phone/:id', 
    authenticate_token,
    check_user_manager_permissions,
    [
        check('phone_number', "Please, write the phone number").exists()
    ],
    controller.update_phone)

    return router;
}
