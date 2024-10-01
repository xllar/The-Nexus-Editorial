// /api/auth/clear-status.js
import { getSession } from 'next-auth/react';

// Mock function for clearing submission status
async function clearSubmissionStatusByEmail(email) {
  // Implement the logic to clear the submission status in your database
  // This is just a placeholder; replace it with your actual database logic
}

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const email = session.user.email; // No type annotation

  if (req.method === 'POST') {
    try {
      // Clear the submission status for the user
      await clearSubmissionStatusByEmail(email);

      return res.status(200).json({ message: 'Submission status cleared' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to clear submission status' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
