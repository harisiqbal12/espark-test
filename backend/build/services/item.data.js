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
const _utils_1 = require("@utils");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield _utils_1.prisma.items.findFirst({
            where: {
                AND: [
                    {
                        name: req.params.name,
                    },
                    {
                        type: (0, _utils_1.getType)(req.params.type),
                    },
                ],
            },
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
        res.status(200).json(Object.assign({}, data));
    });
}
exports.default = handler;
