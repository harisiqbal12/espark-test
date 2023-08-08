"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getType(type) {
    if (type === 'books')
        return 'BOOKS';
    if (type === 'docs')
        return 'DOCUMENTARIES';
    if (type === 'news')
        return 'NEWSPAPER';
}
exports.default = getType;
