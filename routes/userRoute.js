const { createUser, login, getAllUsers, getUserById, } = require('../controller/userController')
const router = require("express").Router();
const { validateRequest } = require('../middleware/validateRequest')
const { createUserValidator, loginUserValidator } = require('../utils/validate/userValidator')
const { auth, role } = require('../controller/auth');

router.route('/').post(validateRequest(createUserValidator), createUser('user')).get(getAllUsers)
router.route('/login').post(validateRequest(loginUserValidator), login)
router.route('/:id').get(auth, role('admin'), getUserById)
router.route('/addUsers').post(auth, role('admin'), createUser('admin'))
module.exports = router