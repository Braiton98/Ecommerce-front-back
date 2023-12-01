require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3010;
const routerGames = require('./src/routes/games-routes');

app.get('/', (req, res)=>{
  res.send('<h1>Funciono!!</h1>');
});

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});

app.use('/data', routerGames);

app.use(express.json());

app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`);
});