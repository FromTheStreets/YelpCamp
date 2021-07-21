const User = require('../models/user');
const passport = require('passport');

module.exports.renderRegister=(req, res) => {
    res.render('users/register');
}

module.exports.register=async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'WELCOME TO YELPCAMP');
            res.redirect('/campgrounds');
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }

}

module.exports.renderLogin=(req, res) => {
    res.render('users/login');
}

module.exports.login=(req, res) => {
    req.flash("success", 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnUrl;
    res.redirect(redirectUrl)

}

 module.exports.logout=(req, res) => {
    req.logout();
    req.flash('success', "LOGGED OUT!");
    res.redirect('/campgrounds');
}