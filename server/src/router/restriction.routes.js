import controller from '../controller/restriction.controller.js'

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Restriction:
 *       type: object
 *       properties:
 *         max_length:
 *           type: int
 *           description: max length restriction
 *           example: 2000
 *         min_length:
 *           type: int
 *           description: min length restriction
 *           example: 100
 *         max_width:
 *           type: int
 *           description: max width restriction
 *           example: 2000
 *         min_width:
 *           type: int
 *           description: min width restriction
 *           example: 100
 *         max_height:
 *           type: int
 *           description: max heigth restriction
 *           example: 2000
 *         min_height:
 *           type: int
 *           description: min heigth restriction
 *           example: 100
 *         vh_ration:
 *           type: int
 *           description: the ratio of vertical faces to all
 *           example: 2000
 *         facade_ratio:
 *           type: int
 *           description: the ratio of the number of facades to the total number of facades of a face
 *           example: 100
 *         ribs_status:
 *           type: boolean
 *           description: status of ribs
 *           example: false
 */

/**
 * @swagger
 * tags:
 *      name: Restriction
 *      description: The Restriction description API
 */

    router
/**
 * @swagger
 * /api/restriction/restrictions:
 *   get:
 *     summary: get all orders
 *     tags: [Restriction]
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/restriction/restrictions', controller.get_restrictions)

/**
 * @swagger
 * /api/restriction:
 *   patch:
 *     summary: update the restirction by id
 *     tags: [Restriction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restriction'
 *     responses:
 *       200:
 *         description: Success
 */
    .patch('/restriction', controller.update_restriction);

    return router;
}
