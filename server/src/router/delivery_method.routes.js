import controller from '../controller/delivery_method.controller.js'

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery_method:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of delivery method
 *           example: PICKPOINT пункты выдачи
 *         description:
 *           type: string
 *           description: user comment
 *           example: Оставьте посылку у двери и уйдите
 *         cost:
 *           type: decimal(10, 2)
 *           description: Cost of the delivery
 *           example: 650.00
 */
/**
 * @swagger
 * tags:
 *      name: Delivery_method
 *      description: The Delivery_method description API
 */

    router
/**
 * @swagger
 * /api/delivery_method:
 *   post:
 *     summary: Create the delivery_method attribute
 *     tags: [Delivery_method]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery_method'
 *     responses:
 *       200:
 *         description: Succsess 
 */
      .post('/delivery_method', controller.create_delivery_method)

/**
 * @swagger
 * /api/delivery_method/delivery_methods:
 *   get:
 *     summary: get all delivery methods
 *     tags: [Delivery_method]
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
 *         description: Sort name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_cost
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort cost by specific order
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
     .get('/delivery_method/delivery_methods', controller.get_delivery_methods)

/**
 * @swagger
 * /api/delivery_method/delivery_method_types:
 *   get:
 *     summary: get all delivery method types
 *     tags: [Delivery_method]
 *     responses:
 *       200:
 *         description: Success
 */
     .get('/delivery_method/delivery_method_types', controller.get_delivery_method_types)

/**
 * @swagger
 * /api/delivery_method/{id}:
 *   get:
 *     summary: get one delivery_method attribute by id
 *     tags: [Delivery_method]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery_method id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
      .get('/delivery_method/:id', controller.get_delivery_method)

/**
 * @swagger
 * /api/delivery_method/{id}:
 *   patch:
 *     summary: update the delivery_method attribute by id
 *     tags: [Delivery_method]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery_method id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Delivery_method'
 *     responses:
 *       200:
 *         description: Success
 */
      .patch('/delivery_method/:id', controller.update_delivery_method)
/**
 * @swagger
 * /api/delivery_method/{id}:
 *   delete:
 *     summary: delete one delivery_method attribute by id
 *     tags: [Delivery_method]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery_method id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
      .delete('/delivery_method/:id', controller.delete_delivery_method)

/**
 * @swagger
 * /api/delivery_address/?city={city}&address={address}:
 *   get:
 *     summary: get delivery price and match addresses list
 *     tags: [Delivery_method]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city field
 *         example: Москва
 *       - in: path
 *         name: address
 *         schema:
 *           type: string
 *         required: true
 *         description: The address field
 *         example: Пушкинская, д. 6
 *     responses:
 *       200:
 *         description: Success
 */
        .get('/delivery_address/', controller.calculate_delivery);

    return router;
}
