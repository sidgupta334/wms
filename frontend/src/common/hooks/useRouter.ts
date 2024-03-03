import { createSearchParams, useNavigate } from 'react-router-dom';

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

  return {
    redirectToRoute,
    goBack,
    navigateWithSearchParams,
  };
};

export default useRouter;
