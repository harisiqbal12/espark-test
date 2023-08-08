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
    try {
        const items = yield _utils_1.prisma.items.findMany({
            select: {
                id: true,
                name: true,
                available: true,
                description: true,
                type: true,
                data: true,
                borrow: {
                    select: {
                        name: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
        });
        res.status(200).json({
            success: true,
            error: false,
            message: null,
            data: items,
        });
    }
    catch (err) {
        next(err);
    }
}));
