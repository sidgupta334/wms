import { QueryClient as ReactQueryClient } from 'react-query';

const queryClient = new ReactQueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default queryClient;
