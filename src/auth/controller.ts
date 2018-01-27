import * as express from 'express';
import * as passwordHash from 'password-hash';

import {UserDocument, UserModel} from '../schemas/user';

export function register(req: express.Request, res: express.Response) {
    let user = new UserModel(req.body.user);
    user.save().then(() => {
        return user.generateAuthToken();
    }, (error) => {
        res.status(400).send(error);
    }).then((token: string) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
}

export function login(req: express.Request, res: express.Response) {
    let {email, password} = req.body;
    UserModel.findByCredentials(email, password).then((user: UserDocument) => {
        return user.generateAuthToken().then((token: string) => {
            res.header('x-auth', token).send(user);
        });
    }).catch(e => {
        res.status(400).send(e);
    });
}

export function getCurrentUser(req, res: express.Response) {
    res.send(req.user);
}

export function logout(req, res: express.Response) {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
}