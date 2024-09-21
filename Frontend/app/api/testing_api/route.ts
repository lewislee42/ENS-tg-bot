import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '/lib/mongodb';

// export async function POST(request: NextRequest) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('telegram_users');
//     let data = await request.json();

//     const emailExist = await db
//       .collection('test')
//       .findOne({ email: data.email });
//     if (!emailExist) {
//       return NextResponse.json(
//         { message: 'Email not found. Please use a registered email.' },
//         { status: 404 },
//       );
//     }
//     return NextResponse.json(
//       { message: 'Proceeding with email: ' + data.email, user: emailExist },
//       { status: 200 },
//     );
//   } catch (e) {
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 },
//     );
//   }
// }

// export async function GET() {
// 	return NextResponse.json({ message: "Hello from the API!"}, {status: 200});
//   }

export async function GET(req: NextRequest) {
	try {
		console.log("entered!!!")
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


