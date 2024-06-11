import express, { Request, Response } from 'express';
import db from './db';


const app = express();
const port = 3000;

app.use(express.json());

// Example route to get all users
app.get('/users', (req: Request, res: Response) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

app.post('/api/submit', (req: Request, res: Response) => {
  const { firstName, lastName, gender, age, healthCondition, symptoms, questionsChronicIllness, symptomsList } = req.body;

  const query = 'INSERT INTO users (firstname, lastname, gender, age, health_condition, health_symptoms, symptomsList, chronic_illness) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, gender, age, healthCondition, symptoms, symptomsList, questionsChronicIllness,];

  db.query(query, values, (error, results) => {
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

