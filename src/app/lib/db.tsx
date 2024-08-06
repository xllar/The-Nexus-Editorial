import mongoose, { ConnectOptions } from 'mongoose';

const connection: Connection = {};

interface Connection {
    isConnected?: number;
}

// Extend the ConnectOptions interface to include useNewUrlParser and useUnifiedTopology
interface CustomConnectOptions extends ConnectOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
}

export async function Connectdb() {
    if (connection.isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Using previous connection to the database.");
            return;
        }
        await mongoose.disconnect();
    }

    const uri = process.env.MONGODB_URI as string;  
    const options: CustomConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    const db = await mongoose.connect(uri, options);

    console.log("New connection to the database");
    connection.isConnected = db.connections[0].readyState;
}

export async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = 0; 
        } else {
            console.log("Not disconnected from database");
        }
    }
}

const db = { Connectdb, disconnectDb };
export default db;