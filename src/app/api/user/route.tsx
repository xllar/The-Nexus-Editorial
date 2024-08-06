import { NextRequest, NextResponse } from 'next/server';
import database from '@/app/lib/db';

// Handler for GET requests
export async function GET(req: NextRequest) {
    try {
       database.Connectdb();
       database.disconnectDb();
        // You can add more logic here to interact with the database if needed
        return NextResponse.json({ name: "john doe" });
    } catch (error) {
        return new NextResponse('Failed to connect to the database', { status: 500 });
    }
}
