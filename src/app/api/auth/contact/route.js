import { NextResponse } from 'next/server';
import sanityClient from '@/app/utils/sanityClient'; // Ensure this is imported for Sanity.
import { sendEmail } from '@/app/lib/contact';
import { validateEmail } from '@/app/lib/validateEmail';
import { storySubmissionTemplate } from '@/sendEmailtemplate/contact'; 



export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const storyFile = formData.get('story');

    if (!name || !email || !message || !storyFile) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const uploadedFile = await sanityClient.assets.upload('file', storyFile, {
      filename: storyFile.name,
    });

    const newSubmission = {
      _type: 'story',
      name,
      email,
      message,
      storyFile: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: uploadedFile._id,
        },
      },
      submissionStatus: 'waiting',
    };

    await sanityClient.create(newSubmission);

    // Prepare email content using the template function
    const emailContent = storySubmissionTemplate(name, uploadedFile.url);

    // Send confirmation email using the template function
    await sendEmail(
      email,
      uploadedFile.url, // Pass the relevant URL for the link
      'Story Submission Received',
       // Pass the template function directly
       storySubmissionTemplate 
    );

    return NextResponse.json({ message: 'Story submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to submit the story.' }, { status: 500 });
  }
}

