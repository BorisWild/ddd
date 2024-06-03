import controller from '../controller/saved.controller.js'
import { 
    authenticate_token,
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
 *     Saved:
 *       type: object
 *       properties:
 *         solution_id:
 *           type: integer
 *           description: solution id
 *           example: 1
 */

/**
 * @swagger
 * tags:
 *      name: Saved
 *      description: The Saved description API
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

    router

/**
 * @swagger
 * /api/saved:
 *   post:
 *     summary: Create the saved solution
 *     tags: [Saved]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Saved'
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .post('/saved', authenticate_token,
               check_private_permissions,
               controller.create_saved)

/**
 * @swagger
 * /api/saved/all_saved:
 *   get:
 *     summary: get all saved
 *     tags: [Saved]
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
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: The type of the subcategory
 *         example: Серванты
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/saved/all_saved', authenticate_token,
                        check_user_permissions,
                        controller.get_all_saved)

/**
 * @swagger
 * /api/saved/get_types:
 *   get:
 *     summary: get all saved
 *     tags: [Saved]
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
 *         description: Success
 */
 .get('/saved/get_types', authenticate_token,
                        check_user_permissions,
                        controller.get_types)

/**
 * @swagger
 * /api/saved/manager_saved/{user_id}:
 *   get:
 *     summary: get all saved of specific user
 *     tags: [Saved]
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
 *         required: false
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
 *         name: sort_title
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort title by specific order
 *         example: desc
 *       - in: query
 *         name: sort_length
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort length id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_width
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort width id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_weight
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort weigth id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_height
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort height id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_full_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort user_name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort updated_at id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort created_at id by specific order
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
 *         description: Success
 */

   .get('/saved/manager_saved/:user_id', authenticate_token,
                        check_manager_permissions,
                        controller.get_manager_saved)

/**
 * @swagger
 * /api/saved/{id}:
 *   get:
 *     summary: get one saved solution by id
 *     tags: [Saved]
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
 *         description: The saved solution id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
      .get('/saved/:id', authenticate_token,
                    check_user_permissions,
                    controller.get_saved)

/**
 * @swagger
 * /api/saved/{id}:
 *   delete:
 *     summary: delete one saved solution by id
 *     tags: [Saved]
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
 *         description: The saved solution id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
    .delete('/saved/:id', authenticate_token,
                        check_user_permissions,
                        controller.delete_saved);

    return router;
}
