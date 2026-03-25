import dbConnect from "@/lib/dbConnect";
import UserModel from "@/modal/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/SendVerifacationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // ✅ validation
    if (!username || !email || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ check username
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return Response.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    // ✅ check email
    const existingUserByEmail = await UserModel.findOne({ email });

    // ✅ generate OTP
    const verifyCodeOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // ✅ expiry (1 hour)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (existingUserByEmail) {
    existingUserByEmail.verifyCode = verifyCodeOtp;
    existingUserByEmail.verifyCodeExpiry = expiryDate;
    
    await existingUserByEmail.save();
    } else {
      // ✅ new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode: verifyCodeOtp,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        message: [],
      });

      await newUser.save();
    }

    // ✅ send OTP (correct param)
    await sendVerificationEmail(email, username, verifyCodeOtp);

    return Response.json(
      {
        success: true,
        message: "Verification OTP sent to email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering:", error);

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}