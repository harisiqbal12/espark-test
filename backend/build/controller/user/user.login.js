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
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_1 = __importDefault(require("cookie"));
const _error_1 = require("@error");
const _utils_1 = require("@utils");
const signToken_1 = __importDefault(require("./signToken"));
exports.default = (0, _error_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validateBody(req);
        const user = yield _utils_1.prisma.user.findUniqueOrThrow({
            where: {
                email: req.body.email,
            },
            select: {
                password: true,
                name: true,
                email: true,
            },
        });
        const passwordMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!passwordMatch)
            throw new _error_1.AppError(401, 'invalid password');
        const token = (0, signToken_1.default)({
            name: user.name,
            email: user.email,
        });
        const maxAgeInSeconds = 24 * 60 * 60;
        const options = {
            maxAge: maxAgeInSeconds,
            httpOnly: false,
            secure: false,
            path: '/',
        };
        const cookieString = cookie_1.default.serialize('jwt', token, options);
        res.setHeader('Set-Cookie', cookieString);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({
            success: true,
            error: false,
            message: 'user logged in',
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
}));
function validateBody(req) {
    if (req.body.password.length < 8) {
        throw new _error_1.AppError(400, 'password too short');
    }
}
