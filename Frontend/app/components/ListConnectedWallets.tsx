'use client'

import { useUserWallets } from "@dynamic-labs/sdk-react-core";

export default function ListConnectedWallets() {
  const wallets = useUserWallets();
  console.log("Wallets:", wallets); // Debugging log

  if (!wallets || wallets.length === 0) {
    console.log("Wallets:", wallets); // Debugging log
    return <p className="text-black">No wallets connected.</p>;
  }

  return (
    <div className="text-black">
      <h1>Connected Wallets</h1>
      {wallets.map((wallet) => (
        <p key={wallet.id}>Address: {wallet.address}</p>
      ))}
    </div>
  );
}