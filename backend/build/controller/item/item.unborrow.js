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
    var _a;
    try {
        console.log(req.user);
        // validate if the user actually borrowed or not
        yield _utils_1.prisma.items.findFirstOrThrow({
            where: {
                AND: [
                    {
                        id: req.params.id,
                    },
                    {
                        borrow_id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
                    },
                ],
            },
            select: {
                id: true,
            },
        });
        yield _utils_1.prisma.items.update({
            where: {
                id: req.params.id,
            },
            data: {
                borrow_id: null,
            },
        });
        res.status(202).json({ success: true });
    }
    catch (err) {
        next(err);
    }
}));
