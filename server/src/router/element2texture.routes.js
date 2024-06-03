import controller from '../controller/element2texture.controller.js'
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
 *     Element2texture:
 *       type: object
 *       properties:
 *         element_id:
 *           type: int
 *           description: element id
 *           example: 1
 *         texture_id:
 *           type: int
 *           description: texture id
 *           example: 1
 *         cost:
 *           type: decimal(10, 2)
 *           description: cost of the element and testure together
 *           example: 10.11
 *     Update_element2texture:
 *       type: object
 *       properties:
 *         cost:
 *           type: decimal(10, 2)
 *           description: cost of the element and texture together
 *           example: 10.11
 *         file:
 *           type: file
 *           description: File link to element
 */

/**
 * @swagger
 * tags:
 *      name: Element2texture
 *      description: The Element2texture description API
 */

    router
/**
 * @swagger
 * /api/element2texture:
 *   post:
 *     summary: Create the element2texture item
 *     tags: [Element2texture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Element2texture'
 *     responses:
 *       200:
 *         description: Succsess 
 */
   .post('/element2texture', controller.create_element2texture)

/**
 * @swagger
 * /api/element2texture/element2textures:
 *   get:
 *     summary: get all element2texture items
 *     tags: [Element2texture]
 *     parameters:
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_element_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort element id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_texture_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort texture id by specific order
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
    .get('/element2texture/element2textures', controller.get_element2textures)


/**
 * @swagger
 * /api/element2texture/by_texture/{texture_id}:
 *   get:
 *     summary: get all element2texture items
 *     tags: [Element2texture]
 *     parameters:
 *       - in: path
 *         name: texture_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The texture id
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
 *         description: Sort element id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_cost
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort cost by specific order
 *         example: desc
 *       - in: query
 *         name: sort_weight
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort weight by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort update time by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort create time by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/element2texture/by_texture/:texture_id', controller.get_element2textures_by_texture)

/**
 * @swagger
 * /api/element2texture/{id}:
 *   get:
 *     summary: get one element2texture item by id
 *     tags: [Element2texture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The element2texture id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */

    .get('/element2texture/:id', controller.get_element2texture)

/**
 * @swagger
 * /api/element2texture/{id}:
 *   patch:
 *     summary: update the element2texture item by id
 *     tags: [Element2texture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The element2texture id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Update_element2texture'
 *     responses:
 *       200:
 *         description: Success
 */
     .patch('/element2texture/:id', upload.single('file'), controller.update_element2texture)
/**
 * @swagger
 * /api/element2texture/{id}:
 *   delete:
 *     summary: delete one element2texture item by id
 *     tags: [Element2texture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The element2texture id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
    .delete('/element2texture/:id', controller.delete_element2texture);

    return router;
}
