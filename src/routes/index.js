const express = require("express");
const router = express.Router();
const userRoutes = require("./../domain/user");
const OTPRoutes = require("./../domain/otp");
const EmailVerificationRoutes = require("./../domain/email_verification");
const ForgotasswordRoutes = require("./../domain/forgot_password")

router.use("/user", userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email_verification", EmailVerificationRoutes)
router.use("/forgot_password", ForgotasswordRoutes)
module.exports = router;