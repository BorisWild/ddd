import controller from '../controller/instrument.controller.js';

export default (router) => {
  /**
   * @swagger
   * tags:
   *      name: Instrument
   *      description: The Texture description API
   */

  router

      /**
       * @swagger
       * /api/instrument/instruments:
       *   get:
       *     summary: get all instruments
       *     tags: [Instrument]
       *     responses:
       *       200:
       *         description: Success
       */
      .get('/instrument/instruments', controller.get_instruments)

  return router;
}
