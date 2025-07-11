import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-gray-200">
      <div className="max-w-[1462px] mx-auto px-6">
        <div className="text-center text-sm text-gray-500 space-y-2">
          <div>
            <Link
              href="https://logo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 hover:underline hover:underline-offset-4"
            >
              Logos provided by Logo.dev
            </Link>
          </div>
          <div>
            Made by{" "}
            <Link
              href="https://www.linkedin.com/in/anthony-stahl-4941637a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 hover:underline hover:underline-offset-4"
            >
              Anthony Stahl
            </Link>
            and{" "}
            <Link
              href="https://www.linkedin.com/in/anthony-stahl-4941637a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 hover:underline hover:underline-offset-4"
            >
              Anthony Stahl
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
