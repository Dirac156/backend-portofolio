import express from 'express';
import { graphqlHTTP  } from 'express-graphql';
import { schema, root } from './graphql/schema.graphql';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { GRAPHQL_PATH } = process.env;

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(helmet());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(GRAPHQL_PATH, graphqlHTTP((request, response, graphQlParams) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {
      req: request,
      res: response,
    }
})));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res ) => {
    res.send("Hello Typescript with Node.js!")
});

const server = app.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}/${GRAPHQL_PATH}`);
});


// connectToDatabase().then((response: boolean) => {
//         console.log(`database connection: ${response ? 'successed' : 'failed'}`)
//     }).catch((error: any) => {
//         console.log(error);
//         console.log("closing server");
//         server.close();
//     }
// );

