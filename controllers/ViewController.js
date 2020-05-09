const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ViewController {
    constructor() {
        console.log('View Controller Initialized!');
    }

    async view(ctx) {
        console.log('Controller HIT: View');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM customer_status';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.view: ${err}`);
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
}

module.exports = ViewController;
