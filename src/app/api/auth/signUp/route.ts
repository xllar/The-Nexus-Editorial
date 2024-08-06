import { NextResponse } from "next/server";
import db from '@/app/lib/db';
import {validateEmail } from '@/app/lib/validateEmail';
import User from '@/model/user';
import bcrypt from 'bcrypt';
import {createActivationToken} from '@/app/lib/token';
import { sendEmail } from "@/app/lib/sendemail-to -gmail/email";
import { activateEmailTemplate } from "@/sendEmailtemplate/activate";

export async function POST(req:any) {
    await db.Connectdb();
    try {
        const body = await req.json();
        const { firstname, lastname, email, password } = body;

        if (!firstname || !lastname || !email || !password) {
            return NextResponse.json({ error: 'Please fill in the right information' }, { status: 400 });
        }

        //check if a valid email-//
        if(!validateEmail (email)){
            return NextResponse.json({error:'Ivalid Email Format!'}, {status:400})
        }
        //check if the email already in database
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message:'Email already exist'}, {status:400});
        }
        //passwordlength
        if(password.length < 6){
          
            return NextResponse.json({message:'Password must not be less than 6'}, {status:400});
        }
        
        ///Encrypt password
        const hashedPasword = await bcrypt.hash(password,12);
        const newUser = new User({firstname,lastname,email,password : hashedPasword });
        const newuser= await newUser.save();
        
        //send-token-when-you-sign-up
         const activationToken = createActivationToken({
            jwt: await newuser._id.toString()
        })
         console.log("Activation token created:", activationToken)
        //let send the email to you
        const url= `${process.env.BASE_URL}/activate/${activationToken}`//when you load this in postman it shows
        //eamil-template
        sendEmail(email,url,'Activate you account',activateEmailTemplate);
        //send everything
        return NextResponse.json({message:"Register sucess! Please activate your email to start!", user:newuser,activationToken,url})  
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
    finally {
        // Ensure that the database connection is closed after operations are complete
        await db.disconnectDb();
      }
}



