import controller from '../controller/payment_method.controller.js'

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Payment_method:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of payment method
 *           example: Картой ОНЛАЙН
 *         description:
 *           type: string
 *           description: user comment
 *           example: Подтвердите получение на почту olegrasputina@gmail.com
 */

/**
 * @swagger
 * tags:
 *      name: Payment_method
 *      description: The payment_method description API
 */

    router
/**
 * @swagger
 * /api/payment_method:
 *   post:
 *     summary: Create the payment_method attribute
 *     tags: [Payment_method]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment_method'
 *     responses:
 *       200:
 *         description: Succsess 
 */
      .post('/payment_method', controller.create_payment_method)

/**
 * @swagger
 * /api/payment_method/payment_methods:
 *   get:
 *     summary: get all payment methods
 *     tags: [Payment_method]
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
      .get('/payment_method/payment_methods', controller.get_payment_methods)

/**
 * @swagger
 * /api/payment_method/payment_method_types:
 *   get:
 *     summary: get all payment method types
 *     tags: [Payment_method]
 *     responses:
 *       200:
 *         description: Success
 */
     .get('/payment_method/payment_method_types', controller.get_payment_method_types)

/**
 * @swagger
 * /api/payment_method/{id}:
 *   get:
 *     summary: get one payment_method attribute by id
 *     tags: [Payment_method]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The payment_method id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
       .get('/payment_method/:id', controller.get_payment_method)

/**
 * @swagger
 * /api/payment_method/{id}:
 *   patch:
 *     summary: update the payment_method attribute by id
 *     tags: [Payment_method]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The payment_method id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment_method'
 *     responses:
 *       200:
 *         description: Success
 */
       .patch('/payment_method/:id', controller.update_payment_method)
/**
 * @swagger
 * /api/payment_method/{id}:
 *   delete:
 *     summary: delete one payment_method attribute by id
 *     tags: [Payment_method]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The payment_method id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
       .delete('/payment_method/:id', controller.delete_payment_method);

    return router;
}
