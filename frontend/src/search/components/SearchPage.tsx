import { CircularProgress } from '@mui/material';
import Stack from 'common/components/material/Stack';
import Typography from 'common/components/material/Typography';
import { AppRoutesEnum } from 'common/routes/AppRoutes.enum';
import { getSearchTermFromQuery } from 'common/utils/app.utils';
import DesktopApplicationBar from 'home/components/headers/DesktopApplicationBar';
import { ProfileSearchType } from 'home/types/profile.type';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useSearchProfiles from 'search/hooks/useSearchProfiles';
import ProfileCard from './ProfileCard';

const SearchPage: React.FC = () => {
  const location = useLocation();

  const searchedTerm = useMemo(() => {
    return getSearchTermFromQuery(location.search);
  }, [location.search]);

  const { data: employees, isLoading } = useSearchProfiles(searchedTerm || '');

  if (!searchedTerm) {
    return <Navigate to={AppRoutesEnum.HOME} />;
  }

  if (isLoading) {
    return (
      <Stack mt={40} alignItems="center" justifyContent="center" width="100%">
        <CircularProgress sx={{ width: 45 }} />
      </Stack>
    );
  }

  if (!employees || employees?.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" width="100%">
        <Typography variant="h5">NO EMPLOYEE FOUND</Typography>
      </Stack>
    );
  }

  return (
    <>
      <DesktopApplicationBar />
      <Stack m={4} spacing={3}>
        <Typography variant="h5">
          Searching for: <span style={{ fontWeight: 'bolder' }}>{searchedTerm}</span>
        </Typography>
        <Stack width="100%" alignItems="center" spacing={2} pb={4}>
          {employees.map((employee: ProfileSearchType) => (
            <ProfileCard profile={employee} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default SearchPage;
