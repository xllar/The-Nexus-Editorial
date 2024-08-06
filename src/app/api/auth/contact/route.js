import { getServerSession} from 'next-auth/next'; // Updated import
import { NextAuth } from '@/auth'; // Ensure this path is correct
import db from '@/app/lib/db'; // Ensure this path is correct

export async function POST(req) {
  try {
    // Get session from NextAuth
    const session = await getServerSession({ req, ...NextAuth });

    // Check if the session exists
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    // Parse request body
    const { name, email, message } = await req.json();

    // Validate request body
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
      });
    }

    // Connect to the database
    await db.Connectdb();

    // Implement your logic here (e.g., save to the database or send an email)
    // Example: await db.saveMessage({ name, email, message });

    // Disconnect from the database
    await db.disconnectDb();

    // Respond with success
    return new Response(JSON.stringify({ message: 'Message received' }), {
      status: 200,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Failed to process message:', error);
    return new Response(JSON.stringify({ message: 'Failed to process message' }), {
      status: 500,
    });
  }
}
