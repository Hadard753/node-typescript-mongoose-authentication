"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const router = express.Router();
router.post('/register', controller_1.register);
router.post('/login', controller_1.login);
router.get('/current', controller_1.getCurrentUser);
module.exports = router;
