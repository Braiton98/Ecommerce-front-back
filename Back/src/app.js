import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth-routes.js';
import gamesRoutes from "./routes/games-routes.js"
import path from "path"

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'))
app.use(express.static(path.join(__dirname, 'static' )))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    next()
})

app.use("/api", authRoutes)
app.use("/api", gamesRoutes)

export default app;