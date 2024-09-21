import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// export async function GET(req: NextRequest) {
export async function GET() {
	try {
		console.log("entered GET!!!")
		const client = await clientPromise;
		const db = client.db('telegram_users');
		const collection = await db.collection('test');

		const document = await collection.findOne({ test: 'hello' });

		console.log(document);

		if (!document){
			console.log("Not in DB!!!");
			return NextResponse.json({ message: "hello not found in DB"}, {status: 401});
		}

		return NextResponse.json({ message: "hello" }, { status: 200 });
	} catch (error) {
		console.error('Error fetching from DB:', error);
		return NextResponse.json({ success: false, message: 'Failed to fetch from DB' }, { status: 500 });
	}
}


export async function POST(request: NextRequest)
{
	try {
        console.log("entered POST!!!")
        const client = await clientPromise;
        const db = client.db("telegram_users");
		const collection = await db.collection('test');
        const value = await request.json();

		const document = await collection.findOne({ test: value });

        if (!value) {
            throw new Error('Missing required fields');
        }
        if (document) {
            throw new Error("Admin already exist in database");
        }

        await db.collection("test").insertOne({test: value});

		return NextResponse.json({ message: "Saved to DB Successfully!!!"}, {status: 200});
    } catch (error) {
        console.error('Error saving to DB:', error);
        return NextResponse.json({ message: "Failed to save value to database."}, {status: 400});
    }
}
