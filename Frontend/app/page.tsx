"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { useDynamic } from "@dynamic-labs/sdk-react-core";

export default function MyApp() {
  return (
    <DynamicContextProvider settings={{ appId: process.env.NEXT_PUBLIC_DYNAMIC_APP_ID }}>
      <WalletComponent />
    </DynamicContextProvider>
  );
}
