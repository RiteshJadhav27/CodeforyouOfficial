// FirebaseErrorNotification.tsx
import React, { useEffect, useState } from "react";

type FirebaseError = {
  code?: string;
  message: string;
};

const userFriendlyMessages: Record<string, string> = {
  "permission-denied": "You do not have permission to access this data.",
  unavailable: "Service is temporarily unavailable. Please try again later.",
  // Add more Firebase error codes and messages as needed
};

const FirebaseErrorNotification: React.FC = () => {
  const [error, setError] = useState<FirebaseError | null>(null);

  // Example: Listening for Firebase errors via window event or a custom event emitter
  useEffect(() => {
    const handleFirebaseError = (event: CustomEvent<FirebaseError>) => {
      setError(event.detail);
      // Auto-hide error after 5 seconds
      setTimeout(() => setError(null), 5000);
    };

    window.addEventListener(
      "firebase-error",
      handleFirebaseError as EventListener
    );
    return () =>
      window.removeEventListener(
        "firebase-error",
        handleFirebaseError as EventListener
      );
  }, []);

  if (!error) return null;

  const msg = userFriendlyMessages[error.code || ""] || error.message;

  return (
    <div className="fixed top-5 right-5 bg-red-600 text-white px-5 py-3 rounded shadow-lg max-w-xs font-semibold z-50 animate-fadeIn">
      {msg}
    </div>
  );
};

export default FirebaseErrorNotification;
