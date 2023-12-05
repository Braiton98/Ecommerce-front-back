import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path'; // Importa dirname y join desde 'path'
import authRoutes from './routes/auth-routes.js';
import gamesRoutes from "./routes/games-routes.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(express.static(join(__dirname, 'static'))); // Usa join para concatenar rutas

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
});

app.get('/', (req, res) => {
    res.send('<h2>Servidor corriendo</h2>');
});


app.use("/api", authRoutes);
app.use("/api", gamesRoutes);

export default app;
