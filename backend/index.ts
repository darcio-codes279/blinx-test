import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import db from './db';

const app = express();
const port = 3000;

app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Endpoint for submitting a new questionnaire entry
app.post('/questionnaire', (req: Request, res: Response) => {
  const { firstName, lastName, age, gender, healthCondition, symptoms, questionsChronicIllness, symptomsList } = req.body;

  // Perform validation and sanitization on the input data

  // Insert the questionnaire entry into the database
  db.query('INSERT INTO users (firstName, lastName, age, gender, healthCondition, symptoms, questionsChronicIllness, symptomsList) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, age, gender, healthCondition, symptoms, questionsChronicIllness, symptomsList], (error, results) => {
    if (error) {
      console.error('Error inserting questionnaire entry:', error);
      res.status(500).send('Error inserting questionnaire entry');
      return;
    }

    res.status(201).send('Questionnaire entry submitted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
