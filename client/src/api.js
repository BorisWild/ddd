import axios from 'axios';

import homeURL from './homeURL.js';

export default axios.create({
  baseURL:  homeURL+'/api/'
});