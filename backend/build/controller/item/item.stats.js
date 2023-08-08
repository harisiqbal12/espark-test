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
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        let query = {};
        let total = 0;
        if (((_a = req.query) === null || _a === void 0 ? void 0 : _a.type) &&
            (((_b = req.query) === null || _b === void 0 ? void 0 : _b.type) === 'books' ||
                ((_c = req.query) === null || _c === void 0 ? void 0 : _c.type) === 'news' ||
                ((_d = req.query) === null || _d === void 0 ? void 0 : _d.type) == 'docs')) {
            query = { type: (0, _utils_1.getType)(req.query.type) };
        }
        if ((_e = req.query) === null || _e === void 0 ? void 0 : _e.available) {
            query = Object.assign(Object.assign({}, query), { available: req.query.available === 'true' ? true : false });
        }
        if (((_f = Object.keys(query)) === null || _f === void 0 ? void 0 : _f.length) === 0) {
            total = yield _utils_1.prisma.items.count();
        }
        if (((_g = Object.keys(query)) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            total = yield _utils_1.prisma.items.count({
                where: Object.assign({}, query),
            });
        }
        res.status(200).json({
            success: false,
            error: false,
            total: total,
        });
    }
    catch (err) {
        next(err);
    }
}));
