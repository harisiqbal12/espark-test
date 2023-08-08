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
        const user = yield _utils_1.prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
            },
        });
        if (user === null || user === void 0 ? void 0 : user.id) {
            throw new _error_1.AppError(409, 'email address already exists');
        }
        const encPassword = yield bcrypt_1.default.hash(req.body.password, process.env.SALT);
        const createdUser = yield _utils_1.prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: encPassword,
            },
            select: {
                name: true,
                email: true,
            },
        });
        const token = (0, signToken_1.default)({ name: createdUser.name, email: createdUser.email });
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
            message: 'user created',
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
}));
function validateBody(req) {
    var _a, _b, _c;
    const fields = [];
    let error = false;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.name)) {
        fields.push('name');
        error = true;
    }
    if (!((_b = req.body) === null || _b === void 0 ? void 0 : _b.email)) {
        fields.push('email');
        error = true;
    }
    if (!((_c = req.body) === null || _c === void 0 ? void 0 : _c.password)) {
        fields.push('password');
        error = true;
    }
    if (error) {
        throw new _error_1.AppError(400, `${fields.join(',')} fields are missing`);
    }
    if ((req === null || req === void 0 ? void 0 : req.body.name.length) > 20) {
        throw new _error_1.AppError(422, 'name is too long');
    }
    if (req.body.password.length < 8) {
        throw new _error_1.AppError(422, 'password is too short');
    }
    if (!req.body.email.includes('@') || !req.body.email.includes('.com')) {
        throw new _error_1.AppError(422, 'invalid email address');
    }
}
