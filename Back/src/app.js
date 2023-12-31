import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path'; 
import authRoutes from './routes/auth-routes.js';
import gamesRoutes from "./routes/games-routes.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(express.static(join(__dirname, 'static')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/', (req, res) => {
  res.send('<h2>Servidor corriendo</h2>');
});


app.use("/api", authRoutes);
app.use("/api", gamesRoutes);

export default app;
