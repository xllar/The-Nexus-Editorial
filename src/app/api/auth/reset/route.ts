import { NextResponse } from 'next/server';
import db from '@/app/lib/db';
import User from '@/model/user';
import bcrypt from 'bcrypt';
import Jwt, { JwtPayload } from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await db.Connectdb();
    
    // Parse the request body
    const body = await request.json();
    const { token, password } = body;

    // Verify token and extract user ID
    const decoded = Jwt.verify(token, process.env.RESET_TOKEN_SECRET as string) as JwtPayload;
    const { id } = decoded;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Disconnect from the database
    await db.disconnectDb();
    
    // Return success response
    return NextResponse.json({ message: 'Password reset successfully', email: user.email }, { status: 200 });
  } catch (error) {
    console.error('Error during password reset:', error);

    // Ensure database disconnection in case of error
    await db.disconnectDb();

    // Return error response
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
