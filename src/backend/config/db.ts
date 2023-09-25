import mongoose, {Connection} from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/wecan-x-o-game'; // Замініть на вашу URI бази даних

mongoose.connect(mongoURI, {

});

const db: Connection = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection failed to MongoDB:'));
db.once('open', () => {
    console.log('Connection is successful to MongoDB');
});

export default db;
