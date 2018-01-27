"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const config_1 = require("../config");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        unique: true,
        validate: {
            validator: validator_1.isEmail,
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
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, config_1.TOKEN_SECRET);
    user.tokens.push({ access, token });
    return user.save().then(() => {
        return token;
    });
};
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, config_1.TOKEN_SECRET);
    }
    catch (error) {
        console.error('Could not decode Token ', token);
        return mongoose_1.Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
// export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);
// Note the type on the variable, and the two type arguments (instead of one).
exports.UserModel = mongoose_1.model('User', UserSchema);
