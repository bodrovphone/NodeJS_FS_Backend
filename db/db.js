require('dotenv').config();
require('mongoose');

const { default: mongoose } = require("mongoose")

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.log('error connecting to db', error.message)
    }
    console.log('connected to db')
}

module.exports = { connect };