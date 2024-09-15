import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import Subscriber from "@/model/subscriber";
import User from "@/model/user";
import { sendNewsletter } from "@/app/lib/newsletter";
import { newsletterTemplate } from "@/sendEmailtemplate/newsletter"; 
import { createActivationToken } from "@/app/lib/token"; 

export async function POST(req: Request) {
  try {
   
    await db.Connectdb();

    const body = await req.json();
    const { email } = body;


    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found. Please sign in to subscribe.' }, { status: 401 });
    }

 
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
    }

    const content = ``;

    
    await sendNewsletter(email, '', 'Welcome to our Newsletter!', newsletterTemplate(content));

  
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return NextResponse.json({ message: 'Successfully subscribed to the newsletter!' }, { status: 200 });
  } catch (error) {
    console.error('Error in subscription:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  } finally {
    await db.disconnectDb();
  }
}
