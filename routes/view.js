const ViewController = new (require('../controllers/ViewController'))();
const ViewRouter = require('koa-router')({
    prefix: '/view'
});

ViewRouter.get('/', ViewController.view);

module.exports = ViewRouter;