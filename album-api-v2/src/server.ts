import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import albumsRouter from './routes/albums';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all origins for development
app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hit the /albums endpoint to retrieve a list of albums!');
});

// Albums routes
app.use('/albums', albumsRouter);

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Album API v2 running on http://localhost:${PORT}`);
  });
}

export default app;
