const User = require("./../user/model");
const { sendOTP } = require("./../otp/controller");


const sendPasswordResetOTPEmail = async (email) => {
    try {
        //check i an account exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error("There's no account associated with the provided eamil");
        }

        //check if user email is verified
        if (!existingUser.verified) {
            throw Error("The email address provided hasn't be verified yet. Do verify your email to continue");
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Enter the code below to reset your password",
            duration: 1,
        };
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;

    }
    catch (error) {
        throw error;
    }
};

module.exports = { sendPasswordResetOTPEmail };