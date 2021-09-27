import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_PASS, DB } = process.env;

export const connectToDatabase = (): Promise<any> => {
    const promise = new Promise( async (resolve, reject) => {
        try {
            await connect(`mongodb+srv://${DB_NAME}:${DB_PASS}@cluster0.pc8qu.mongodb.net/${DB}?retryWrites=true&w=majority`);
            resolve(true);
        } catch(error) {
            reject(error);
        }
    })

    return promise;
}