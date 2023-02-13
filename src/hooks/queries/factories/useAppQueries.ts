import { useQueries } from 'react-query';
import { QueriesOptions, QueriesResults } from 'react-query/types/react/useQueries';

const useAppQueries = <TData>(queries: [...QueriesOptions<TData[]>]): QueriesResults<TData[]> => {
    return useQueries<TData[]>(queries);
};

export default useAppQueries;
