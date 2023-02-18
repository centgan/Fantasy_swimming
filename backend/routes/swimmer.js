const express = require('express');

const { createSwimmer, fetchSwimmer, fetchAllSwimmer, deleteSwimmer, updateSwimmer} = require('../controllers/swimmerController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.post('/create', createSwimmer);
router.get('/fetch/:id', fetchSwimmer);
router.get('/fetch', fetchAllSwimmer);
router.delete('/del/:id', deleteSwimmer);
router.patch('/up/:id', updateSwimmer);

module.exports = router;
