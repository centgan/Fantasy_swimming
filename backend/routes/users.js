const express = require('express')

// getting controller functions
const { loginUser, signUser, updateUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// login route
router.post('/login', loginUser)

// sign up route
router.post('/signup', signUser)

router.use(requireAuth)
router.post('/update', updateUser)

module.exports = router;
