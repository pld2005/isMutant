import * as mongoose from 'mongoose';
import config from '../env/index';
mongoose.set('useFindAndModify', false);
interface IConnectOptions {
    loggerLevel ? : string;
    useUnifiedTopology ? : boolean;
    useNewUrlParser ? : boolean;
    useCreateIndex ? : boolean;
}

const connectOptions: IConnectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
};

const MONGO_URI: string = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

// handlers

db.on('connected', () => {
    console.log('\x1b[32m', 'MongoDB :: connected');
});

db.once('open', () => {
    console.log('\x1b[32m', 'MongoDB :: connection opened');
});
