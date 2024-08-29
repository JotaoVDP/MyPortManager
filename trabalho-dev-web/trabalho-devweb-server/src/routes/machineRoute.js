const router = require('express-promise-router')();

const machineController = require('../controllers/machineController')

router.post('/registerMachineType', machineController.registerMachineType)
router.post('/registerMachine', machineController.registerMachine)

//busca
router.get('/getMachineTypes', machineController.getMachineTypes)
router.get('/getMachines', machineController.getMachines)

module.exports = router;