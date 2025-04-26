const connectDb = require('./config/dbConnection');
const Listener = require('./models/listen');
const moment = require('moment');

connectDb();

global.Redis = require("./functions/redis");

async function startListen() {

    await Redis.subscribe('user_created', async (message) => {

        const data = JSON.parse(message);

        const listen = await Listener.create({
            id: data.id,
            user: data.user,
            class: data.class,
            age: data.age,
            email: data.email,
            inserted_at: data.inserted_at,
            modified_at: moment().toDate()
        });

        console.log(`Data copied to Listener: ${JSON.stringify(listen)}`);
    });

    console.log('Subscribed to user_created events');
}

startListen();
