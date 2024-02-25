"use client"
import { useState, useEffect } from 'react';
import { getDetails } from '@/libs/get-details';
import { SearchResult } from '@/hooks/use-search';

interface UseFetchDetails {
  fetch: (category: string, url: string) => void;
  details: any;
  isFetchingDetails: boolean;
  fetchDetailsError: string;
}

export const useFetchDetails = (searchResults: SearchResult[]): UseFetchDetails  => {
  const [details, setDetails] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const fetch = async (category: string, url: string) => {
    setError('');
    setIsFetching(true);
    try {
      const data = await getDetails(category, url);
      setDetails(data);
    } catch (error) {
      console.log('error', error);
      setError('Error fetching details');
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (searchResults.length === 0) {
      setDetails(undefined);
    }
  }, [searchResults]);

  return { fetch, details, isFetchingDetails: isFetching, fetchDetailsError: error };
}
