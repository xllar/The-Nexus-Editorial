import { NextResponse } from 'next/server';
import db from '@/app/lib/db';
import Contact from '@/model/contact';
import { sendEmail } from '@/app/lib/contact';
import { validateEmail } from '@/app/lib/validateEmail';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
  }

  try {
    await db.Connectdb();

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const emailResult = await sendEmail(
      email,
      '', // URL or other data if needed
      'Contact Form Submission',
      () => `<p>Thank you for reaching out, ${name}. We have received your message and will get back to you soon.</p>`
    );

    if (!emailResult.success) {
      throw new Error('Email sending failed.');
    }

    return NextResponse.json({ message: 'Contact form submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to submit the contact form.' }, { status: 500 });

  } finally {
    await db.disconnectDb(); // close database connection 
  }
}
