const router = require('express-promise-router')();
const basicAuth = require('express-basic-auth');

const containerController = require('../controllers/containerController')
const auth = require('../controllers/auth');

var challangeAuth = basicAuth(
    {
        authorizer: auth.authenticate,
        authorizeAsync: true,
        unauthorizedResponse: { error: "usuario ou senha nao confere" }
    }
)

router.post('/registerContainerType', containerController.registerContainerType)
router.post('/registerContainer',challangeAuth, containerController.registerContainer)

//busca
router.get('/getContainerTypes',challangeAuth, containerController.getContainerTypes)
router.get('/getContainers',challangeAuth, containerController.getContainers)
router.get('/getContainerByLocation',challangeAuth, containerController.getContainerByLocation)
router.get('/getContainerByContainerType',challangeAuth, containerController.getContainerByContainerType)
router.get('/getContainerAlerts',challangeAuth, containerController.getContainerAlerts)
router.get('/getCountContainers',challangeAuth, containerController.getCountContainers)

module.exports = router;