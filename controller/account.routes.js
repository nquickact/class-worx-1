var express = require("express");
var passport = require("passport");
var db = require("../models");
var path = require("path");
var router = express.Router();

// ALL links in this file get prepended with /account
// ==================================================
router.get('/login' , (req, res, next) => {
    res.render(path.join(__dirname, "../views/login.handlebars"));
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, teacher, info) {
        if (err) { return next(err) }
        if (!teacher) {
            res.send('Error');
        }
        req.logIn(teacher, function (err) {
            if (err) { return next(err); }
            res.send('Login Successful');
        });
    })
    (req, res, next)
});

router.post('/signup', passport.authenticate('local-register', {
    successRedirect: '/dashboard',
    failureRedirect: '/account/login'
}))

router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      res.redirect('/account/login')
    })
  })

module.exports = router;