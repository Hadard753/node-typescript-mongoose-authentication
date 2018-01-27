import {Document, model, Model, Schema, Promise} from "mongoose";
import {isEmail} from 'validator';
import * as passwordHash from 'password-hash';
import * as jwt from 'jsonwebtoken';
import * as _ from 'underscore';

import {TOKEN_SECRET} from '../config';
import {User} from '../interfaces/user';

export interface UserDocument extends User,Document {
    // declare any instance methods here
    generateAuthToken(): Promise<string>;
    removeToken(token: string): Promise<void>;
}

export interface UserModelInterface extends Model<UserDocument> {
    // declare any static methods here
    findByToken(token: string): Promise<UserDocument>; 
    findByCredentials(email: string, password: string): Promise<UserDocument>; 
}

var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        unique: true,
        validate: {
            validator: isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        user.password = passwordHash.generate(user.password);
    }        
    next();
});

// Function on user document - receive this=the user document we are operating on
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, TOKEN_SECRET);

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token: string): Promise<void> {
    var user = this;

    return user.update({
        $pull: {
            tokens : { token }
        }
    });
}

// Functions on user collection
UserSchema.statics.findByToken = function (token: string): Promise<UserDocument> {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, TOKEN_SECRET);
    } catch (error) {
        return Promise.reject();
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email: string, password: string): Promise<UserDocument> {
    let User = this;
    return User.findOne({ email }).then((user: UserDocument) => { 
        if(!user) return Promise.reject('Email not found');
        if(!passwordHash.verify(password, user.password)) return Promise.reject('Wrong password');
        return user;
    });
}
// export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);

// Note the type on the variable, and the two type arguments (instead of one).
export const UserModel: UserModelInterface = model<UserDocument, UserModelInterface>('User', UserSchema);