"use client";
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { RenderIf, SkeletonLoading } from '@/components/base';
import SearchForm from '../SearchForm/SearchForm';
import { useSearch } from '@/hooks/use-search';
import SearchResults from '@/components/SearchResult/SearchResult';

const SearchView: FC = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') || '';
  const searchTerm = searchParams.get('term') || '*';
  const { results, isFetching, error, clear } = useSearch(searchValue, searchTerm);

  return (
    <>
      <SearchForm onClear={clear} />
      <RenderIf condition={!!searchValue && results.length > 0}>
        <SearchResults
          className="mt-16 w-80 md:w-4/5 lg:w-3/5"
          searchResults={results}
          error={error}
        />
      </RenderIf>
      <RenderIf condition={isFetching}>
        <div className="mt-20">
          <SkeletonLoading grids={6} />
        </div>
      </RenderIf>
      <RenderIf condition={!!searchValue && results.length === 0 && !isFetching}>
        <div className="mt-20">
          <p className="text-white text-center">No results found</p>
        </div>
      </RenderIf>
    </>
  );
};

export default SearchView;
