const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class CustomerController {
    constructor() {
        console.log('Customer Controller Initialized!');
    }

    async customers(ctx) {
        console.log('Controller HIT: Customer::Customers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM customer';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.customer: ${err}`);
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


    async customer(ctx) {
        console.log('Controller HIT: CustomerController::customer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM customer WHERE customer_id = ?;';
            const c = ctx.params.customer;

            chpConnection.query({
                sql: query,
                values: [c]
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


    async addCustomer(ctx, next) {
        console.log('Controller HIT: CustomerController::addCustomer');
        return new Promise((resolve, reject) => {
            const newC = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT customer(customer_id, name, points, status, street, city, state, store_id) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
                values: [newC.customer_id, newC.name, newC.points, newC.status, newC.street, newC.city, newC.state,
                newC.store_id]
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

    async updateCustomer(ctx, next) {
        console.log('Controller HIT: CustomerController::updateCustomer');
        return new Promise((resolve, reject) => {
            const c = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE customer
                    SET 
                     status = ?
                    WHERE name = ?
                    `,
                values: [c.status, ctx.params.customer]
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

    async deleteCustomer(ctx, next) {
        console.log('Controller HIT: CustomerController::deleteCustomer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM customer WHERE name = ?;`,
                values: [ctx.params.customer]
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

module.exports = CustomerController;