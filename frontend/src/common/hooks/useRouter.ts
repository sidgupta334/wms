import { useNavigate } from 'react-router-dom';

const useRouter = () => {
  const navigate = useNavigate();

  const redirectToRoute = (route: string, state = {}, e?: React.BaseSyntheticEvent) => {
    e && e.stopPropagation();
    navigate(route, { state });
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    redirectToRoute,
    goBack,
  };
};

export default useRouter;
