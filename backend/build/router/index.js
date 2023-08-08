"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _middleware_1 = require("@middleware");
const user_router_1 = __importDefault(require("./user.router"));
const items_router_1 = __importDefault(require("./items.router"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).send('<h1>Backend Api</h1>');
});
router.use('/auth', user_router_1.default);
router.use('/items', _middleware_1.adminPrivilages);
router.use('/items', items_router_1.default);
exports.default = router;
