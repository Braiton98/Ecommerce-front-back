import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth-routes.js';
import gamesRoutes from "./routes/games-routes.js"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=>{
  res.send('<h2>Servidor corriendo</h2>');
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  next()
})

app.use("/api", authRoutes)
app.use("/api", gamesRoutes)

export default app;