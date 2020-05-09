const CustomerController = new (require('../controllers/CustomerController'))();
const CustomerRouter = require('koa-router')({
    prefix: '/customer'
});

CustomerRouter.get('/', CustomerController.customers);
CustomerRouter.get('/:customer', CustomerController.customer);
CustomerRouter.post('/', CustomerController.addCustomer, CustomerController.customers);
CustomerRouter.put('/:customer', CustomerController.updateCustomer, CustomerController.customer);
CustomerRouter.delete('/:customer', CustomerController.deleteCustomer, CustomerController.customers);

module.exports = CustomerRouter;