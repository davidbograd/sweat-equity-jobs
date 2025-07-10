"use client";

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CTAButton({
  children,
  className = "",
}: CTAButtonProps) {
  const scrollToCompanies = () => {
    const element = document.getElementById("companies");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={scrollToCompanies} className={className}>
      {children}
    </button>
  );
}
