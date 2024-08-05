import { useState } from "react";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import CountryModal from "../components/CountryModal";
import useCountries from "../hooks/useCountries";
import { Country } from "../models/country";
import { SortDirection } from "../models/filter";

const CountryPage = () => {
  const {
    countries,
    search,
    loading,
    page,
    sortDirection,
    setSearch,
    setPage,
    setSortDirection,
    totalPages,
  } = useCountries();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) setPage(newPage);
  };

  const handleSortAsc = () => {
    setSortDirection(SortDirection.ASC);
  };

  const handleSortDesc = () => {
    setSortDirection(SortDirection.DESC);
  };

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const resetSearchAndSort = () => {
    setSearch("");
    setSortDirection(SortDirection.ASC);
  };

  return (
    <div className="w-screen h-screen bg-main-normal flex flex-col">
      <div className="w-full p-4 flex flex-col items-center bg-main-light shadow-md">
        <h1 className="text-3xl font-bold mb-4">Countries Catalog</h1>
        <SearchBar value={search} onChange={handleSearch} />
        <div className="flex flex-wrap justify-between items-center mt-2 space-x-4">
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={resetSearchAndSort}
              className="px-4 py-2 border rounded bg-blue-800 text-white"
            >
              Reset
            </button>
            <button
              onClick={handleSortAsc}
              className={`px-4 py-2 border rounded ${
                sortDirection === SortDirection.ASC
                  ? "bg-blue-800 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Sort Ascending
            </button>
            <button
              onClick={handleSortDesc}
              className={`px-4 py-2 border rounded ${
                sortDirection === SortDirection.DESC
                  ? "bg-blue-800 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Sort Descending
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-blue-800 text-white rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="self-center">Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-blue-800 text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="w-full text-center text-gray-600">Loading...</div>
          ) : (
            countries?.map((country: Country) => (
              <CountryCard
                country={country}
                key={country.name.common}
                onClick={() => setSelectedCountry(country)}
              />
            ))
          )}
        </div>
      </div>
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};

export default CountryPage;
