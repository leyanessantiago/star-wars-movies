import { FC, ChangeEvent } from 'react';
import Image from "next/image";
import { RenderIf } from '@/components/base';
import './SearchInput.css'

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange, onClear }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleInputClear = () => {
    onClear();
  };

  return (
    <div className="flex items-center py-1 px-4 search-input-container">
      <Image
        src="/search-icon.svg"
        alt="Search icon"
        className="mr-3"
        width={24}
        height={24}
      />
      <input
        type="text"
        className="w-full px-4 py-2 search-input"
        placeholder="Search..."
        value={value}
        onChange={handleInputChange}
      />
      <RenderIf condition={value.length > 0}>
        <Image
          src="/clear-icon.svg"
          alt="Clear icon"
          className="ml-2 cursor-pointer"
          width={24}
          height={24}
          onClick={handleInputClear}
        />
      </RenderIf>
    </div>
  );
};
