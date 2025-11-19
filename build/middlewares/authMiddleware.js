"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authenticate = void 0;
const token_1 = require("../utils/token");
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "not registered" });
    const token = authHeader.split(" ")[1];
    const decoded = (0, token_1.verifyToken)(token);
    if (!decoded)
        return res.status(401).json({ message: "invalid or expired token" });
    req.locals = {
        token,
        payload: decoded
    };
    next();
}
exports.authenticate = authenticate;
function authorization(roles) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const decoded = (0, token_1.verifyToken)(token);
            ;
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        }
        catch {
            return res.status(401).json({ message: "invalid token" });
        }
    };
}
exports.authorization = authorization;
