const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class StoreController {
    constructor() {
        console.log('Store Controller Initialized!');
    }

    async stores(ctx) {
        console.log('Controller HIT: Store::Stores');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM store';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.store: ${err}`);
                }

                ctx.body = res;
                ctx.status = 200;

                resolve();
            });
        })
            .catch(err => {
                ctx.status = 500;
                ctx.body = err;
            });
    }


    async store(ctx) {
        console.log('Controller HIT: StoreController::store');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM store WHERE store_id = ?;';
            const s = ctx.params.store;

            chpConnection.query({
                sql: query,
                values: [s]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
            .catch(err => {
                ctx.status = 500;
                ctx.body = {
                    error: `Internal Server Error: ${err}`,
                    status: 500
                };
            });
    }


    async addStore(ctx, next) {
        console.log('Controller HIT: StoreController::addStore');
        return new Promise((resolve, reject) => {
            const newS = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT store(store_id, name, street, city, state) VALUES (?, ?, ?, ?, ?);',
                values: [newS.store_id, newS.name, newS.street, newS.city, newS.state]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });

        })
            .then(await next)
            .catch(err => {
                ctx.status = 500;
                ctx.body = {
                    error: `Internal Server Error: ${err}`,
                    status: 500
                };
            });
    }

    async updateStore(ctx, next) {
        console.log('Controller HIT: StoreController::updateStore');
        return new Promise((resolve, reject) => {
            const s = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE store
                    SET 
                     name = ?
                    WHERE store_id = ?
                    `,
                values: [s.name, ctx.params.store]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
            .then(await next)
            .catch(err => {
                ctx.status = 500;
                ctx.body = {
                    error: `Internal Server Error: ${err}`,
                    status: 500
                };
            });
    }

    async deleteStore(ctx, next) {
        console.log('Controller HIT: StoreController::deleteStore');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM store WHERE store_id = ?;`,
                values: [ctx.params.store]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
            .then(await next)
            .catch(err => {
                ctx.status = 500;
                ctx.body = {
                    error: `Internal Server Error: ${err}`,
                    status: 500
                };
            });
    }
}

module.exports = StoreController;