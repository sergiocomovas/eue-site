import React, { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "eue-cookie-consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100/95 backdrop-blur-sm border-t border-base-300 py-3 px-4 z-[100]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-base-content/80 text-center sm:text-left">
          Este sitio usa cookies pero en la EUE no avisamos de ello 😉{" "}
        </p>
        <button
          onClick={handleAccept}
          className="btn btn-sm btn-primary min-h-8 h-8 px-4 text-sm"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
