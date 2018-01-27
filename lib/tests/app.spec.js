"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const request = require("supertest");
const app_1 = require("../app");
const user_model_1 = require("../models/user.model");
// beforeEach((done) => {
//     UserModel.remove({}).then(() => {
//         done();
//     }).catch((e) => done(e));
// });
describe('POST /auth/register', () => {
    it('Should create a new user', (done) => {
        var user = {
            username: "wonder_woman",
            email: "hadar753@gmail.com",
            password: "1234"
        };
        request(app_1.default.express)
            .post('/auth/register')
            .send({ user })
            .expect(200)
            .expect((res) => {
            chai_1.expect(res.body.email).to.equal(user.email);
        })
            .end((err, res) => {
            if (err)
                return done(err);
            user_model_1.UserModel.find().then((users) => {
                chai_1.expect(users.length).to.equal(1);
                chai_1.expect(users[0].email).to.equal(user.email);
                done();
            }).catch((error) => done(error));
        });
    });
});
