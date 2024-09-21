import { ethers } from 'ethers';
import { NextResponse, NextRequest } from 'next/server';
import { ENS_BASE_REGISTRAR_ABI } from '@/app/constants';
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

  const provider = new ethers.JsonRpcProvider(process.env.INFURA_BASE_URL + process.env.INFURA_API_KEY);
	// const provider = new ethers.providers.Web3Provider(window.ethereum);

	const registrar = new ethers.Contract(process.env.ENS_BASE_REGISTER_ADDR, ENS_BASE_REGISTRAR_ABI, provider);
	const available = await registrar.available(data['name']);
	// console.log(available);

	return NextResponse.json({"available": available}, {status:200});
}
