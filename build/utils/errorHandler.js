"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, res) {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: err });
    }
}
exports.errorHandler = errorHandler;
