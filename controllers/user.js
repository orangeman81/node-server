const passport = require('passport');
const User = require('../models/user');

exports.signin = (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
}

exports.login = (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            req.session.isLoggedIn = true;
            req.session.userId = user._id;
            req.session.save();
            return res.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
    })(req, res, next);
}

exports.user = (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (!err) {
            res.json({ message: "user logged out" });
        } else {
            res.json({ message: err });
        }
    });
}