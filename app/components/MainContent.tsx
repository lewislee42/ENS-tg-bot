'use client'

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  useUserWallets,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import ReCaptcha from "./ReCaptcha";
import ListConnectedWallets from './ListConnectedWallets';

export default function MainContent() {
  const searchParams = useSearchParams();
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const { user, primaryWallet } = useDynamicContext();
  console.log("User:", user); // Debugging log
  console.log("Primary Wallet:", primaryWallet); // Debugging log

  useEffect(() => {
    const user_id = searchParams.get('user_id');
    if (user_id) {
      setTelegramId(user_id);
    }
  }, [searchParams]);

  const handleReCaptchaVerify = useCallback((token: string) => {
    // Mock verification process
    console.log("reCAPTCHA token:", token);
    setIsHumanVerified(true);
  }, []);

  if (!user) {
    return <p className="text-black">Please log in to view your wallet information.</p>;
  }

  return (
    <div className="p-6 absolute left-1/2 transform -translate-x-1/2">
      {telegramId && (
        <p className="mt-4 text-center text-black">
          Telegram ID: {telegramId}
        </p>
      )}
      {!isHumanVerified ? (
        <div className="mt-4">
          <p className="text-black">Please verify that you're human:</p>
          <ReCaptcha onVerify={handleReCaptchaVerify} />
        </div>
      ) : (
        <>
          <ListConnectedWallets />
          {primaryWallet && (
            <div className="text-black">
              Connected!
            </div>
          )}
        </>
      )}
    </div>
  );
}