import controller from '../controller/category.controller.js'

export default (router) => {

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: category name
 *           example: Полки
 */

/**
 * @swagger
 * tags:
 *      name: Category
 *      description: The Category description API
 */

    router

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create the category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Succsess 
 */
    .post('/category', controller.create_category)

/**
 * @swagger
 * /api/category/categories:
 *   get:
 *     summary: get all categories
 *     tags: [Category]
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
 *         name: sort_children
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort children by specific order
 *         example: desc
 *       - in: query
 *         name: sort_solutions
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort solutions by specific order
 *         example: desc
 *       - in: query
 *         name: sort_update_date
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort sort update date by specific order
 *         example: desc
 *       - in: query
 *         name: sort_create_date
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort sort create date id by specific order
 *         example: desc
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/category/categories', controller.get_categories)


/**
 * @swagger
 * /api/category/popular_category:
 *   get:
 *     summary: get popular categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/category/popular_category', controller.get_popular_categories)

/**
 * @swagger 
 * /api/category/{id}:
 *   get:
 *     summary: get one category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
    .get('/category/:id', controller.get_category)

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: update the structure by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Success
 */
    .patch('/category/:id', controller.update_category)
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: delete one category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The category id
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 */
    .delete('/category/:id', controller.delete_category);

    return router;
}
