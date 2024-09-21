'use client'

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export default function DynamicProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicContextProvider
      settings={{
        events: {
          onEmbeddedWalletCreated: (args) => {
            console.log("onEmbeddedWalletCreated was called", args);
          },
        },
        handlers: {
          handleConnectedWallet: async (args) => {
            console.log("handleConnectedWallet was called", args);
            if (runYourOwnLogic()) {
              return Promise.resolve(true);
            } else {
              console.log("Custom logic failed");
              return Promise.resolve(false);
            }
          },
        },
        environmentId: "26e8ebf8-8650-4980-b4dd-eb139962bf49",
        walletConnectors: [
          EthereumWalletConnectors,
        ],
      }}
    >
      {children}
    </DynamicContextProvider>
  )
}

function runYourOwnLogic() {
  console.log("runYourOwnLogic was called");
  return true;
}