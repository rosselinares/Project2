const productRouter = require('./product');
const BrandRouter = require('./brand')
const CustomerRouter = require('./customer')
const EmployeeRouter = require('./employee')
const StoreRouter = require('./store')
const ViewRouter = require('./view')
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
productRouter.routes(),
BrandRouter.routes(),
CustomerRouter.routes(),
EmployeeRouter.routes(),
StoreRouter.routes(),
ViewRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};