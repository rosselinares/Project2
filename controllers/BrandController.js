const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class BrandController {
    constructor() {
        console.log('Brand Controller Initialized!');
    }

    async brands(ctx) {
        console.log('Controller HIT: Brand::Brands');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM brand';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.brand: ${err}`);
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


    async brand (ctx) {
        console.log('Controller HIT: BrandController::brand');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM brand WHERE name = ?;';
            const b = ctx.params.product;

            chpConnection.query({
                sql: query,
                values: [b]
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


    async addBrand(ctx, next) {
        console.log('Controller HIT: BrandController::addBrand');
        return new Promise((resolve, reject) => {
            const newB = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT brand(name, unique_id) VALUES (?, ?);',
                values: [newB.name, newB.unique_id]
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

    async updateBrand(ctx, next) {
        console.log('Controller HIT: BrandController::updateBrand');
        return new Promise((resolve, reject) => {
            const b = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE brand
                    SET 
                     name = ?
                    WHERE unique_id = ?
                    `,
                values: [b.name, ctx.params.brand]
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

    async deleteBrand(ctx, next) {
        console.log('Controller HIT: BrandController::deleteBrand');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM brand WHERE name = ?;`,
                values: [ctx.params.brand]
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

module.exports = BrandController;