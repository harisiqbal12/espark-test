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
const _utils_1 = require("@utils");
exports.default = (0, _error_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        let data = {};
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) {
            data = {
                name: req.body.name,
            };
        }
        if ((_b = req.body) === null || _b === void 0 ? void 0 : _b.available) {
            data = Object.assign(Object.assign({}, data), { available: req.body.available });
        }
        if ((_c = req.body) === null || _c === void 0 ? void 0 : _c.description) {
            data = Object.assign(Object.assign({}, data), { description: req.body.description });
        }
        if ((_d = req.body) === null || _d === void 0 ? void 0 : _d.data) {
            data = Object.assign(Object.assign({}, data), { data: req.body.data });
        }
        if ((_e = req.body) === null || _e === void 0 ? void 0 : _e.type) {
            data = Object.assign(Object.assign({}, data), { type: req.body.type });
        }
        yield _utils_1.prisma.items.update({
            where: {
                id: req.params.id,
            },
            data: Object.assign({}, data),
        });
        res.status(202).json({
            updated: true,
        });
    }
    catch (err) {
        next(err);
    }
}));
