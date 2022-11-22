const router = require('express').Router();
const User = require('../models/user.model');

const bcryptjs = require('bcryptjs');

const salt = 10

router.get("/logIn", (req, res, next) => {
    res.render("logIn.hbs");
});


router.post('/logIn', (req, res, next) => {

    if (!req.body.userName|| !req.body.password) {
        res.render('logIn.hbs', {errorMessage : "All fields are required"})
        return;
    } 
    
    User.findOne({userName: req.body.userName})
    .then((foundUser) => {
        if (!foundUser) {
            res.render('logIn.hbs', {errorMessage: "This User does not exist"})
        } else {
            let correctPassword = bcryptjs.compareSync(req.body.password, foundUser.password);
            if(correctPassword) {
                req.session.user = foundUser;
                res.render('index', {errorMessage: "You have logged in"})
            } else {
                res.render('logIn.hbs', {errorMessage: "Incorrect Password or Email"})
            }
        }
    })    
})




router.get("/signUp", (req, res, next) => {
    res.render("signUp.hbs");
});


router.post('/signUp',  (req, res, next) => {

    if (!req.body.userName || !req.body.password) {
        // res.send('Sorry you forgot a user name or password')

        res.render("signUp.hbs", { errorMessage: "Sorry you forgot a user name or password" })
        return;
    }

    User.findOne({ userName: req.body.userName })
        .then(foundUser => {
            if (foundUser) {
                res.render('signUp.hbs', { errorMessage: "Sorry user already exists" })
                return;
            }
            return User.create({
                userName: req.body.userName,
                password: bcryptjs.hashSync(req.body.password, salt)
                
            })
        })

        .then(createdUser => {
            console.log('here is the new user', createdUser);
            res.redirect('logIn');
        })

        .catch(err => {
            res.send(err)
        })

})



router.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.render('logIn.hbs', {errorMessage: "You have logged out"})
})

module.exports = router;