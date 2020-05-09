const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ProductController {
    constructor() {
        console.log('Product Controller Initialized!');
    }

    async products(ctx) {
        console.log('Controller HIT: Product::Products');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM product';

            chpConnection.query(query, (err, res) => {
                if (err) {
                    reject(`Error querying CHP.product: ${err}`);
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


    async product(ctx) {
        console.log('Controller HIT: productController::product');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM product WHERE id = ?;';
            const p = ctx.params.product;

            chpConnection.query({
                sql: query,
                values: [p]
            }, (err, res) => {
                if (err) {
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


    async addProduct(ctx, next) {
        console.log('Controller HIT: ProductController::addProduct');
        return new Promise((resolve, reject) => {
            const newP = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT product(name, numPoints, brandname, custId) VALUES (?, ?, ?, ?);',
                values: [newP.name, newP.numPoints, newP.brandname, newP.custId]
            }, (err, res) => {
                if (err) {
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

    async updateProduct(ctx, next) {
        console.log('Controller HIT: ProductController::updateProduct');
        return new Promise((resolve, reject) => {
            const p = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE product
                    SET 
                     custId = ?
                    WHERE name = ?
                    `,
                values: [p.custId, ctx.params.product]
            }, (err, res) => {
                if (err) {
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

    async deleteProduct(ctx, next) {
        console.log('Controller HIT: ProductController::deleteProduct');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM product WHERE id = ?;`,
                values: [ctx.params.product]
            }, (err, res) => {
                if (err) {
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

module.exports = ProductController;