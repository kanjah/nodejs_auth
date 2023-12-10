require("dotenv").config();
const mongoose = require("mongoose");

//URI
const { MONGODB_URI } = process.env;

const conntectTODB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected")
    }
    catch (e) {
        console.log(e)
    }
};

conntectTODB();