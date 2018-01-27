"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const router = express.Router();
router.get('/current-user', controller_1.getCurrentUser);
router.post('/login', controller_1.login);
module.exports = router;
