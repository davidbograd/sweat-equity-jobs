import { Calendar, MapPin, Briefcase } from "lucide-react";

interface CompanyCardProps {
  name: string;
  website: string;
  description: string;
  year: string;
  location: string;
  workType: string;
  logo?: string;
}

export default function CompanyCard({
  name,
  website,
  description,
  year,
  location,
  workType,
  logo,
}: CompanyCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Company Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
          {logo ? (
            <img src={logo} alt={`${name} logo`} className="w-8 h-8" />
          ) : (
            <div className="w-6 h-1 bg-orange-400 rounded-full"></div>
          )}
        </div>
        <div>
          <h3 className="text-lg text-black">{name}</h3>
          <p className="text-sm text-gray-600">{website}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Meta Information - Always at bottom */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{year}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{workType}</span>
        </div>
      </div>
    </div>
  );
}
