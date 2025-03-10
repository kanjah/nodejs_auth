const User = require("./../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("./../otp/controller");

// verify email OTP
const verifyUserEmail = async ({ email, otp }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error("Invalid code passed. Check your inbox for a new one");
        }

        //now update user record to show verified
        await User.updateOne({ email }, { verified: true });

        await deleteOTP(email);
        return;
    }

    catch (error) {
        throw error
    }
}
//send email OTP
const sendVerificationOTPEmail = async (email) => {
    try {
        //check if an account exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error("There's no user account associated with the provided email");

        }
        const otpDetails = {
            email,
            subject: "Email Verification",
            message: "Verify your email with the code below",
            duration: 1,
        };
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    }
    catch (error) {
        throw error
    }
};

module.exports = { sendVerificationOTPEmail, verifyUserEmail };