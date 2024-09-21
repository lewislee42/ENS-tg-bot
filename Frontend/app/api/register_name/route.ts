import { ethers } from 'ethers';
import { NextResponse, NextRequest } from 'next/server';
import { ENS_BASE_REGISTRAR_ABI } from '@/app/constants';
import { getServerSession } from "next-auth/next";
import { JwksClient } from 'jwks-rsa';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { keccak256 } from '@ethersproject/keccak256';
// import { toUtf8Bytes } from '@ethersproject/strings';
// import ens registrar

export async function POST(req: NextRequest, res: NextResponse) {
	const data = await req.json();
	if (!data) {
		return NextResponse.json({'detail': 'Error nothing in body'}, {status:400});
	}
	if (typeof data['name'] !== 'string') {
		return NextResponse.json({'detail': 'Error "name" not given or is not string'}, {status:400});
	}
	if (typeof data['address'] !== 'string') {
		return NextResponse.json({'detail': 'Error "address" not given or is not string'}, {status:400});
	} 
	if (typeof data['duration'] !== 'number') {
		return NextResponse.json({'detail': 'Error "duration" not given or is not number'}, {status:400});
	} 

	// const session = await getServerSession(req, res, AuthOptions);
	// if (session) {
	// 	console.log("it works?");
	// }


	const provider = new ethers.JsonRpcProvider(process.env.INFURA_BASE_URL + process.env.INFURA_API_KEY);
	// const provider = new ethers.providers.Web3Provider(window.ethereum);

	const secret = ethers.randomBytes(32);
	const resolver = data['resolver'] || process.env.PUBLIC_RESOLVER_ADDR;
	var metadata = [];
	const reverseRecord = false;
	const ownerControlledFuses = 0;
  console.log('feat', data);
	// figure out signerKey here
	// import jwt, { JwtPayload } from 'jsonwebtoken';

	// can be found in https://app.dynamic.xyz/dashboard/developer/api
	const jwksUrl = `https://app.dynamic.xyz/api/v0/sdk/${process.env.DYNAMIC_ID}/.well-known/jwks`;

	// The clinet should be initalized as
	const client = new JwksClient({
		jwksUri: jwksUrl,
		rateLimit: true,
		cache: true,
		cacheMaxEntries: 5,  // Maximum number of cached keys
		cacheMaxAge: 600000 // Cache duration in milliseconds (10 minutes in this case))}
 });

const signingKey = await client.getSigningKey();
// const publicKey = signingKey.getPublicKey();

// const decodedToken: JwtPayload = jwt.verify(encodedJwt, publicKey, {
//   ignoreExpiration: false,
// }) as JwtPayload;

	const registrar = new ethers.Contract(process.env.ENS_BASE_REGISTER_ADDR, ENS_BASE_REGISTRAR_ABI, signingKey);

// check support for resolver here

	const available = await registrar.register(
		data['name'],
		data['owner'], 
		data['duration'],
		secret,
		resolver,
		metadata,
		reverseRecord,
		ownerControlledFuses
	);
	// console.log(available);

	return NextResponse.json({"available": "good"}, {status:200});
}
