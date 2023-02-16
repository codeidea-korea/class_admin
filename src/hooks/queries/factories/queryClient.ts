import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
		queries: {
			retry: import.meta.env.VITE_DEBUG !== 'true',
			useErrorBoundary: true,
			onError: error => null,
		},
    },
});
