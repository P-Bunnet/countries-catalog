import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Country } from "../models/country";
import { SortDirection } from "../models/filter";

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(25);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const [totalPages, setTotalPages] = useState(0);

  const fetchCountries = () => {
    setLoading(true);
    axiosInstance
      .get(`/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
        setTotalPages(Math.ceil(response.data.length / limit));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const normalizeText = (text: string) => {
    return text.toLowerCase().replace(/ /g, "");
  };

  const fuzzySearch = (items: Country[], query: string) => {
    const normalizedQuery = normalizeText(query);
    return items.filter((item) => {
      const commonName = normalizeText(item.name.common);
      const officialName = normalizeText(item.name.official);
      const nativeNames = item.name.nativeName
        ? Object.values(item.name.nativeName).map((name) =>
            normalizeText(name.official)
          )
        : [];
      const altSpellings = item.altSpellings.map((name) => normalizeText(name));
      return (
        commonName.includes(normalizedQuery) ||
        officialName.includes(normalizedQuery) ||
        nativeNames.some((nativeName) =>
          nativeName.includes(normalizedQuery)
        ) ||
        altSpellings.some((altSpelling) =>
          altSpelling.includes(normalizedQuery)
        )
      );
    });
  };

  const filterCountries = () => {
    let filtered = [...countries];

    if (search) {
      filtered = fuzzySearch(filtered, search);
    }

    // Sort
    if (sortDirection === SortDirection.ASC) {
      filtered = filtered.sort((a, b) =>
        a.name.official.localeCompare(b.name.official)
      );
    } else {
      filtered = filtered.sort((a, b) =>
        b.name.official.localeCompare(a.name.official)
      );
    }

    setTotalPages(Math.ceil(filtered.length / limit));
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedCountries = filtered.slice(startIndex, startIndex + limit);

    setFilteredCountries(paginatedCountries);
  };

  useEffect(() => {
    filterCountries();
  }, [countries, search, sortDirection, page, limit]);

  return {
    countries: filteredCountries,
    loading,
    page,
    search,
    limit,
    sortDirection,
    totalPages,
    setPage,
    setSearch,
    setLimit,
    setSortDirection,
  };
};

export default useCountries;
