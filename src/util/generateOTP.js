const generateOTP = async () => {
    try {
        // gets 4 numeric number for OTP
        return (otp = `${Math.floor(1000 + Math.random() * 9000)}`)
    }
    catch (error) {
        throw error;
    }
}

module.exports = generateOTP;