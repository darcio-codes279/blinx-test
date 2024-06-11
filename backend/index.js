"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
// Example route to get all users
app.get('/users', (req, res) => {
    db_1.default.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
