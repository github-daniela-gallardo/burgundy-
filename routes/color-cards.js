const router = require('express').Router();
const User = require('../models/user.model');

router.get('/courtney', (req, res, next) => {
    res.render('/views/courtney.hbs')
})

router.get('/esther', (req, res, next) => {
    res.render('/views/esther.hbs')
})

router.get('/daniela', (req, res, next) => {
    res.render('/views/daniela.hbs')
})