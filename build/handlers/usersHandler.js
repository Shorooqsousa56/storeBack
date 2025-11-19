"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHandler = void 0;
const usersRepository_1 = require("../repositories/usersRepository");
const errorHandler_1 = require("../utils/errorHandler");
const userRep = new usersRepository_1.UserRepository();
class userHandler {
    async createUser(req, res) {
        try {
            const user = await userRep.create(req.body);
            res.status(201).json(user);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getAllUsers(req, res) {
        try {
            const user = await userRep.getAll();
            res.status(200).json(user);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getUsersById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const user = await userRep.getById(id);
            if (user == null) {
                return res.status(404).json({ message: 'user not found!' });
            }
            res.status(200).json(user);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getUsersByEmail(req, res) {
        try {
            const email = req.query.email;
            if (!email) {
                return res.status(400).json({ message: 'email is required' });
            }
            const user = await userRep.getByEmail(email);
            if (user == null) {
                return res.status(404).json({ message: 'user not found!' });
            }
            res.status(200).json(user);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async searchUsers(req, res) {
        try {
            const search = req.query.q;
            if (!search)
                return res.status(400).json({ message: 'Search is required' });
            const users = await userRep.search(search);
            res.status(200).json(users);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async deactiveUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const user = await userRep.deactivate(id);
            if (user == null) {
                return res.status(404).json({ message: 'user not found!' });
            }
            const { role: userRole, email: userEmail } = req.locals.payload;
            if (userRole === 'customer' && user.email !== userEmail) {
                return res.status(404).json({ message: 'access denied' });
            }
            if (userRole === 'admin' && user.role === 'admin' && user.email !== userEmail) {
                return res.status(404).json({ message: 'admin cannot deactivate other admins' });
            }
            res.status(200).json(user);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async updateEmail(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const { id: userId } = req.locals.payload;
            if (userId !== id)
                return res.status(404).json({ message: 'access denied cannot update email' });
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'email is required' });
            }
            const user = await userRep.updateEmail(id, email);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async updatePassword(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const { id: userId } = req.locals.payload;
            if (userId !== id)
                return res.status(404).json({ message: 'access denied cannot update password' });
            const { Password } = req.body;
            if (!Password) {
                return res.status(400).json({ message: 'password is required' });
            }
            const user = await userRep.updatePassword(id, Password);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const { id: userId } = req.locals.payload;
            if (userId !== id)
                return res.status(404).json({ message: 'access denied cannot update user' });
            const user = await userRep.update(id, req.body);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
}
exports.userHandler = userHandler;
