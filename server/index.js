import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

const port = process.env.PORT || 5000;
const app = express();

//require DB
dotenv.config();

//body-parser
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json({ limit: '50mb' }));

//routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello from the server');
});

//Server Start
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`Server listening on port: http://localhost:${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
