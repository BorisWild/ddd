import controller from "../controller/solution.controller.js"
import multer_check from "../models/multer.check.js";
import config from "config"

import { 
     authenticate_token,
     check_admin_permissions,
     check_privelege_permissions,
     check_manager_permissions,
     check_user_permissions,
     check_private_permissions,
     authenticate_password_token
 } from '../models/auth.access.js'

const upload = multer_check(
        config.get("solution.dir_path"),
        1024 * 1024 * 100
);

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Solution:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Solution name
 *           example: Дворец Путина
 *         image:
 *           type: file
 *           description: Image link to solution
 *         file:
 *           type: file
 *           description: File link to solution
 *         ar_file:
 *           type: file
 *           description: AR file link to solution
 *         subcategory_id:
 *           type: integer
 *           description: subcategory id
 *           example: 2
 *         length:
 *           type: integer
 *           description: length of solution in mm
 *           example: 2045
 *         user_id:
 *           type: integer
 *           description: user id
 *           example: 1
 *         height:
 *           type: integer
 *           description: height of solution in mm
 *           example: 1000
 *         width:
 *           type: integer
 *           description: width of solution in mm
 *           example: 3000
 *         weight:
 *           type: integer
 *           description: weight of solution in gramm
 *           example: 3000
 */

/**
 * @swagger
 * tags:
 *      name: Solution
 *      description: The Solution description API
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
 * /api/solution/solutions:
 *   get:
 *     summary: Get all solutions
 *     tags: [Solution]
 *     parameters:
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort name by specific order
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
 *         description: Succsess 
 */
      .get('/solution/solutions', controller.get_solutions)

/**
 * @swagger
 * /api/solution/manager_solutions:
 *   get:
 *     summary: Get all solutions with user info
 *     tags: [Solution]
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
 *     responses:
 *       200:
 *         description: Succsess 
 */
     .get('/solution/manager_solutions', authenticate_token,
                                        check_manager_permissions,
                                        controller.get_manager_solution)


/**
 * @swagger
 * /api/solution/popular_solutions:
 *   get:
 *     summary: Get popular solutions
 *     tags: [Solution]
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .get('/solution/popular_solutions', controller.get_popular_solutions)

/**
 * @swagger
 * /api/solution/by_subcategory/{subcategory_id}:
 *   get:
 *     summary: get solutions by subcategory id
 *     tags: [Solution]
 *     parameters:
 *       - in: path
 *         name: subcategory_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory id
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
 *     responses:
 *       200:
 *         description: Success
 */
     .get('/solution/by_subcategory/:subcategory_id', controller.get_solution_by_subcategory)


/**
 * @swagger
 * /api/solution/catalog:
 *   get:
 *     summary: get solutions for catalog
 *     tags: [Solution]
 *     parameters:
 *       - in: query
 *         name: subcategory_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter solutions by subcategory id
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
    .get('/solution/catalog', controller.get_catalog)

/**
 * @swagger
 * /api/solution/{id}:
 *   get:
 *     summary: get one solution by id
 *     tags: [Solution]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The solution id
 *         example: 1
 *       - in: query
 *         name: sort_element_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort element id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_element_title
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort element title by specific order
 *         example: desc
 *       - in: query
 *         name: sort_texture
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort texture id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_quantity
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort quantity id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_weight
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort weigth id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_cost
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort cost id by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
     .get('/solution/:id', controller.get_one_solution)
/**
 * @swagger
 * /api/solution/{id}:
 *   patch:
 *     summary: Update the solution
 *     tags: [Solution]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The solution id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Solution'
 *     responses:
 *       200:
 *         description: Succsess 
 */
     .patch('/solution/:id', upload.fields([{
                                        name: "image", maxCount: 1
                                 }, {
                                        name: "file", maxCount: 1
                                 }, {
                                        name: "ar_file", maxCount: 1
                                 }]),
                                 controller.update_solution)


/**
 * @swagger
 * /api/solution/{id}:
 *   delete:
 *     summary: delete the solution by id
 *     tags: [Solution]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The solution id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
      .delete('/solution/:id', controller.delete_solution)

/**
 * @swagger
 * /api/solution:
 *   post:
 *     summary: Create the solution
 *     tags: [Solution]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Solution'
 *     responses:
 *       200:
 *         description: Succsess 
 */
     .post('/solution', upload.fields([{
                                name: "image", maxCount: 1
                           }, {
                                name: "file", maxCount: 1
                           }, {
                                name: "ar_file", maxCount: 1
                           }]),
                           controller.create_solution);

    return router;
}
