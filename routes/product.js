const ProductController = new (require('../controllers/ProductController'))();
const productRouter = require('koa-router')({
    prefix: '/product'
});

productRouter.get('/', ProductController.products);
productRouter.get('/:product', ProductController.product);
productRouter.post('/', ProductController.addProduct, ProductController.products);
productRouter.put('/:product', ProductController.updateProduct, ProductController.product);
productRouter.delete('/:product', ProductController.deleteProduct, ProductController.products);

module.exports = productRouter;