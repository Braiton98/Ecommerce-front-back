import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Ahora puedes acceder a las variables de entorno
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Tu código sigue aquí...


import jwt from 'jsonwebtoken'

export async function createAccessToken (payload) {
    return  new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.error("Error al firmar el token:", err);
                      reject(err);
                } else {
                      resolve(token);
                }
            }
        );
    });
}

