"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
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
app.post("/api/submit", (req, res) => {
    const { firstName, lastName, gender, age, healthCondition, symptoms, questionsChronicIllness, symptomsList } = req.body;
    if (!firstName || !lastName || !gender || !age || !healthCondition || !symptoms || !questionsChronicIllness || !symptomsList) {
        res.status(400).send('Missing required fields');
        return;
    }
    const query = 'INSERT INTO users (firstname, lastname, gender, age, health_condition, health_symptoms, symptomsList, chronic_illness) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, gender, age, healthCondition, symptoms, symptomsList, questionsChronicIllness];
    db_1.default.query(query, values, (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            res.status(500).send('Error inserting user');
            return;
        }
        res.status(200).send('User inserted successfully');
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
