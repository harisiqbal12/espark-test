"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _error_1 = require("@error");
const _services_1 = require("@services");
exports.default = (0, _error_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params);
        validateBody(req);
        if (req.params.response === 'status') {
            (0, _services_1.itemStatus)(req, res);
            return;
        }
        if (req.params.response === 'data') {
            (0, _services_1.itemData)(req, res);
            return;
        }
    }
    catch (err) {
        next(err);
    }
}));
function validateBody(req) {
    var _a;
    if (((_a = req.params.name) === null || _a === void 0 ? void 0 : _a.length) > 30) {
        throw new _error_1.AppError(422, 'name too long');
    }
    if (req.params.type !== 'books' &&
        req.params.type !== 'docs' &&
        req.params.type !== 'news') {
        throw new _error_1.AppError(422, 'invalid parameter type');
    }
}
