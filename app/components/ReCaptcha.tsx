'use client'

import { useState, useRef, useCallback, useEffect } from "react";

const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

export default function ReCaptcha({ onVerify }: { onVerify: (token: string) => void }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);

  const renderReCaptcha = useCallback(() => {
    if (containerRef.current && window.grecaptcha && window.grecaptcha.render && !isRendered.current) {
      window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: onVerify,
      });
      isRendered.current = true;
    }
  }, [onVerify]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.onRecaptchaLoad) {
      window.onRecaptchaLoad = () => {
        setIsScriptLoaded(true);
      };

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        delete window.onRecaptchaLoad;
      };
    }
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      renderReCaptcha();
    }
  }, [isScriptLoaded, renderReCaptcha]);

  return <div ref={containerRef}></div>;
}