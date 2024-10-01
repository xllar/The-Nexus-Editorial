import { NextResponse } from 'next/server';
import sanityClient from '@/app/utils/sanityClient';
import { sendEmail } from '@/app/lib/status'; // Adjust the path as necessary
import { approvalEmailTemplate, declineEmailTemplate } from '@/sendEmailtemplate/status'; // Adjust the path as necessary

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    // Fetch the submission status from Sanity based on the user's email
    const submissionStatus = await sanityClient.fetch(`*[_type == "story" && email == $email]{submissionStatus, _createdAt, name}`, { email });

    if (!submissionStatus || submissionStatus.length === 0) {
      return NextResponse.json({ status: 'not_found' }, { status: 404 });
    }

    const status = submissionStatus[0];
    const createdAt = new Date(status._createdAt);
    const now = new Date();

    // Check if 30 minutes have passed since submission
    const thirtyMinutesPassed = (now - createdAt) > 30 * 60 * 1000;

    // Send email based on submission status
    if (status.submissionStatus === 'approved') {
      await sendEmail(email, 'Your Story Submission is Approved', () => approvalEmailTemplate(status.name));
    } else if (status.submissionStatus === 'declined') {
      await sendEmail(email, 'Your Story Submission is Declined', () => declineEmailTemplate(status.name));
    }

    return NextResponse.json({ status: status.submissionStatus, canResubmit: thirtyMinutesPassed }, { status: 200 });
  } catch (error) {
    console.error('Error fetching submission status:', error);
    return NextResponse.json({ error: 'Failed to fetch submission status.' }, { status: 500 });
  }
}
