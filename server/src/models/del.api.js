import config from 'config';
import axios from "axios";

const DEL_LIN_HOST = 'https://api.dellin.ru';
const credentials = {
    'login': 'a.shagaev@delaemit.ru',
    'password': 'QweQwe123!'
};

class DelApi
{
    constructor(orderId) {
        this.sessionId = this.createSession();
        this.orderId = orderId;
    }

    async createSession() {
        await axios.post(DEL_LIN_HOST + '/v1/customers/login.json', {
            'login': credentials.login,
            'password': credentials.password,
            'appkey': config.get('dellin.api_key')
        }).then((response) => {
            return response?.data?.sessionID ?? null;
        }).catch(() => {
            return null;
        });
        return null;
    }

    async logout() {
        if (this.sessionId) {
            await axios.post(DEL_LIN_HOST + '/v3/auth/logout.json ', {
                'appkey': config.get('dellin.api_key'),
                'sessionID': this.sessionId
            }).then((response) => {
                this.sessionId = null;
                return true;
            });
        }
        return false;
    }

    async createOrder(phoneNr, address, comment) {
        if (this.sessionId) {
            await axios.post(DEL_LIN_HOST + '/v2/request.json', {
                "appkey": config.get('dellin.api_key'),
                "sessionID": this.sessionId,
                "inOrder": true,
                "delivery": {
                    "deliveryType":{
                        "type": "address"
                    },
                    "accompanyingDocuments": [
                        { "action": "send", "payer": "sender" },
                        { "action": "return", "payer": "sender" }
                    ],
                    "derival":{
                        "produceDate": (new Date()).toISOString().slice(0, 10),
                        "variant": "address",
                        "payer": "sender",
                        "address": {
                            "search": config.get('dellin.pick_up_address')
                        },
                    },
                    "arrival":{
                        "variant": "address",
                        "payer": "sender",
                        "address": {
                            "search": address
                        },
                    },
                    "smsback": phoneNr,
                    "comment": comment
                },
                "payment":{
                    "type":"cash",
                    "primaryPayer":"sender",
                }
            }).then(async (response) => {
                if (response.data.requestID) {
                    await process.pg.query(`UPDATE orders
                         SET address = ${ address },
                         dellin_request_id = ${response.data.requestID}
                         WHERE id=${ this.orderId }
                         RETURNING *`);
                }
            });
        }
        return false;
    }

    async cancelOrder(id) {
        if (this.sessionId && id) {
            await axios.post(DEL_LIN_HOST + '/v3/orders/cancel_pickup.json', {
                "appkey": config.get('dellin.api_key'),
                "sessionID": this.sessionId,
                "orderID": id,
                "contactIDs": [], // [ 12345678, 78456123 ]
                "contactPersons": [], // [ { "name":"Иван Иванович" }, { "name":"Петр Петрович" } ]
                "phoneIDs": [], // [ 98765412, 65478921 ]
                "phoneNumbers": [] // [ { "number":"79213332211", "ext":"0123" } ]
            }).then((response) => {
                if (response.data) {
                    console.log(response.data.info);
                    return true;
                }
            });
        }
        return false;
    }

    async calculate(city, from, to, weight) {
        if (this.sessionId) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            await axios.post(DEL_LIN_HOST + '/v2/calculator.json', {
                "appkey": config.get('dellin.api_key'),
                "sessionID": this.sessionId,
                "delivery": {
                    "deliveryType": { "type": "auto" }, // "avia"
                    "derival":{
                        "produceDate": tomorrow.toISOString().slice(0, 10),
                        "variant": "address",
                        "address": { "search": from },
                        "time":{
                            "worktimeStart": "09:00",
                            "worktimeEnd": "15:00"
                        }
                    },
                    "arrival": {
                        "variant": "address",
                        "address": { "search": to },
                        "time":{
                            "worktimeStart": "09:00",
                            "worktimeEnd": "20:00"
                        }
                    }
                },
                "payment":{
                    "paymentCitySearch": { "search": city },
                    "type": "cash"
                },
                "cargo":{
                    "quantity": 1,
                    "length": 2,
                    "width": 2,
                    "height": 2,
                    "totalWeight": weight,
                    "totalVolume": 0.02,
                    "oversizedWeight": 0
                }
            }).then((response) => {
                if (response.data) {
                    return {
                        'price_from': response.data?.derival?.price ?? 0,
                        'price_to': response.data?.arrival?.price ?? 0,
                        'full_price': response.data?.price ?? 0,
                        'addresses': response.data?.foundAddresses ?? []
                    };
                }
            });
            return null;
        }
        return null;
    }
}

export {
    DelApi
}