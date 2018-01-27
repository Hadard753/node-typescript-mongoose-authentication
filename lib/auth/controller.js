"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../schemas/user");
function register(req, res) {
    let user = new user_1.UserModel(req.body.user);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (error) => {
        res.status(400).send(error);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
}
exports.register = register;
function login(req, res) {
    let { username, password } = req.body;
    if (username === 'Hadar!' && password === 'SecretPass') {
        res.status(200).json({
            username: 'Hadar!',
            password: 'SecretPass',
            token: 'myToken'
        });
    }
    else {
        res.status(401).json({
            error: 'Wrong username or password'
        });
    }
}
exports.login = login;
function getCurrentUser(req, res) {
    let token = req.header('x-auth');
    user_1.UserModel.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject('Invalid token provided');
        }
        res.send(user);
    }).catch((error) => {
        res.status(401).send();
    });
}
exports.getCurrentUser = getCurrentUser;
