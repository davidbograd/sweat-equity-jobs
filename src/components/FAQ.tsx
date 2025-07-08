"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Why is getting ownership important?",
    answer:
      "Ownership through equity compensation allows you to share in the company's success. As the startup grows and increases in value, your equity becomes more valuable too. This can lead to significant financial rewards if the company is acquired or goes public. It also aligns your interests with the company's goals, making you more invested in its success.",
  },
  {
    question: "What is ESOP?",
    answer:
      "ESOP stands for Employee Stock Ownership Plan. It's a program that gives employees ownership interest in the company through shares or stock options. In startups, ESOPs typically grant options that vest over time, allowing employees to purchase company shares at a predetermined price. This helps startups attract talent by offering potential upside beyond just salary.",
  },
  {
    question: "How much equity should I expect?",
    answer:
      "Equity amounts vary significantly based on your role, experience, and when you join. Early employees (first 10-20) might receive 0.5-5% equity, while later employees typically get 0.01-1%. Senior roles like CTOs or VPs often receive 1-10%. The stage of the company matters too - earlier stage means higher equity but more risk.",
  },
  {
    question: "When do I receive my equity?",
    answer:
      "Equity typically vests over time, commonly over 4 years with a 1-year cliff. This means you don't own any equity for the first year, then 25% vests after year one, followed by monthly or quarterly vesting for the remaining 75%. Some companies also have acceleration clauses for events like acquisition or termination.",
  },
  {
    question: "What happens to my equity if I leave the company?",
    answer:
      "When you leave, you typically keep the equity that has already vested, but you'll need to exercise your options within a certain timeframe (often 90 days). Unvested equity is usually forfeited. Some companies offer extended exercise periods or early exercise options. Always check your specific agreement and consider tax implications.",
  },
  {
    question: "What is sweat equity?",
    answer:
      "Sweat equity refers to the ownership stake you earn through your hard work, dedication, and contributions to the company rather than through financial investment. It's the equity you 'sweat' for by putting in long hours, building the product, and helping the company grow. This is especially common in startups where employees take below-market salaries in exchange for equity that could become valuable as the company succeeds.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="text-left max-w-[1462px] mx-auto mt-16 lg:mt-24 px-5 pb-16">
      <div className="pl-4 md:pl-6">
        <h2 className="text-4xl md:text-5xl text-black mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg md:text-xl font-medium text-black pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openItems.includes(index) ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
