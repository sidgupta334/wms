import { useState } from 'react';
import useRouter from 'common/hooks/useRouter';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import SearchInput from 'common/components/material/input/SearchInput';

const DEFAULT_PLACEHOLDER = 'Search for Profiles';

type SearchBarProps = {
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = DEFAULT_PLACEHOLDER }) => {
  const { navigateWithSearchParams } = useRouter();
  const [searchText, setSearchText] = useState('');

  const searchKeyword = () => {
    navigateWithSearchParams(AppRoutesEnum.EXPLORE, { query: searchText });
    setSearchText('');
  };

  const clearSearchParam = () => {
    setSearchText('');
  };

  return (
    <SearchInput
      autoFocus={false}
      onChange={setSearchText}
      value={searchText}
      placeholder={placeholder}
      fullWidth={true}
      onClear={clearSearchParam}
      onSubmit={searchKeyword}
    />
  );
};

export default SearchBar;
