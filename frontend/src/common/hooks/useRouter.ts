import { createSearchParams, useNavigate } from 'react-router-dom';

const DYNAMIC_PATH_PARAM = {
  EXTERNAL_ID: ':externalId',
};

const useRouter = () => {
  const navigate = useNavigate();

  const redirectToRoute = (route: string, state = {}, e?: React.BaseSyntheticEvent) => {
    e && e.stopPropagation();
    navigate(route, { state });
  };

  const goBack = () => {
    navigate(-1);
  };

  const navigateWithSearchParams = (route: string, searchParams: any) => {
    navigate({
      pathname: route,
      search: `?${createSearchParams(searchParams)}`,
    });
  };

  const redirectToEmployee = (
    route: string,
    externalId = '',
    state = {},
    e?: React.BaseSyntheticEvent,
  ) => {
    e && e.stopPropagation();
    const profileRoute = route.replace(DYNAMIC_PATH_PARAM.EXTERNAL_ID, externalId);
    navigate(profileRoute, { state });
  };

  return {
    redirectToRoute,
    goBack,
    navigateWithSearchParams,
    redirectToEmployee,
  };
};

export default useRouter;
