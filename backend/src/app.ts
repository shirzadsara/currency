import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import currencyRoutes from './routes/currency.routes';

const app = express();

// middlewares اتصال ب فرانت اند
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/currency', currencyRoutes);
// health check
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
