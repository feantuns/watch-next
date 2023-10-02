import { QueryClient, QueryFunction } from "react-query";

const defaultQueryFn: QueryFunction = async ({ queryKey }) =>
  fetch(`${import.meta.env.VITE_APP_BASE_URL}${queryKey[0]}`).then(res =>
    res.json()
  );

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      queryFn: defaultQueryFn,
    },
  },
});
