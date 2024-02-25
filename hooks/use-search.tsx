"use client"
import { useEffect, useState } from 'react';
import { searchByCategories } from '@/libs/api';
import { SEARCH_TERMS_OPTIONS } from '@/constants/search-terms';

export interface Result {
  name: string;
  films: string[];
  url: string;
}

export interface SearchResult {
  category: string;
  results: Result[];
}

interface UseSearch {
  results: SearchResult[];
  isFetching: boolean;
  error: string;
  clear: () => void;
  searchValue: string;
}

const searchTerms = SEARCH_TERMS_OPTIONS.slice(1);

export const useSearch = (searchValue = '', searchTerm = '*'): UseSearch  => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    setError('');
    setResults([]);
    if (!searchValue) {
      return;
    }

    setIsFetching(true);
    try {
      const filteredSearchTerms = searchTerms.filter(({ value }) => searchTerm === '*' || value === searchTerm);
      const data = await searchByCategories(filteredSearchTerms, searchValue);
      setResults(data);
    } catch (error) {
      console.log('error', error);
      setError('Error fetching data');
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    search();
  }, [searchValue, searchTerm]);

  const clear = () => {
    setResults([]);
  }

  return { results, isFetching, error, clear, searchValue };
}
