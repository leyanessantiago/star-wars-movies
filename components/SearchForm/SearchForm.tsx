"use client"
import { FC, useState, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchInput, RadioButtonGroup } from '@/components/base';
import { SEARCH_TERMS_OPTIONS } from '@/constants/search-terms';
import { buildQueryParams } from '@/libs/utils/build-query-params';

interface SearchFormProps {
  onClear?: () => void;
}

const SearchForm: FC<SearchFormProps> = ({ onClear }) => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('term') || '*');
  const router = useRouter()

  const handleOnSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = buildQueryParams({ search: searchValue, term: searchTerm });
    router.push(`/?${queryParams}`);
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (searchValue) {
      const queryParams = buildQueryParams({ search: searchValue, term: value });
      router.push(`/?${queryParams}`);
    }
  }

  const onInputClear = () => {
    setSearchValue('');
    if (onClear) {
      router.push(`/`);
      onClear();
    }
  }

  return (
    <form className="w-80 md:w-3/4 lg:w-1/2 flex flex-col items-center" onSubmit={handleOnSubmit}>
      <SearchInput value={searchValue} onChange={setSearchValue} onClear={onInputClear} />
      <div className="w-full px-4 lg:px-10 mt-4">
        <RadioButtonGroup
          value={searchTerm}
          onChange={handleSearchTermChange}
          name="search-terms"
          options={SEARCH_TERMS_OPTIONS}
        />
      </div>
    </form>
  );
};

export default SearchForm;
