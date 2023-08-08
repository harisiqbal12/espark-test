"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controller_1 = require("@controller");
const router = (0, express_1.Router)();
router.post('/login', _controller_1.user.login);
router.post('/signup', _controller_1.user.signup);
router.post('/verify', _controller_1.user.verify);
exports.default = router;
