import cors from 'cors';
import express, { Express } from 'express';

import consultationRouter from './routes/consultation';

const port = process.env.PORT || 8080;
const frontendUrl = 'http://localhost:3000';

const app: Express = express();
app.use(cors({
  origin: frontendUrl
}));

app.use(express.json());

app.use('/consultations', consultationRouter);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});