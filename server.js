import express from 'express';
import connectRedis from 'connect-redis';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import redis from 'redis';
import { connectToDatabase } from "./db/db.js";
import router from './router/index.js';

// get environment variables
dotenv.config();

export const redisClient = redis.createClient(process.env.REDIS_URL);


// create a redis store with session
const RedisStore = connectRedis(session);

const sessionMiddleware = session({
    //session configurations
    secret: process.env.SESSION_SECRET_KEY,
    // create new redis store.
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    resave: false,
    proxy: true,
    cookie:{
        maxAge:3600 * 60,
        httpOnly:false,
        secure:false // for normal http connection if https is there we have to set it to true
    },
});

export function sessionHandler(req, res, next) { sessionMiddleware(req, res, next); }

// create express application
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(helmet());
app.use(cors({ credentials: true }));
app.use(router);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors({
//     origin:[process.env.ORIGIN],//frontend server localhost:8080
//     methods:['GET','POST','PUT','DELETE'],
//     credentials: true // enable set cookie
// }));

app.use(cookieParser(process.env.SESSION_SECRET_KEY ));


const PORT = process.env.PORT || 8000;

app.get("/", sessionHandler, (req, res) => {
    res.send("Hello Typescript with Node.js!");
});

const server = app.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
});


connectToDatabase().then((client) => {
        console.log(`database connection: ${client ? 'successed' : 'failed'}`)
    }).catch((error) => {
        console.log(error);
        console.log("closing server");
        server.close();
    }
);


