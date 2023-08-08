"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _error_1 = require("@error");
const library_1 = require("@prisma/client/runtime/library");
function handler(err, req, res, next) {
    var _a, _b;
    if (err) {
        console.log(err);
        console.log('error');
        if (err instanceof _error_1.AppError) {
            res.status(err.statusCode).json({
                success: false,
                error: true,
                message: err.message,
            });
            return;
        }
        if (err instanceof library_1.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                res.status(404).json({
                    success: false,
                    error: true,
                    message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.cause) ? err.meta.cause : err.message,
                });
                return;
            }
            if (err.code === 'P2002') {
                res.status(409).json({
                    success: false,
                    error: true,
                    message: `duplicate value of ${(_b = err.meta) === null || _b === void 0 ? void 0 : _b.target}`,
                });
                return;
            }
        }
        res.status(500).json({
            success: false,
            error: true,
            message: 'internal server error',
        });
    }
}
exports.default = handler;
