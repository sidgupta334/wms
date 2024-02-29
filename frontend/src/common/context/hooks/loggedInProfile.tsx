import { useContext, useState } from 'react';
import { ApplicationContext } from '../ApplicationContextProvider';

export const useLoggedInProfile = () => {
  const applicationContext = useContext(ApplicationContext);
  return applicationContext.loggedInProfile;
};

export const useLoggedInProfileContext = () => {
  const [loggedInProfile, setLoggedInProfile] = useState(undefined);
  return {
    loggedInProfile,
    setLoggedInProfile,
  };
};
