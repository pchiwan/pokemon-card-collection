import Fuse, { FuseOptionKey } from "fuse.js";
import React, { useEffect, useMemo, useState } from "react";

const sortingMethod = <T>(entries: T[], key: keyof T, asc: boolean) => {
  return [...entries].sort((a, b) => {
    const aValue = a[key] ?? "";
    const bValue = b[key] ?? "";

    if (asc) {
      return aValue < bValue ? -1 : 1;
    }
    return aValue > bValue ? -1 : 1;
  });
};

const fuseOptions = {
  ignoreDiacritics: true,
  threshold: 0.2,
};

interface SortingAndFilteringParams<T> {
  entries: T[];
  initialSortingKey: keyof T;
  searchKeys: FuseOptionKey<T>[];
}

export const useSortingAndFiltering = <T>({
  initialSortingKey,
  entries,
  searchKeys,
}: SortingAndFilteringParams<T>) => {
  const [filteredValues, setFilteredValues] = useState(
    sortingMethod(entries, initialSortingKey, true)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingKey, setSortingKey] = useState<keyof T>(initialSortingKey);
  const [isSortedAscending, setIsSortedAscending] = useState(true);

  const handleSort = (key: keyof T) => {
    if (sortingKey === key) {
      setIsSortedAscending(!isSortedAscending);
    } else {
      setSortingKey(key);
      setIsSortedAscending(true);
    }
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredValues(entries);
    }

    if (searchQuery.length >= 3) {
      const fuse = new Fuse(entries, {
        ...fuseOptions,
        keys: searchKeys,
      });
      const searchResultEntries = fuse
        .search(searchQuery)
        .map((result) => result.item);
      setFilteredValues(searchResultEntries);
    }
  }, [searchQuery]);

  const sortedValues = useMemo(
    () => sortingMethod(filteredValues, sortingKey, isSortedAscending),
    [filteredValues, isSortedAscending, sortingKey]
  );

  return {
    handleSort,
    handleSearchQueryChange,
    isSortedAscending,
    searchQuery,
    sortingKey,
    values: sortedValues,
  };
};
