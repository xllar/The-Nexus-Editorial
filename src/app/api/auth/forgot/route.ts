import { NextResponse } from "next/server";
import db from '@/app/lib/db';
import { validateEmail } from "@/app/lib/validateEmail";
import User from "@/model/user";
import { sendEmail } from "@/app/lib/sendemail-to -gmail/email";
import { CreateResetToken } from "@/app/lib/token";
import { resetPasswordTemplate } from "@/sendEmailtemplate/reset";

export async function POST(req: any) {
    await db.Connectdb();
    try {
      const body = await req.json();
      const { email } = body;
  
      if (!email) {
        return NextResponse.json({ error: 'Please fill in your email' }, { status: 400 });
      }
  
      // Validate email format
      if (!validateEmail(email)) {
        return NextResponse.json({ error: 'Invalid Email Format!' }, { status: 400 });
      }
  
      // Check if email exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: 'User does not exist in the database!' }, { status: 400 });
      }
  
      // Create reset token
      const resetToken = CreateResetToken({ 
        id:user._id.toString()
      });
      console.log('Reset token:', resetToken);
  
      // Create reset URL
      const url = `${process.env.BASE_URL}/reset-password/${resetToken}`;
      console.log('Reset URL:', url);
  
      // Send email with reset URL
      await sendEmail(email, url,'Reset your password!', resetPasswordTemplate);
  
      return NextResponse.json({ message: 'Password reset link sent successfully' }, { status: 200 });
      
    } catch (error) {
      console.error('An error occurred:', error);
      return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
    finally {
        // Ensure that the database connection is closed after operations are complete
        await db.disconnectDb();
      }
  }
