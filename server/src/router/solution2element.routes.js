import controller from '../controller/solution2element.controller.js'

export default (router) => {
/**
 * @swagger
 * components:
 *   schemas:
 *     Solution2element:
 *       type: object
 *       properties:
 *         element2texture_id:
 *           type: int
 *           description: solution2element id
 *           example: 1
 *         solution_id:
 *           type: int
 *           description: solution id
 *           example: 1
 *         quantity:
 *           type: integer
 *           description: quantity of element and texture combinations in solution
 *           example: 5
 */

/**
 * @swagger
 * tags:
 *      name: Solution2element
 *      description: The Solution2element description API
 */

    router
/**
 * @swagger
 * /api/solution2element:
 *   post:
 *     summary: Create the solution2element item
 *     tags: [Solution2element]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solution2element'
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .post('/solution2element', controller.create_solution2element)

/**
 * @swagger
 * /api/solution2element/solution2elements:
 *   get:
 *     summary: get all solution2element items
 *     tags: [Solution2element]
 *     parameters:
 *       - in: query
 *         name: sort_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_element2texture_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort element2texture id by specific order
 *         example: desc
 *       - in: query
 *         name: sort_solution_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solution id by specific order
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
    .get('/solution2element/solution2elements', controller.get_solution2elements)

/**
 * @swagger
 * /api/solution2element/{id}:
 *   get:
 *     summary: get one solution2element item by id
 *     tags: [Solution2element]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The solution2element id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/solution2element/:id', controller.get_solution2element)

/**
 * @swagger
 * /api/solution2element/{id}:
 *   patch:
 *     summary: update the solution2element item by id
 *     tags: [Solution2element]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The solution2element id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solution2element'
 *     responses:
 *       200:
 *         description: Success
 */
    .patch('/solution2element/:id', controller.update_solution2element)
/**
 * @swagger
 * /api/solution2element/{id}:
 *   delete:
 *     summary: delete one solution2element item by id
 *     tags: [Solution2element]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The solution2element id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
     .delete('/solution2element/:id', controller.delete_solution2element)

/**
 * @swagger
 * /api/solution2element/solution/{id}:
 *   delete:
 *     summary: delete several solution2element items by id
 *     tags: [Solution2element]
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
     .delete('/solution2element/solution/:id', controller.delete_solution_solution2element);

    return router;
}
