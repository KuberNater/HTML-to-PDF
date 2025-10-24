import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import pdfGenerator from './routes/pdfConverter.route';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.text({ type: 'text/html' }));

app.use('/pdf', pdfGenerator);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server health status is OK',
    status: 'OK',
  });
});

export default app;
