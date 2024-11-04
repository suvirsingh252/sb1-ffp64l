import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const PROGRAMS = ['Energy Savings', 'Green Home', 'Solar Initiative'];
const LOCATIONS = ['North District', 'South District', 'East District', 'West District'];
const TIME_RANGES = ['All', 'Last 7 days', 'Last 30 days', 'Last 90 days'];

const ParticipantFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('search', e.target.value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value !== 'All') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search participants..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchParams.get('search') || ''}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchParams.get('program') || 'All'}
            onChange={(e) => handleFilterChange('program', e.target.value)}
          >
            <option value="All">All Programs</option>
            {PROGRAMS.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchParams.get('location') || 'All'}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="All">All Locations</option>
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchParams.get('timeRange') || 'All'}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
          >
            {TIME_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ParticipantFilters;