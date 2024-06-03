import { Server } from 'http';
import https from 'https';
import fs from 'fs';
import { Router } from 'express';
import express from 'express';
import CORS from './CORS.js'
import bodyParser from 'body-parser'
import Email_auth from './router/email.auth.routes.js'
import Phone_auth from './router/phone.auth.routes.js'
import Auth from './router/auth.routes.js'
import config from 'config'
import pool from './models/pg.js'

pool();

const router = new Router();
const app = express();

app
  .use((req, res, next) => res.status(200).set(CORS) && next())
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', Email_auth(router))
  .use('/api', Phone_auth(router))
  .use('/api', Auth(router)); 

const HTTP_AUTH_PORT = config.get('auth.http_auth_port') || 5000;
// const HTTPS_AUTH_PORT = config.get('auth.https_auth_port') || 5000;

// var https_options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/drimo.dev-2-tech.ru/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/drimo.dev-2-tech.ru/fullchain.pem')
// };

try {
  Server(app).listen(HTTP_AUTH_PORT);
  // https.createServer(https_options, app).listen(HTTPS_AUTH_PORT);
} catch(e) {
  console.log(e.codeName);
}
