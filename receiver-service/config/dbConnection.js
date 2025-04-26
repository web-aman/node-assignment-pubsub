const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDb = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/pubsub_assignment', {
            usenewurlparser: true,
            useunifiedtopology: true,
        });

        console.log("Database connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;
