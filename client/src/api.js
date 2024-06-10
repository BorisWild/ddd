import axios from 'axios';

import homeURL from './homeURL.js';

export default axios.create({
  baseURL:  'https://api.drimo.dev-2-tech.ru/api/'
});
