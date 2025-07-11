import Link from "next/link";

interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage = false }: HeaderProps) {
  const content = "🖤 sweat equity jobs";

  return (
    <header className="text-center pt-8 md:pt-12 pb-6 md:pb-8">
      {isHomePage ? (
        <div className="text-lg text-black">{content}</div>
      ) : (
        <Link href="/" className="text-lg text-black hover:text-gray-800">
          {content}
        </Link>
      )}
    </header>
  );
}
