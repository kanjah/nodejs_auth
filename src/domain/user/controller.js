
const User = require("./model");
const { hashData, verifyHashedData } = require("./../../util/hashData");
const createToken = require("../../util/createToken");


//for user Signup
const authenticateUSer = async (data) => {
    try {
        const { email, password } = data;

        //check for user email
        const fetchedUser = await User.findOne({
            email
        });
        if (!fetchedUser) {
            throw Error("email entered is not registered to any account");
        }

        //check if hashed password is the same with the unhashed passwod enterd by the user
        const hashedPassword = fetchedUser.password;
        const passowrdMatch = await verifyHashedData(password, hashedPassword);

        if (!passowrdMatch) {
            throw Error("invalid password, please try again!")
        }

        //if password match create user token
        const tokenData = { userId: fetchedUser._id, email };
        const token = await createToken(tokenData)

        //assign user token
        fetchedUser.token = token;
        return fetchedUser;
    }
    catch (error) {
        throw error;
    }
}


// For user signup
const createNewUser = async (data) => {
    try {
        const { name, email, password } = data;

        //checking if user already exists
        const existingUser = await User.findOne
            ({ email });

        if (existingUser) {
            throw Error("User with the provided email already exists");
        }

        //hashh passwd
        const hashedPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        //save user
        const createdUser = await newUser.save();
        return createdUser;
    }
    catch (error) {
        throw error;
    }
}

module.exports = { createNewUser, authenticateUSer };