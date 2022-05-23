import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import {PORT} from './config/index.js';
import router from './router/index.js';

import {errorHandler} from './error/errHandler.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(cors());
app.use(fileUpload({createParentPath: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + '/public')));

app.use(router);
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`);
})