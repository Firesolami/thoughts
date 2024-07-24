require('../auth/passport');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const asyncHanlder = require('express-async-handler');
const Message = require('../models/message');
const { body, validationResult } = require("express-validator");
const User = require('../models/user');

exports.index = asyncHanlder(async(req, res, next) => {
    res.render("index", {
        isSignedIn: req.user ? true : false
    });
});

exports.home = asyncHanlder(async(req, res, next) => {
    const messages = await Message.find({}).populate("author").sort({ date_of_creation : -1 });
    const count = await User.countDocuments({ isMember: true});
    res.render("home", {
        title: "Thoughts",
        messages: messages,
        count: count
    });
});

exports.get_signup = asyncHanlder(async(req, res, next) => {
    if (req.user) {
        res.redirect('/home');
        return;
    }
    res.render("signup", {
        title: "Signup",
        errors: [],
        user: {
            firstName: '',
            lastName: '',
            username: '',
        }
    });
});

exports.post_signup = [
    body("firstName", "First name must be at least 3 characters long.")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("lastName", "Last name must be at least 3 characters long.")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("username", "Username must be between 3 and 100 characters long.")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("password", "Password must be at least 8 characters long.")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    body('confirmPassword')
        .trim()
        .escape()
        .custom((value, { req }) => {
        if(value != req.body.password){
            throw new Error('Passwords do not match.');
        } else {
            return true;
        }
    }),
    asyncHanlder(async(req, res, next) => {
        const errors = validationResult(req);
        const duplicate = await User.findOne({ username: req.body.username });
        if (duplicate !== null || !errors.isEmpty()) {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
            };
            res.render("signup", {
                title: "Signup",
                errors: errors.isEmpty() ? [{msg: "Username already exists."}] : errors.array(),
                user: user
            });
            return;
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword
            });
            await user.save();
            next();
        }
    }),
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login"
})];

exports.logout = asyncHanlder(async(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

exports.get_login = asyncHanlder(async(req, res, next) => {
    if (req.user) {
        res.redirect('/home');
        return;
    }
    res.render("login", {
        title: "Thoughts - Login",
        errors: [],
        user:{ username: ''}
    });
});

exports.post_login = [
    body("username", "Username must be between 3 and 100 characters long.")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("password", "Password must be at least 8 characters long.")
        .trim()
        .isLength({ min: 8 })
        .escape(),
    asyncHanlder(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            const user = {
                username: req.body.username,
            };
            res.render("login", {
                title: "Thoughts - Login",
                errors: errors.array(),
                user: user
            });
            return;
        }
        next();
    }),
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
})];

exports.get_message = asyncHanlder(async(req, res, next) => {
    const message_detail = await Message.findById(req.params.id).populate("author");
    if (message_detail === null) {
        const err = new Error("Thought not found or has been deleted.");
        err.status = 404;
        return next(err);
    }
    res.render("message-detail", {
        title: "Thoughts",
        message_detail: message_detail
    });
});

exports.become_member_get = asyncHanlder(async(req, res, next) => {
    res.render("become-member", {
        title: "Thoughts - Become a premium member",
        code: '',
        member: req.user.isMember,
        errors: []
    });
});

exports.become_member_post = [
    body("code", "Secret code can only contain numbers.")
        .trim()
        .isInt()
        .escape(),
    asyncHanlder(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render("become-member", {
                title: "Thoughts - Become a premium member",
                code: req.body.code,
                member: false,
                errors: errors.array()
            });
        } else {
            if (req.body.code == process.env.MEMBER_CODE) {
                await User.findByIdAndUpdate(req.user._id, { $set: { isMember: true } });
                res.render("become-member", {
                    title: "Thoughts - Become a premium member",
                    member: true,
                    errors: []
                });
            } else {
                res.render("become-member", {
                    title: "Thoughts - Become a premium member",
                    code: req.body.code,
                    member: false,
                    errors: [{msg: "Incorrect secret code"}]
                });
            }
        }
    }),
];

exports.become_admin_get = asyncHanlder(async(req, res, next) => {
    res.render("become-admin", {
        title: "Thoughts - Become an admin",
        admin: req.user.isAdmin,
        code: '',
        errors: []
    });
});

exports.become_admin_post = [
    body("code", "Secret code can only contain numbers.")
        .trim()
        .isInt()
        .escape(),
    asyncHanlder(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render("become-admin", {
                title: "Thoughts - Become an admin",
                code: req.body.code,
                admin: false,
                errors: errors.array()
            });
        } else {
            if (req.body.code == process.env.ADMIN_CODE) {
                await User.findByIdAndUpdate(req.user._id, { $set: { isMember: true, isAdmin: true } });
                res.render("become-admin", {
                    title: "Thoughts - Become an admin",
                    admin: true,
                    errors: []
                });
            } else {
                res.render("become-admin", {
                    title: "Thoughts - Become an admin",
                    code: req.body.code,
                    admin: false,
                    errors: [{msg: "Incorrect secret code"}]
                });
            }
        }
    }),
];

exports.create_message_get = asyncHanlder(async(req, res, next) => {
    res.render("create-message", {
        title: "Thoughts - Think a thought",
        message: '',
        errors: []
    });
});

exports.create_message_post = [
    body("message", "Please enter a character.")
        .trim()
        .isLength({min : 1})
        .escape(),
    asyncHanlder(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render("create-message", {
                title: "Thoughts - Think a thought",
                message: req.body.message,
                errors: errors.array()
            });
        } else {
            const message = new Message({
                author: req.user._id,
                message: req.body.message,
                date_of_creation: Date.now() + 3600000
            });
            await message.save();
            res.redirect('/home');
        }
    }),
];

exports.delete = asyncHanlder(async(req, res, next) => {
    const message_detail = await Message.findById(req.params.id);
    if (message_detail === null) {
        const err = new Error("Thought not found or has been deleted.");
        err.status = 404;
        return next(err);
    } else {
        await Message.findByIdAndDelete(req.params.id);
        res.redirect('/home');
    }
});
