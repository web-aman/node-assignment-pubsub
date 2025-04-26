const express = require("express");
const connectDb = require("./config/dbConnection");
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const Receiver = require("./models/receiver");
const { checkValidations } = require('./functions/checkValidation')
const { receiverValid } = require('./validations/validation')

const moment = require('moment')

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

connectDb();

global.Redis = require("./functions/redis");

app.post("/receiver", receiverValid, async (req, res) => {

    const errors = validationResult(req);

    const checkValid = await checkValidations(errors);

    if (checkValid.type === "error") {
        return res.status(400).send({
            message: checkValid.errors.msg,
        });
    }

    const data = await Receiver.create({
        id: uuidv4(),
        user: req.body.user,
        class: req.body.class,
        age: req.body.age,
        email: req.body.email,
        inserted_at: moment().toDate()
    });

    await Redis.publish('user_created', data);

    return res.status(200).json({ data, message: 'Data added successfully' });

});

app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});
