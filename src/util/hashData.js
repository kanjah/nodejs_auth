const bcrypt = require("bcrypt");

//harsh users password function
const hashData = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    }
    catch (error) {
        throw error;
    }
}

//verify harshed password with one user entered function
const verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt.compare(unhashed, hashed)
        return match
    }
    catch (error) {
        throw error;
    }
}

module.exports = { hashData, verifyHashedData };