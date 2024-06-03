import controller from '../controller/subcategory.controller.js'
import multer_check from "../models/multer.check.js";
import config from "config"

const upload = multer_check(
       config.get("subcategory.dir_path"),
       1024 * 1024 * 100
);

export default (router) => {

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategory:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: category name
 *           example: Шкафы для обуви
 *         parent_id:
 *           type: integer
 *           description: category id
 *           example: 4
 *         video:
 *           type: file
 *           description: video file
 */

/**
 * @swagger
 * tags:
 *      name: Subcategory
 *      description: The Subcategory description API
 */

    router
/**
 * @swagger
 * /api/subcategory:
 *   post:
 *     summary: Create the subcategory
 *     tags: [Subcategory]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: Succsess 
 */
   .post('/subcategory', upload.single('video'), controller.create_subcategory)

/**
 * @swagger
 * /api/subcategory/popular_subcategory:
 *   get:
 *     summary: get popular subcategories
 *     tags: [Subcategory]
 *     responses:
 *       200:
 *         description: Success
 */
 .get('/subcategory/popular_subcategory', controller.get_popular_subcategories)

/**
 * @swagger
 * /api/subcategory/subcategories:
 *   get:
 *     summary: get all subcategories
 *     tags: [Subcategory]
 *     parameters:
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
 *         name: sort_solutions
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solutions by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort sort update date by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort sort create date id by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
   .get('/subcategory/subcategories', controller.get_subcategories)

/**
 * @swagger
 * /api/subcategory/by_category/{parent_id}:
 *   get:
 *     summary: get one subcategory by category id
 *     tags: [Subcategory]
 *     parameters:
 *       - in: path
 *         name: parent_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
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
 *         name: sort_solutions
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solutions by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort sort update date by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort sort create date id by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
   .get('/subcategory/by_category/:parent_id', controller.get_subcategory_by_category)

/**
 * @swagger
 * /api/subcategory/{id}:
 *   get:
 *     summary: get one subcategory by id
 *     tags: [Subcategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
   .get('/subcategory/:id', controller.get_subcategory)

/**
 * @swagger
 * /api/subcategory/{id}:
 *   patch:
 *     summary: update the structure by id
 *     tags: [Subcategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: Success
 */
   .patch('/subcategory/:id', upload.single('video'), controller.update_subcategory)

/**
 * @swagger
 * /api/subcategory/{id}:
 *   delete:
 *     summary: delete one subcategory by id
 *     tags: [Subcategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subcategory id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
   .delete('/subcategory/:id', controller.delete_subcategory);

    return router;
}
