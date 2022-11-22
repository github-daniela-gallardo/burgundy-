const router = require('express').Router();
// const User = require('../models/user.model');

router.get('/courtney', (req, res, next) => {
    res.render('courtney.hbs')
})

router.get('/esther', (req, res, next) => {
    res.render('esther.hbs')
})

router.get('/daniela', (req, res, next) => {
    res.render('daniela.hbs')
})

module.exports = router;