import { FC, useMemo, useState } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { RenderIf, SkeletonLoading } from '@/components/base';
import DetailsTable from '@/components/DetailsTable/DetailsTable';
import { BASE_URL } from '@/libs/api';
import { useFetchDetails } from '@/hooks/use-fetch-details';
import { Result, SearchResult } from '@/hooks/use-search';

interface SearchResultsProps {
  searchResults: SearchResult[];
  error: string;
  className?: string;
}

const SearchResults: FC<SearchResultsProps> = ({ searchResults, error, className }) => {
  const searchParams = useSearchParams();
  const { fetch, details, isFetchingDetails, fetchDetailsError } = useFetchDetails(searchResults || []);
  const [selectedItem, setSelectedItem ] = useState('');

  const handleItemOnClick = (category: string, url: string) => {
    setSelectedItem(url);
    fetch(category.toLowerCase(), url)
  }

  const renderResults = (results: Result[], category: string) => {
    return results.map(({ name, films, url }) => {
      const filmsNumbers = films
        .map(f => {
          const splitUrl = f.split('/');
          return splitUrl[splitUrl.length - 2];
        })
        .join(', ');

      let containerClassNames = `text-[#77b7f7] p-2 cursor-pointer bg-[#292929] border-t
                                    last:border-b border-neutral-600 hover:bg-[#141414]`

      if(selectedItem === url) {
        containerClassNames = containerClassNames.replace('bg-[#292929]', 'bg-[#141414]');
      }

      return (
        <div
          key={url}
          className={containerClassNames}
          onClick={() => {handleItemOnClick(category, url)}}
        >
          <span className="font-semibold text-md mr-1">{name}</span>
          <RenderIf condition={filmsNumbers.length > 0}>
            <span>(appears in: {filmsNumbers})</span>
          </RenderIf>
        </div>
      )
    });
  }

  const sortedResults = useMemo(() => {
    const filteredResults = searchResults.filter(({ results }) => !!results?.length);
    if (filteredResults.length > 1) {
      searchResults.sort((a, b) => b.results.length - a.results.length);
    }
    return filteredResults;
  }, [searchResults]);

  const detailsHref = useMemo(() => {
    return `${details?.url?.replace(BASE_URL, '')}?${searchParams.toString()}`;
  }, [details, searchParams]);

  return (
    <div className={`${className} flex items-start border border-neutral-600`}>
      <div className='overflow-auto w-1/3 h-[600px] border-r border-neutral-600'>
        <RenderIf condition={sortedResults.length > 0}>
          {sortedResults.map(({ category, results }) => (
            <div key={category} className="mb-6">
              <h1 className="font-bold text-xl text-white mb-3 ml-2">{category}</h1>
              {renderResults(results, category)}
            </div>
          ))}
        </RenderIf>
        <RenderIf condition={!!error}>
          <p className="text-red-400">{error}</p>
        </RenderIf>
      </div>
      <div className="p-2 w-2/3 min-h-48 flex justify-center h-[600px]">
        <RenderIf condition={!!details && !isFetchingDetails}>
          <Link target='_blank' href={detailsHref}>
            <DetailsTable data={details} className="hover:border-2" />
          </Link>
        </RenderIf>
        <RenderIf condition={isFetchingDetails}>
          <div className="flex items-center">
            <SkeletonLoading grids={4} />
          </div>
        </RenderIf>
        <RenderIf condition={!!error}>
          <div className="flex items-center">
            <p className="text-red-400">{fetchDetailsError}</p>
          </div>
        </RenderIf>
        <RenderIf condition={!details && !isFetchingDetails && !error}>
          <div className="flex items-center">
            <p className="text-whit">Select an item to see details</p>
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default SearchResults;
