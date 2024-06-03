import pool from "../models/pg.js";
import config from 'config'
import { delete_file } from "../models/fs.check.js"
import { 
    check_var,
    check_sort
} from '../models/help.funcs.js';

class Instrument_controller {
    constructor() {

    }

    async get_instruments(req, res) {
        try {
            const rows = await process.pg.query(`SELECT *
                                                FROM instruments`);

                                                
            res.status(200).json(rows);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Instrument_controller();