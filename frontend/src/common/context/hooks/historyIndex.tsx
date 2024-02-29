import { useContext, useState } from 'react';
import { ApplicationContext } from '../ApplicationContextProvider';

export const useHistoryIndex = () => {
  const applicationContext = useContext(ApplicationContext);
  return applicationContext.historyIndex;
};

export const useHistoryIndexContext = () => {
  const [historyIndex, setHistoryIndex] = useState(0);

  const resetHistoryIndex = () => {
    setHistoryIndex(0);
  };

  const incrementHistoryIndex = () => {
    setHistoryIndex(historyIndex + 1);
  };

  const decrementHistoryIndex = () => {
    setHistoryIndex(historyIndex - 1);
  };

  return {
    historyIndex,
    resetHistoryIndex,
    incrementHistoryIndex,
    decrementHistoryIndex,
  };
};
