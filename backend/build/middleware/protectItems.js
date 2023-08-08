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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _error_1 = require("@error");
const _utils_1 = require("@utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function handler(req, res, next) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = '';
            const secret = process.env.JWT_SECRET;
            if (((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) &&
                ((_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.startsWith('Bearer'))) {
                token = req.headers.authorization.split(' ')[1];
            }
            if ((_d = req.cookies) === null || _d === void 0 ? void 0 : _d.jwt) {
                token = req.cookies.jwt;
            }
            if (!token) {
                throw new _error_1.AppError(401, 'please logged in first');
            }
            const decoded = yield new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, secret, { complete: true }, (err, decoded) => {
                    if (err)
                        reject(err);
                    resolve(decoded);
                });
            });
            const user = yield _utils_1.prisma.user.findUnique({
                where: {
                    //@ts-ignore
                    email: decoded.payload.user.email,
                },
                select: {
                    type: true,
                    id: true,
                },
            });
            if ((user === null || user === void 0 ? void 0 : user.type) !== 'ADMIN') {
                // if you want to public all the get methods you can just move this left condiftion on upper side
                if (req.method === 'GET' || ((_e = req.path) === null || _e === void 0 ? void 0 : _e.includes('borrow'))) {
                    Object.assign(req, {
                        user,
                    });
                    next();
                    return;
                }
                throw new _error_1.AppError(401, "you're not authorized to this route");
            }
            Object.assign(req, {
                user,
            });
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = handler;
