import React from 'react';

const statsData = [
  {
    data: "1 Million+",
    label: "Jobs Annually"
  },
  {
    data: "800k+",
    label: "Properties"
  },
  {
    data: "12,000",
    label: "Cities"
  },
  {
    data: "14,000",
    label: "Contractors"
  },
];

const StatsSection = () => {
  return (
    <div className="bg-white py-12"> {/* Added background and padding for the section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Container for responsive centering */}
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-2 md:grid-cols-4 md:gap-x-8 lg:gap-x-12">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <label className="text-4xl sm:text-5xl font-bold text-green-500 mb-2"> {/* stat-data styling */}
                {stat.data}
              </label>
              <label className="text-base sm:text-lg text-gray-700 font-medium uppercase tracking-wide"> {/* stat-label styling */}
                {stat.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;