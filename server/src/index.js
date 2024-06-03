import { Server } from 'http';
import https from 'https';
import fs from 'fs';
import { Router } from 'express';
import express from 'express';
import CORS from './CORS.js'
import bodyParser from 'body-parser'
import Texture from './router/texture.routes.js'
import Element from './router/element.routes.js'
import Instrument from './router/instrument.routes.js'
import Restriction from './router/restriction.routes.js'
import Solution from './router/solution.routes.js'
import Category from './router/category.routes.js'
import Subcategory from './router/subcategory.routes.js'
import Element2texture from './router/element2texture.routes.js'
import Solution2element from './router/solution2element.routes.js'
import Order from './router/order.routes.js'
import Delivery_method from './router/delivery_method.routes.js'
import Payment_method from './router/payment_method.routes.js'
import Saved from './router/saved.routes.js'
import config from 'config'
import swagger_UI from  'swagger-ui-express'
import swagger_JS_DOC from 'swagger-jsdoc'
import pool from './models/pg.js'

pool();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Drimo API"
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Auth server"
      },
      {
        url: "http://localhost:4321",
        description: "Job executer"
      },
      {
        url: "https://drimo.dev-2-tech.ru:4321",
        description: "Job executer"
      },
      {
        url: "https://drimo.dev-2-tech.ru:5000",
        description: "Auth server"
      }
    ]
  },

  apis: ['./src/router/*.routes.js']
}

const specs = swagger_JS_DOC(options);
const router = new Router();
const app = express();

app
  .use((req, res, next) => res.status(200).set(CORS) && next())
  .use("/api-docs", swagger_UI.serve, swagger_UI.setup(specs))
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', Solution(router))
  .use('/api', Texture(router))
  .use('/api', Element(router))
  .use('/api', Subcategory(router))
  .use('/api', Category(router))
  .use('/api', Element2texture(router))
  .use('/api', Solution2element(router))
  .use('/api', Payment_method(router))
  .use('/api', Delivery_method(router))
  .use('/api', Order(router))
  .use('/api', Restriction(router))
  .use('/api', Saved(router))
  .use('/api', Instrument(router))
  .use('/src', (req, res) => {
      res.sendFile(req.url, {root: process.env.HOME});
  })

  const HTTP_PORT = config.get('app_http_port') || 4321;
  // const HTTPS_PORT = config.get('app_https_port') || 4321;

  // var https_options = {
  //   key: fs.readFileSync('/etc/letsencrypt/live/drimo.dev-2-tech.ru/privkey.pem'),
  //   cert: fs.readFileSync('/etc/letsencrypt/live/drimo.dev-2-tech.ru/fullchain.pem')
  // };

  try {
    Server(app).listen(HTTP_PORT);
    // https.createServer(https_options, app).listen(HTTPS_PORT);
  } catch(e) {
    console.log(e.codeName);
  }
 
