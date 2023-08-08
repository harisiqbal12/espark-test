"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPrivilages = exports.errorHandler = void 0;
var errorHandler_1 = require("./errorHandler");
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return __importDefault(errorHandler_1).default; } });
var protectItems_1 = require("./protectItems");
Object.defineProperty(exports, "adminPrivilages", { enumerable: true, get: function () { return __importDefault(protectItems_1).default; } });
