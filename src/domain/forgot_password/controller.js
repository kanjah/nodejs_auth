const User = require("./../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("./../otp/controller");
const { hashData } = require("./../../util/hashData");


//reset user pass
const resetUserPassword = async ({ email, otp, newPassword }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error("Invalid code passed. Confirm from your inbox again");
        }

        //now update user record with new password
        const hashedNewPassword = await hashData(newPassword);
        await User.updateOne({ email }, { password: hashedNewPassword });

        //delete otp after password change
        await deleteOTP(email);

        return;
    }

    catch (error) {
        throw error;
    }
}
//send user reset pass otp
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

module.exports = { sendPasswordResetOTPEmail, resetUserPassword };