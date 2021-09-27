import express, {Request, Response, Application} from 'express';
import helmet from 'helmet';
import cors from 'cors';
// import { connectToDatabase } from './db/db';
// import router from './routes/routes';

const app:Application = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(helmet());
app.use(cors());
// app.use(router);
app.use(function(req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const PORT = process.env.PORT || 8000;

app.get("/", (req:Request, res:Response):void => {
    res.send("Hello Typescript with Node.js!")
});

const server = app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
});


// connectToDatabase().then((response: boolean) => {
//         console.log(`database connection: ${response ? 'successed' : 'failed'}`)
//     }).catch((error: any) => {
//         console.log(error);
//         console.log("closing server");
//         server.close();
//     }
// );

