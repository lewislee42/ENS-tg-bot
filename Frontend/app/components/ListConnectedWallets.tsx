'use client'

import { useUserWallets } from "@dynamic-labs/sdk-react-core";

export default function ListConnectedWallets() {
  const wallets = useUserWallets();

  if (!wallets || wallets.length === 0) {
    return <p className="text-black">No wallets connected.</p>;
  }

  return (
    <div className="text-black space-y-2">
      <h2 className="text-lg font-semibold">Connected Wallets</h2>
      {wallets.map((wallet) => (
        <p key={wallet.id} className="break-all">
          Address: {wallet.address}
        </p>
      ))}
    </div>
  );
}