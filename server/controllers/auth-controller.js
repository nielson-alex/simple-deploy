const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');
const app_password = 'zndhmbhherqweubv';
const User = require('../models/users');

/* GET */
exports.getUserBySession = (req, res, next) => {
    const id = req.headers.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({ "status": "No accounts found" });
    }

    User.find({ "_id": new mongoose.Types.ObjectId(id) })
        .then(user => {
            res.send({ "data": user });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

/* POST */
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("email:", email);
    console.log("password:", password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({ "status": "No accounts found" });
    }

    User.findOne({ email: email })
        .then(user => {
            console.log("user:", user);

            if (!user) {
                res.status(422).send({ "status": "No user found" });
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    const today = new Date()
                    const expiration = new Date(today)
                    expiration.setDate(expiration.getDate() + 1)

                    console.log("bcrypt");

                    if (doMatch) {
                        console.log("matches");
                        
                        req.session.isLoggedIn = true;
                        req.session.user = user;

                        res.status(200).send({
                            "status": "Success",
                            "user": {
                                "_id": req.session.user._id,
                                "email": req.session.user.email,
                                "first_name": req.session.user.first_name,
                                "last_name": req.session.user.last_name,
                                "isLoggedIn": req.session.isLoggedIn,
                                "session": {
                                    "session_id": req.session.user._id,
                                    "expiration": expiration
                                }
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('#/dashboard/login');
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send({ "status": "error" })
    }

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            res.send({ "status": "Success" });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};