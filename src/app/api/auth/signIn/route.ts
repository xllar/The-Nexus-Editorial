import { NextResponse } from "next/server";
import db from '@/app/lib/db';
import User from "@/model/user";
import bcrypt from 'bcrypt';
import { generateAuthToken } from '@/app/lib/signIntoken';

export async function POST(req:any) {
    await db.Connectdb();
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'Please enter your information' }, { status: 400 });
        }

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        // Generate JWT
        const token = generateAuthToken({ id: user._id });

        return NextResponse.json({ message: 'Sign-in successful', token }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    } finally {
        await db.disconnectDb();
    }
}
