"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    }
});
exports.UserModel = mongoose_1.model('User', UserSchema);
