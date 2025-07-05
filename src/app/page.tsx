import CompaniesStats from "../components/CompaniesStats";
import CompaniesGrid from "../components/CompaniesGrid";
import companies from "../data/companies.json";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="text-center pt-12 pb-8">
        <div className="text-lg text-black">🖤 sweat equity jobs</div>
      </header>

      {/* Hero Section */}
      <main className="max-w-[1462px] mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl mb-4 leading-tight">
          Find Australian startups that give equity
        </h1>

        <p className="text-2xl text-black mb-12 mx-auto opacity-65">
          A curated list of Aussie startups where equity is part of your
          compensation.
        </p>

        {/* CTA Link */}
        <div className="mb-16">
          <a
            href="#companies"
            className="hover:underline hover:underline-offset-8 inline-block text-2xl"
          >
            See the full list →
          </a>
        </div>

        {/* Location Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 max-w-2xl mx-auto">
          <a
            href="/sydney"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Sydney companies →
          </a>
          <a
            href="/melbourne"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Melbourne companies →
          </a>
          <a
            href="/brisbane"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Brisbane companies →
          </a>
          <a
            href="/perth"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Perth companies →
          </a>
          <a
            href="/adelaide"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Adelaide companies →
          </a>
          <a
            href="/canberra"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Canberra companies →
          </a>
          <a
            href="#"
            className="text-black hover:text-gray-800 hover:underline hover:underline-offset-4 opacity-65"
          >
            Remote companies →
          </a>
        </div>

        {/* Video Section */}
        <div className="flex justify-center mb-20">
          <a
            href="https://www.youtube.com/watch?v=JirNXu48Xf0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-black bg-[#ECECEC] rounded-2xl transition-colors"
          >
            <div className="p-2">
              <img
                src="/images/video-thumbnail@2x.png"
                alt="Video thumbnail"
                className="w-16 h-10 rounded-lg"
              />
            </div>
            <span className="pr-6">Why you should get a job with equity</span>
          </a>
        </div>

        {/* Companies Section */}
        <section id="companies" className="text-left">
          <h2 className="text-5xl text-black mb-6">
            All companies offering equity
          </h2>

          <CompaniesStats
            companiesCount={companies.length}
            citiesCount={6}
            workArrangementsCount={3}
          />

          <CompaniesGrid companies={companies} />
        </section>
      </main>
    </div>
  );
}
