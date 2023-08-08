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
    var _a, _b, _c;
    try {
        validateBody(req);
        const item = yield _utils_1.prisma.items.create({
            data: {
                name: req.body.name,
                description: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.description) || null,
                type: 'BOOKS',
                data: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.data) || null,
                author_id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id,
            },
            select: {
                id: true,
                name: true,
                available: true,
                type: true,
                data: true,
                description: true,
            },
        });
        res.status(201).json({
            success: true,
            error: false,
            message: 'created successfull',
            data: item,
        });
    }
    catch (err) {
        next(err);
    }
}));
function validateBody(req) {
    var _a, _b, _c, _d;
    const fields = [];
    let isError = false;
    if (!req.body.name) {
        fields.push('name');
        isError = true;
    }
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.type)) {
        fields.push('type');
        isError = true;
    }
    if (isError) {
        throw new _error_1.AppError(401, `${fields === null || fields === void 0 ? void 0 : fields.join(',')} missing fields`);
    }
    if (((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.type) !== 'NEWSPAPER' &&
        ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.type) !== 'DOCUMENTARIES' &&
        ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.type) !== 'BOOKS') {
        throw new _error_1.AppError(422, 'invalid item type');
    }
    if (req.body.name.length > 30) {
        throw new _error_1.AppError(422, 'name too long');
    }
}
