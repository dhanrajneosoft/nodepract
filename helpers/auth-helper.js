const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const stage = require('../config')['development'];
module.exports = {
    getUserByToken: (req) => {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        const options = {
            expiresIn: "50"
            // issuer: "https://scotch.io"
        };
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        return result;
    },
    generateBcryptPassword: async (password) => {
        // console.log("passwor",password)
        const hashPassword = await bcrypt.hash(password, stage.saltingRounds);
        return hashPassword;
    }
}