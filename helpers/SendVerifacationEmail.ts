import { resend } from "@/lib/resend";
import VerificationEmail from "../email/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
         const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mistry Message || Verification Code',
            react: VerificationEmail({username, otp:verifyCode}),
        });
        return{success:true,message:"Send To verification email Sent Successfully"};
     }
    catch (emailError) {
        console.log("Email Error sebding Verification error");
        return{success:false,message:"Failed to Send To verification email"};
    }
}