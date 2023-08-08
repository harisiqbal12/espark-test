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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _utils_1 = require("@utils");
const _error_1 = require("@error");
exports.default = (0, _error_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        validateBody(req);
        const secret = process.env.JWT_SECRET;
        const response = yield new Promise((resolve, reject) => {
            var _a;
            jsonwebtoken_1.default.verify((_a = req.body) === null || _a === void 0 ? void 0 : _a.token, secret, {
                complete: true,
            }, (err, decode) => {
                if (err) {
                    reject(new _error_1.AppError(422, 'invalid signature or expired token'));
                }
                resolve(decode);
            });
        });
        const user = yield _utils_1.prisma.user.findUniqueOrThrow({
            where: {
                //@ts-ignore
                email: (_b = (_a = response === null || response === void 0 ? void 0 : response.payload) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.email,
            },
            select: {
                type: true,
            },
        });
        console.log(response);
        res.status(200).json({
            success: true,
            error: false,
            user: {
                //@ts-ignore
                name: (_d = (_c = response.payload) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.name,
                //@ts-ignore
                email: (_f = (_e = response.payload) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.email,
                type: user.type,
            },
        });
    }
    catch (err) {
        next(err);
    }
}));
function validateBody(req) {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.token)) {
        throw new _error_1.AppError(400, 'provide token');
    }
}
