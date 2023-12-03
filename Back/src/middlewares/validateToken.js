import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Ahora puedes acceder a las variables de entorno
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Tu código sigue aquí...


export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "Authorization denied" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" })
        req.user = user
        console.log(user)
        next();
    })

}