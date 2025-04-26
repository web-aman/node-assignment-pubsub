const { body } = require("express-validator");

const receiverValid = [
    body('user')
        .exists({ checkFalsy: true })
        .withMessage('User is required')
        .isString()
        .withMessage('User must be a string'),

    body('class')
        .exists({ checkFalsy: true })
        .withMessage('Class is required')
        .isString()
        .withMessage('Class must be a string'),

    body('age')
        .exists({ checkFalsy: true })
        .withMessage('Age is required')
        .isInt()
        .withMessage('Age must be an integer'),

    body('email')
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .withMessage('Please enter a valid email Id'),
];

module.exports = {
    receiverValid
}