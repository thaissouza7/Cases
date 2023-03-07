import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import Router from './routes/routes.js'
app.use(Router)

app.listen(3000, () => console.log("Api rodando."));

https.createServer({
cert: fs.readFileSync('src/ssl/code.crt'),
key: fs.readFileSync('src/ssl/code.key')
}, app).listen(3001, () => console.log('Rodando em https'));
