const StoreController = new (require('../controllers/StoreController'))();
const StoreRouter = require('koa-router')({
    prefix: '/store'
});

StoreRouter.get('/', StoreController.stores);
StoreRouter.get('/:store', StoreController.store);
StoreRouter.post('/', StoreController.addStore, StoreController.stores);
StoreRouter.put('/:store', StoreController.updateStore, StoreController.store);
StoreRouter.delete('/:store', StoreController.deleteStore, StoreController.stores);

module.exports = StoreRouter;