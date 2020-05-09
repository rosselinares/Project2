const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class EmployeeController {
    constructor() {
        console.log('Employee Controller Initialized!');
    }

    async employees(ctx) {
        console.log('Controller HIT: Employee::Employees');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employee';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.employee: ${err}`);
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


    async employee(ctx) {
        console.log('Controller HIT: EmployeeController::employee');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM employee WHERE name = ?;';
            const e = ctx.params.employee;

            chpConnection.query({
                sql: query,
                values: [e]
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


    async addEmployee(ctx, next) {
        console.log('Controller HIT: EmployeeController::addEmployee');
        return new Promise((resolve, reject) => {
            const newE = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT employee(ssn, dob, name, store_id) VALUES (?, ?, ?, ?);',
                values: [newE.ssn, newE.dob, newE.name, newE.store_id]
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

    async updateEmployee(ctx, next) {
        console.log('Controller HIT: EmployeeController::updateEmployee');
        return new Promise((resolve, reject) => {
            const e = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE employee
                    SET 
                     store_id = ?
                    WHERE name = ?
                    `,
                values: [e.store_id, ctx.params.employee]
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

    async deleteEmployee(ctx, next) {
        console.log('Controller HIT: EmployeeController::deleteEmployee');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM employee WHERE name = ?;`,
                values: [ctx.params.employee]
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

module.exports = EmployeeController;