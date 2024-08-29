const router = require('express-promise-router')();
const basicAuth = require('express-basic-auth');

const userController = require('../controllers/userController');
const auth = require('../controllers/auth');

var challangeAuth = basicAuth(
    {
        authorizer: auth.authenticate,
        authorizeAsync: true,
        unauthorizedResponse: { error: "usuario ou senha nao confere" }
    }
)

router.post('/registerUser', userController.registerUser);

router.post('/login', challangeAuth, function (req, res) {
    res.status(200).send({ sucesso: 1 })
})

module.exports = router;