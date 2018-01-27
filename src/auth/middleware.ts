import {UserDocument, UserModel} from '../schemas/user';


export const isAuthenticate = (req, res, next) => {
    let token = req.header('x-auth');

    UserModel.findByToken(token).then((user: UserDocument) => {
        if(!user) {
            return Promise.reject(undefined);
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};
