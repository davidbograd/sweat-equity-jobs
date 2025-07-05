interface HeaderProps {
  isHomePage?: boolean;
}

export default function Header({ isHomePage = false }: HeaderProps) {
  const content = "🖤 sweat equity jobs";

  return (
    <header className="text-center pt-12 pb-8">
      {isHomePage ? (
        <div className="text-lg text-black">{content}</div>
      ) : (
        <a href="/" className="text-lg text-black hover:text-gray-800">
          {content}
        </a>
      )}
    </header>
  );
}
