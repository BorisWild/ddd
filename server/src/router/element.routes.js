import controller from '../controller/element.controller.js'
import multer_check from "../models/multer.check.js";
import config from "config"

const upload = multer_check(
       config.get("element.dir_path"),
       1024 * 1024 * 5
);

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Element:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Element name
 *           example: Царский трон
 *         file:
 *           type: file
 *           description: link of file
 *         dimensions:
 *           type: string
 *           description: dimensions of element - l:w:h [mm]
 *           example: 5:10:11
 *         type:
 *            type: integer
 *            description: type of element
 *            example: 2
 *         weight:
 *            type: number
 *            description: weight of element [kg]
 *            example: 5.53
 */

/**
 * @swagger
 * tags:
 *      name: Element
 *      description: The Element description API
 */

    router
// /**
//  * @swagger
//  * /api/element/{id}:
//  *   put:
//  *     summary: Create the element
//  *     tags: [Element]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The element id
//  *         example: 1
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             $ref: '#/components/schemas/Element'
//  *     responses:
//  *       200:
//  *         description: Succsess 
//  */
//        .put('/element?:id', upload.single('file'), controller.create_element)
/**
 * @swagger
 * /api/element/elements:
 *   get:
 *     summary: Get all elements
 *     tags: [Element]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: filter elements by type
 *         example: Профиль
 *       - in: query
 *         name: sort_title
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort title by specific order
 *         example: desc
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_weight
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort create time by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort update time by specific order
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
       .get('/element/elements', controller.get_elements)

/**
 * @swagger
 * /api/element/{id}:
 *   get:
 *     summary: get one element by id
 *     tags: [Element]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The element id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
       .get('/element/:id', controller.get_one_element)

/**
 * @swagger
 * /api/element/{id}:
 *   patch:
 *     summary: update the element
 *     tags: [Element]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The element id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Element'
 *     responses:
 *       200:
 *         description: Succsess 
 */
       .patch('/element/:id', upload.single('file'), controller.update_element)
// /**
//  * @swagger
//  * /api/element/{id}:
//  *   delete:
//  *     summary: delete the element by id
//  *     tags: [Element]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: The element id
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Success
//  */
//        .delete('/element/:id', controller.delete_element);

    return router;
}
