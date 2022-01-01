const Database = require('../services/database');
const Response = require('../services/response');

let CONSTANTS = require('../lib/constants');

let self = module.exports = {
    create: async function (username, password) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select username from ` + CONSTANTS.TABLES.LOGIN + ` where username='` + username + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    resolve(Response.already_exists);

                } else {

                    let insert = `insert into ` + CONSTANTS.TABLES.LOGIN + ` (username, password) values ('${username}', '${password}')`;

                    let response = await Database.insert(insert)

                    resolve(Response.success)

                }

            }
            catch (e) {
                reject(e)
            }
        })
    },
    update: async function (id, username, password) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select * from ` + CONSTANTS.TABLES.LOGIN + ` where id='${id}'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let update = `update ` + CONSTANTS.TABLES.LOGIN + ` set username='${username}', password='${password}' where id='${id}'`;

                    let response = await Database.update(update)

                    resolve(Response.success)

                } else {

                    resolve(Response.does_not_exist);

                }

            }
            catch (e) {
                reject(e)
            }
        })
    },
    fetch_all: async function () {
        return new Promise(async (resolve, reject) => {
            try {

                // let query = `select c.id, c.name, c.contact, s.service, c.start_date, c.end_date from ` + CONSTANTS.TABLES.LOGIN + ` c left join ` + CONSTANTS.TABLES.SERVICE + ` s on s.id = c.service order by c.id desc`;
                let query = `select * from ` + CONSTANTS.TABLES.LOGIN;
                let response = await Database.fetch(query);

                resolve({
                    ...Response.success,
                    result: response.result
                })

            }
            catch (e) {
                reject(e)
            }
        })
    },
    fetch: async function (id) {
        return new Promise(async (resolve, reject) => {
            try {

                // let query = `select contact from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + id + `'`;
                let query = `select * from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + 1 + `'`;
                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    // let query = `select c.id, c.name, c.contact, s.service, c.start_date, c.end_date, s.id service_id from ` + CONSTANTS.TABLES.LOGIN + ` c left join ` + CONSTANTS.TABLES.SERVICE + ` s on s.id = c.service where c.id='` + id + `'`;
                    let query = `select * from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + 1 + `'`;
                    let response = await Database.fetch(query);

                    resolve({
                        ...Response.success,
                        result: response.result[0]
                    })

                } else {

                    resolve(Response.does_not_exist);

                }
            }
            catch (e) {
                reject(e)
            }
        })
    },
    delete: async function (id) {
        return new Promise(async (resolve, reject) => {
            try {

                let query = `select * from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + id + `'`;

                let is_exist = await Database.is_exist(query);

                if (is_exist === 1) {

                    let query = `delete from ` + CONSTANTS.TABLES.LOGIN + ` where id='` + id + `'`;

                    let response = await Database.delete(query);

                    resolve(Response.success)

                } else {

                    resolve(Response.does_not_exist);

                }
            }
            catch (e) {
                reject(e)
            }
        })
    },
}