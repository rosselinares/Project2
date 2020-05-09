const EmployeeController = new (require('../controllers/EmployeeController'))();
const EmployeeRouter = require('koa-router')({
    prefix: '/employee'
});

EmployeeRouter.get('/', EmployeeController.employees);
EmployeeRouter.get('/:employee', EmployeeController.employee);
EmployeeRouter.post('/', EmployeeController.addEmployee, EmployeeController.employees);
EmployeeRouter.put('/:employee', EmployeeController.updateEmployee, EmployeeController.employee);
EmployeeRouter.delete('/:employee', EmployeeController.deleteEmployee, EmployeeController.employees);

module.exports = EmployeeRouter;