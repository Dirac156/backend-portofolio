import MongoDBStore from 'connect-mongodb-session';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_PASS, DB } = process.env;

export const connectToDatabase = () => {
    const promise = new Promise( async (resolve, reject) => {
        try {
            const uri = `mongodb+srv://${DB_NAME}:${DB_PASS}@cluster0.7ujj0.mongodb.net/${DB}?retryWrites=true&w=majority`;
            const client = await connect(uri);
            const store = new MongoDBStore({
                uri: 'Link to mongo url',
                collection: "mySessions"
            })
            resolve({ client: client, store: store });
        } catch(error) {
            reject(error);
        }
    })

    return promise;
}