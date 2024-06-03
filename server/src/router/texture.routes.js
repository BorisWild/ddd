import controller from "../controller/texture.controller.js";
import { authenticate_token } from "../models/auth.access.js";
import multer_check from "../models/multer.check.js";
import config from "config"

const upload = multer_check(
       config.get("texture.dir_path"),
       1024 * 1024 * 5
);

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Texture:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: texture name
 *           example: Путин
 *         image:
 *           type: file
 *           description: image file
 *         status:
 *           type: boolean
 *           description: status of availability
 *           example: false
 *         type:
 *           type: string
 *           description: type of the texture
 *           example: Каркас
 */

/**
 * @swagger
 * tags:
 *      name: Texture
 *      description: The Texture description API
 */

    router
/**
 * @swagger
 * /api/texture:
 *   post:
 *     summary: Create the texture
 *     tags: [Texture]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Texture'
 *     responses:
 *       200:
 *         description: Succsess 
 */
       .post('/texture', upload.single('image'), controller.create_texture)

/**
 * @swagger
 * /api/texture/textures:
 *   get:
 *     summary: get all textures
 *     tags: [Texture]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Каркаc", "Панель"]
 *         required: false
 *         description: type of texture
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
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort create time by specific order
 *         example: desc
 *       - in: query
 *         name: sort_type
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort type by specific order
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
 *         description: Success
 */
       .get('/texture/textures', controller.get_textures)

/**
 * @swagger
 * /api/texture/texture_types:
 *   get:
 *     summary: get all texture types
 *     tags: [Texture]
 *     responses:
 *       200:
 *         description: Success
 */
       .get('/texture/texture_types', controller.get_texture_types)

/**
 * @swagger
 * /api/texture/{id}:
 *   get:
 *     summary: get one texture by id
 *     tags: [Texture]
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
 *         description: Success
 */
       .get('/texture/:id', controller.get_one_texture)
/**
 * @swagger
 * /api/texture/{id}:
 *   patch:
 *     summary: update the structure by id
 *     tags: [Texture]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The texture id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Texture'
 *     responses:
 *       200:
 *         description: Success
 */
       .patch('/texture/:id', upload.single('image'), controller.update_texture)

/**
 * @swagger
 * /api/texture/{id}:
 *   delete:
 *     summary: delete the structure by id
 *     tags: [Texture]
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
 *         description: Success
 */
       .delete('/texture/:id', controller.delete_texture)

    return router;
}
