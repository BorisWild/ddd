import controller from '../controller/auth.controller.js'
import { check } from 'express-validator';
import { 
        authenticate_token,
        check_admin_permissions,
        check_privelege_permissions,
        check_manager_permissions,
        check_user_permissions,
        check_private_permissions,
        authenticate_password_token,
        check_user_manager_permissions
} from '../models/auth.access.js'

export default (router) => {

/**
 * @swagger
 * components:
 *   schemas:
 *     Generate_phone_token:
 *       type: object
 *       properties:
 *         phone_number:
 *           type: string
 *           description: phone number
 *           example: 79777068266
 *     Generate_email_token:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: user id
 *           example: 1
 *         user_role:
 *           type: integer
 *           description: user role
 *           example: 1
 *         email:
 *           type: string
 *           description: email address
 *           example: olegrasputina@gmail.com
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
 *     Refresh_token:
 *       type: object
 *       properties:
 *         token:
 *           type: apiKey
 *           description: refresh token
 *           example: Put refresh token here
 *     Update_user:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: full user name
 *           example: Владимиров Владимир Владимирович
 *     Update_phone:
 *       type: object
 *       properties:
 *         phone_number:
 *           type: string
 *           description: phone number
 *           example: +7(977)706-82-66
 *     Update_email:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: email address
 *           example: olegrasputina@gmail.com
 *     Change_password:
 *       type: object
 *       properties:
 *         token:
 *           type: apiKey
 *           description: verfy password token
 *           example: Put password token here
 *         password:
 *           type: string
 *           description: user password
 *           example: 12345678
 *         verpass:
 *           type: string
 *           description: verification of user password
 *           example: 12345678
 *     Generate_password_phone_token:
 *       type: object
 *       properties:
 *         phone_number:
 *           type: string
 *           description: phone number
 *           example: +7(977)706-82-66
 *     Generate_password_email_token:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: email address
 *           example: olegrasputina@gmail.com
 *     Auth_passw_token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: verify token
 *           example: Put token here
 *         secret:
 *           type: int
 *           description: secret code for password verification
 *           example: Put verify code here
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
 *      name: Auth
 *      description: The Auth description API
 */
    router

/**
 * @swagger
 * /api/auth/get_users:
 *   get:
 *     summary: get all users
 *     tags: [Auth]
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
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_full_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort full name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_email
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort email by specific order
 *         example: desc
 *       - in: query
 *         name: sort_phone
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort phone by specific order
 *         example: desc
 *       - in: query
 *         name: sort_orders
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort orders by specific order
 *         example: desc
 *       - in: query
 *         name: sort_saved_constructions
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort orders by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort updated time by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort updated time by specific order
 *         example: desc
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number
 *         example: 1
 *     responses:
 *       200:
 *         description: JSON users output
 */
      .get('/auth/get_users', authenticate_token,
                              check_manager_permissions,
                              controller.get_users)

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: The Auth description API
 */
 router

 /**
  * @swagger
  * /api/auth/get_user/{user_id}:
  *   get:
  *     summary: get user info by id
  *     tags: [Auth]
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
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *         example: 1
  *     responses:
  *       200:
  *         description: JSON users output
  */
       .get('/auth/get_user/:user_id', authenticate_token,
                               check_manager_permissions,
                               controller.get_user)

/**
  * @swagger
  * /api/auth/user_data:
  *   get:
  *     summary: get user info
  *     tags: [Auth]
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
  *     responses:
  *       200:
  *         description: JSON users output
  */
 .get('/auth/user_data', authenticate_token,
                         check_user_permissions,
                         controller.get_user_data)

/**
 * @swagger
 * /api/auth/user_update/{id}:
 *   patch:
 *     summary: Update user info
 *     tags: [Auth]
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
 *             $ref: '#/components/schemas/Update_user'
 *     responses:
 *       200:
 *         description: Success 
 */
     .patch('/auth/user_update/:id', authenticate_token,
                              check_user_manager_permissions,
                              controller.update_user)

/**
* @swagger
* /api/auth/change_password:
*   post:
*     summary: Update user info
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Change_password'
*     responses:
*       200:
*         description: Success 
*/  
      .post('/auth/change_password', controller.change_password)

/**
 * @swagger
 * /api/auth/refresh_token:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Refresh_token'
 *     responses:
 *       200:
 *         description: Token 
 */
        .post('/auth/refresh_token', controller.refresh_access_token)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: logout user
 *     tags: [Auth]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *         example: 1
 *     responses:
 *       '200':
 *         description: returns "Success"
 */
        .post('/auth/logout', authenticate_token,
                              check_private_permissions,
                              controller.logout_user)

 /**
 * @swagger
 * /api/auth/delete_user/{id}:
 *   delete:
 *     summary: get user info by id
 *     tags: [Auth]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The texture id
 *         example: 1
 *     responses:
 *       200:
 *         description: JSON users output
 */
        .delete('/auth/delete_user/:id', authenticate_token,
                                check_manager_permissions,
                                controller.delete_user)

    return router;
}
