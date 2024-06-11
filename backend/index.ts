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
