var express = require('express');
var router = express.Router();
const { isLoggedIn, isAnon } = require('../middleware/auth')

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/landing', isAnon, (req, res, next) => {
  res.render('landing')
})

module.exports = router;
