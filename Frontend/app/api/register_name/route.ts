// import { ethers } from 'ethers';
// import { NextResponse, NextRequest } from 'next/server';
// import { ENS_BASE_REGISTRAR_ABI } from '@/app/constants';
// // import { keccak256 } from '@ethersproject/keccak256';
// // import { toUtf8Bytes } from '@ethersproject/strings';
// // import ens registrar

// export async function POST(req: NextRequest, res: NextResponse) {
// 	const data = await req.json();
// 	if (!data) {
// 		return NextResponse.json({'detail': 'Error nothing in body'}, {status:400});
// 	}
// 	if (typeof data['name'] !== 'string') {
// 		return NextResponse.json({'detail': 'Error "name" not given or is not string'}, {status:400});
// 	}
// 	if 

//   const provider = new ethers.JsonRpcProvider(process.env.INFURA_BASE_URL + process.env.INFURA_API_KEY);
// 	// const provider = new ethers.providers.Web3Provider(window.ethereum);

// 	const registrar = new ethers.Contract(process.env.ENS_BASE_REGISTER_ADDR, ENS_BASE_REGISTRAR_ABI, provider);
// 	const available = await registrar.available(data['name']);
// 	// console.log(available);

// 	return NextResponse.json({"available": available}, {status:200});
// }

import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const ENS_REGISTRAR_CONTROLLER_ADDRESS = "0x253553366Da8546fC250F225fe3d25d0C782303b"; // Mainnet ENS Controller

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ensName, duration } = req.body;
  const walletAddress = req.headers.walletAddress; // from dynamic

  if (!ensName || !duration || !walletAddress) {
    return res.status(400).json({ error: "ENS name, duration, and wallet address are required" });
  }

  const provider = new ethers.providers.InfuraProvider("mainnet", process.env.INFURA_API_KEY);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Connected wallet

  const ensRegistrarController = new ethers.Contract(
    ENS_REGISTRAR_CONTROLLER_ADDRESS,
    [
      "function register(string name, address owner, uint duration) external payable"
    ],
    wallet
  );

  const price = await ensRegistrarController.price(ensName, duration); // Get the registration fee

  const tx = await ensRegistrarController.register(ensName, walletAddress, duration, {
    value: price,
  });

  const receipt = await tx.wait();
  res.status(200).json({ receipt });
}
