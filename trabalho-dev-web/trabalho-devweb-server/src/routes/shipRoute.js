const router = require('express-promise-router')();

const shipController = require('../controllers/shipController')

router.post('/registerShipType', shipController.registerShipType)
router.post('/registerShip', shipController.registerShip)

//busca
router.get('/getShipTypes', shipController.getShipTypes)
router.get('/getShips', shipController.getShips)
router.get('/getShipByType', shipController.getShipByType)
router.get('/getShipMaintenance', shipController.getShipMaintenance)
router.get('/getTotalShips', shipController.getTotalShips)
router.get('/getUsedPercent', shipController.getUsedPercent)

module.exports = router;