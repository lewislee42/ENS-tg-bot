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

  useEffect(() => {
    const user_id = searchParams.get('user_id');
    if (user_id) {
      setTelegramId(user_id);
    }
  }, [searchParams]);

  const handleReCaptchaVerify = useCallback((token: string) => {
    console.log("reCAPTCHA token:", token);
    setIsHumanVerified(true);
  }, []);

  if (!user) {
    return <p className="text-black text-center">Please log in to view your wallet information.</p>;
  }

  return (
    <div className="space-y-6 text-center">
      {telegramId && (
        <p className="text-black">
          Telegram ID: {telegramId}
        </p>
      )}
      {!isHumanVerified ? (
        <div className="space-y-4">
          <p className="text-black">Please verify that you're human:</p>
          <div className="flex justify-center">
            <ReCaptcha onVerify={handleReCaptchaVerify} />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <ListConnectedWallets />
          {primaryWallet && (
            <div className="text-black bg-green-100 p-2 rounded">
              Connected!
            </div>
          )}
        </div>
      )}
    </div>
  );
}