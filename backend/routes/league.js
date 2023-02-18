const express = require('express')
const { buildLeague, fetchLeague, fetchAll, updateLeague} = require('../controllers/leagueController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.post('/build', buildLeague);
router.get('/get', fetchAll);
router.get('/get/:id', fetchLeague);
router.patch('/update/:id', updateLeague);

module.exports = router;
