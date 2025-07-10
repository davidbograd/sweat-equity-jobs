"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-satoshi">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Error
            </h2>
            <p className="text-gray-600 mb-6">
              A critical error occurred. Please try refreshing the page.
            </p>
            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reload application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
