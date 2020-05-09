const BrandController = new (require('../controllers/BrandController'))();
const BrandRouter = require('koa-router')({
    prefix: '/brand'
});

BrandRouter.get('/', BrandController.brands);
BrandRouter.get('/:brand', BrandController.brand);
BrandRouter.post('/', BrandController.addBrand, BrandController.brands);
BrandRouter.put('/:brand', BrandController.updateBrand, BrandController.brand);
BrandRouter.delete('/:brand', BrandController.deleteBrand, BrandController.brands);

module.exports = BrandRouter;