import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-sm text-gray-500">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8">
            {/* 1. Made by (left on desktop) */}
            <div className="text-left">
              Made by{" "}
              <Link
                href="https://www.linkedin.com/in/anthony-stahl-4941637a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:underline hover:underline-offset-4"
              >
                Anthony Stahl{" "}
              </Link>
              and{" "}
              <Link
                href="https://x.com/DavidBograd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:underline hover:underline-offset-4"
              >
                David Bograd
              </Link>
            </div>

            {/* 2. Disclaimer (center on desktop) */}
            <div className="text-left md:text-center">
              We try to keep all data accurate, but startups move quick. If
              anything&apos;s wrong, please let us know.
            </div>

            {/* 3. Logos (right on desktop) */}
            <div className="text-left md:text-right">
              <Link
                href="https://logo.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 hover:underline hover:underline-offset-4"
              >
                Logos provided by Logo.dev
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
