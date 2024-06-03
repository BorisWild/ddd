import pool from '../models/pg.js';
import { 
    check_var
} from '../models/help.funcs.js';

class Payment_method_controller {
    constructor() {

    }

    async update_restriction(req, res) {
        try {
            let { max_length, min_length, max_width, min_width,
                max_height, min_height, vh_ration, facade_ratio, ribs_status } = req.body;

            const data = await process.pg.query(`SELECT max_length, min_length,
                                                        max_width, min_width,
                                                        max_height, min_height,
                                                        vh_ration, facade_ratio,
                                                        ribs_status
                                                FROM restrictions`);
            if (data[0] == null) {
                throw { message: "Restriction dose not exist" };
            }

            if (check_var(max_length))
                max_length = data[0].max_length;
            if (check_var(min_length))
                min_length = data[0].min_length;
            if (check_var(max_width))
                max_width = data[0].min_width;
            if (check_var(min_width))
                min_width = data[0].min_width;
            if (check_var(max_height))
                max_height = data[0].max_height;
            if (check_var(min_height))
                min_height = data[0].min_height;
            if (check_var(vh_ration))
                vh_ration = data[0].vh_ration;
            if (check_var(facade_ratio))
                facade_ratio = data[0].facade_ratio;
            if (check_var(ribs_status))
                ribs_status = data[0].ribs_status;

            const rows = await process.pg.query(`UPDATE restrictions
                                                SET max_length=${max_length}, min_length=${min_length},
                                                    max_width=${max_width}, min_width=${min_width},
                                                    max_height=${max_height}, min_height=${min_height},
                                                    vh_ration=${vh_ration}, facade_ratio=${facade_ratio},
                                                    ribs_status=${ribs_status}`);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async get_restrictions(req, res) {
        try {
            const rows = await process.pg.query(`SELECT *
                                                FROM restrictions`);

            res.status(200).json(rows[0]);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}

export default new Payment_method_controller();