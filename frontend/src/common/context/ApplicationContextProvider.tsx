import { createContext } from 'react';
import { useHistoryIndexContext } from './hooks/historyIndex';
import { useLoggedInProfileContext } from './hooks/loggedInProfile';

type ApplicationContextType = {
  loggedInProfile?: any;
  historyIndex?: any;
};

type ApplicationContextProviderProps = {
  children: React.ReactElement;
};

export const ApplicationContext = createContext({} as ApplicationContextType);

const ApplicationContextProvider: React.FC<ApplicationContextProviderProps> = ({
  children,
}) => {
  const loggedInProfile = useLoggedInProfileContext();
  const historyIndex = useHistoryIndexContext();

  const context = {
    loggedInProfile,
    historyIndex,
  };

  return (
    <ApplicationContext.Provider value={context}>{children}</ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
