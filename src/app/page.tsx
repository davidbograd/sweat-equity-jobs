import Link from "next/link";
import CompaniesStats from "../components/CompaniesStats";
import CompaniesGrid from "../components/CompaniesGrid";
import Header from "../components/Header";
import FAQ from "../components/FAQ";
import companies from "../data/companies.json";
import {
  generateWebsiteSchema,
  generateItemListSchema,
} from "../lib/structuredData";

// Generate structured data for the front page
function generateStructuredData() {
  const websiteSchema = generateWebsiteSchema();
  const itemListSchema = generateItemListSchema(
    companies,
    "Australian Companies Offering Equity",
    "Complete list of Australian startups offering equity compensation"
  );

  return [websiteSchema, itemListSchema];
}

export default function Home() {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative w-full pb-16">
          {/* Background gradients */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left gradient */}
            <div
              className="absolute bottom-0 left-0 w-full xl:w-1/2 h-full"
              style={{
                backgroundImage: "url(/images/gradient-left.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom",
                backgroundSize: "cover",
              }}
            />
            {/* Right gradient (flipped) - hidden until xl breakpoint */}
            <div
              className="absolute bottom-0 right-0 w-1/2 h-full hidden xl:block"
              style={{
                backgroundImage: "url(/images/gradient-left.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
                backgroundSize: "cover",
                transform: "scaleX(-1)",
              }}
            />
            {/* Linear gradient overlay */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #F8F8F8 100%)",
                height: "128px",
              }}
            />
          </div>

          <div className="relative z-10">
            <Header isHomePage={true} />
          </div>

          <main className="max-w-[1462px] mx-auto px-6 text-center relative z-10">
            <h1 className="text-3xl md:text-7xl mb-4 leading-tight">
              Find Australian startups that give equity
            </h1>

            <p className="text-xl text-black mb-8 mx-auto opacity-65">
              A curated list of Aussie startups where equity is part of your
              compensation.
            </p>

            {/* CTA Link */}
            <div className="mb-8">
              <a
                href="#companies"
                className="hover:underline hover:underline-offset-8 inline-block text-xl"
              >
                See the full list →
              </a>
            </div>

            {/* Location Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-16 max-w-2xl mx-auto">
              <Link
                href="/sydney"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Sydney companies →
              </Link>
              <Link
                href="/melbourne"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Melbourne companies →
              </Link>
              <Link
                href="/brisbane"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Brisbane companies →
              </Link>
              <Link
                href="/perth"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Perth companies →
              </Link>
              <Link
                href="/adelaide"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Adelaide companies →
              </Link>
              <Link
                href="/canberra"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Canberra companies →
              </Link>
              <Link
                href="/remote"
                className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
              >
                Remote companies →
              </Link>
            </div>

            {/* Video Section */}
            <div className="flex justify-center mb-6 md:mb-20">
              <a
                href="https://www.youtube.com/watch?v=JirNXu48Xf0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-black bg-white rounded-2xl transition-colors"
              >
                <div className="p-2">
                  <img
                    src="/images/video-thumbnail@2x.png"
                    alt="Video thumbnail"
                    className="w-16 h-10 rounded-lg"
                  />
                </div>
                <span className="pr-6">
                  <span className="md:hidden">Why get a job with equity</span>
                  <span className="hidden md:inline">
                    Why you should get a job with equity
                  </span>
                </span>
              </a>
            </div>
          </main>
        </div>
        {/* Companies Section */}
        <section
          id="companies"
          className="text-left max-w-[1462px] mx-auto mt-12 lg:mt-20 px-5"
        >
          <div className="pl-4 md:pl-6">
            <h2 className="text-4xl md:text-5xl text-black mb-4 md:mb-6">
              All companies offering equity
            </h2>

            <CompaniesStats
              companiesCount={companies.length}
              citiesCount={6}
              workArrangementsCount={3}
            />
          </div>

          <CompaniesGrid companies={companies} />
        </section>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </>
  );
}
