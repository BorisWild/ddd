import controller from '../controller/order.controller.js'
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
 *     OrderCreate:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status of the order
 *           example: Оплачено
 *         city:
 *           type: string
 *           description: city of the order destination
 *           example: Москва
 *         street:
 *           type: string
 *           description: street of the order destination
 *           example: Измайловский проспект
 *         building:
 *           type: string
 *           description: building of the order destination
 *           example: д. 73Б
 *         flat:
 *           type: string
 *           description: flat of the order destination
 *           example: 11 этаж
 *         solution_id:
 *           type: integer
 *           description: id of the solution
 *           example: 1
 *         payment_id:
 *           type: integer
 *           description: id of the payment method
 *           example: 1
 *         delivery_id:
 *           type: integer
 *           description: id of the delivery method
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: id of the user
 *           example: 1
 *         email:
 *           type: string
 *           description: email of the user
 *           example: olegrasputina@gmail.com
 *         user_name:
 *           type: string
 *           description:  user name
 *           example: Василий
 *         comment:
 *           type: string
 *           description: The comment of order
 *           example: У ночного огня, под огромной луной темный лес укрывал...
 *     OrderUpdate:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status of the order
 *           example: Отправлено
 *         city:
 *           type: string
 *           description: city of the order destination
 *           example: Москва
 *         street:
 *           type: string
 *           description: street of the order destination
 *           example: Измайловский проспект
 *         building:
 *           type: string
 *           description: building of the order destination
 *           example: д. 73Б
 *         flat:
 *           type: string
 *           description: flat of the order destination
 *           example: 11 этаж
 *         solution_id:
 *           type: integer
 *           description: id of the solution
 *           example: 1
 *         payment_id:
 *           type: integer
 *           description: id of the payment method
 *           example: 1
 *         delivery_id:
 *           type: integer
 *           description: id of the delivery method
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: id of the user
 *           example: 1
 *         comment:
 *           type: string
 *           description: The comment of order
 *           example: У ночного огня, под огромной луной темный лес укрывал...
 */

/**
 * @swagger
 * tags:
 *      name: Order
 *      description: The Order description API
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
 * /api/order:
 *   post:
 *     summary: Create the order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreate'
 *     responses:
 *       200:
 *         description: Succsess 
 */
      .post('/order', controller.create_order)

/**
 * @swagger
 * /api/order/orders:
 *   get:
 *     summary: get all orders
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: status_type
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ['Оплачен', 'Отменен']
 *       - in: query
 *         name: delivery_type
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *       - in: query
 *         name: payment_type
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of page
 *         example: 1
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_solution_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solution name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_solution_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solution id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_status
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort status name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_price
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort price name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_payment_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort payment_id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_delivery_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort delivery_id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort updated_at by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort created_at by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
      .get('/order/orders', controller.get_orders)

/**
 * @swagger
 * /api/order/order_status:
 *   get:
 *     summary: get all order by status
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Success
 */
      .get('/order/order_status', controller.get_order_status)

/**
 * @swagger
 * /api/order/private_orders:
 *   get:
 *     summary: get all user orders
 *     tags: [Order]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: ID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Success
 */
      .get('/order/private_orders',authenticate_token,
                              check_private_permissions,
                              controller.get_private_orders)

/**
 * @swagger
 * /api/order/private_order/{id}:
 *   get:
 *     summary: get user's order by id 
 *     tags: [Order]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: ID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */

 .get('/order/private_order/:id', authenticate_token,
                              check_user_permissions,
                              controller.get_private_order)



/**
 * @swagger
 * /api/order/{user_id}:
 *   get:
 *     summary: get orders by user_id
 *     tags: [Order]
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
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_solution_name
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solution name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_solution_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solution id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_status
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort status name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_price
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort price name by specific order
 *         example: desc
 *       - in: query
 *         name: sort_payment_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort payment_id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_delivery_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort delivery_id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_updated_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort updated_at by specific order
 *         example: desc
 *       - in: query
 *         name: sort_created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort created_at by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
      .get('/order/:user_id', authenticate_token,
                              check_manager_permissions,
                              controller.get_order)


/**
 * @swagger
 * /api/order/order_id/{id}:
 *   get:
 *     summary: get user's order by id 
 *     tags: [Order]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: header
 *         name: ID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */

 .get('/order/order_id/:id', authenticate_token,
      check_manager_permissions,
      controller.get_order_by_id)

/**
 * @swagger
 * /api/order/{id}:
 *   patch:
 *     summary: update the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderUpdate'
 *     responses:
 *       200:
 *         description: Success
 */
      .patch('/order/:id', controller.update_order)
/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: delete one order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
       .delete('/order/:id', controller.delete_order);

    return router;
}
