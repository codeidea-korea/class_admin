import { AxiosResponse } from 'axios';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { MutationFunction } from 'react-query/types/core/types';
import { UseMutationOptions } from 'react-query/types/react/types';

import useAxios from '@/hooks/useAxios';
import AppQueryInterface from '@/interfaces/appQueryInterface';
import { HttpInterface } from '@/interfaces/httpInterface';

const appQuery = <TQueryFnData, TError = unknown, TData = TQueryFnData>(
    majorKey: string,
    apiUrl: string,
    {
      isQuery,
      queryKey = 'temp-key',
      options,
    }: Pick<AppQueryInterface, 'isQuery' | 'queryKey' | 'options'>): UseQueryOptions<TQueryFnData, TError, TData> => {

    const api = useAxios();
    const data: UseQueryOptions<TQueryFnData, TError, TData> = {
      queryKey: [majorKey, queryKey],
      queryFn: <TQueryFnData>() => api.get(apiUrl),
      select: (res: TQueryFnData): TData => (res as unknown as AxiosResponse)?.data,
    };

    if (isQuery) return { ...data, staleTime: Infinity, ...options } as UseQueryOptions<TQueryFnData, TError, TData>;
    else return { ...data, options: options } as UseQueryOptions<TQueryFnData, TError, TData>;
};

const appMutation = <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>
(majorKey: string,
	mutationFn: MutationFunction<TData, TVariables>,
	mutationKey = 'temp-key',
	options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>) =>
		useMutation([majorKey, mutationKey], mutationFn, { ...options });

const useHttp = <TQueryFnData, TError = unknown, TData = TQueryFnData>(majorKey: string, options: UseQueryOptions<TQueryFnData, TError, TData>): HttpInterface => {

    const { onError } = options;

    return {
      majorKey,
      query: (apiUrl: string, queryOptions: Pick<AppQueryInterface, 'isQuery' | 'queryKey' | 'options'>) =>
        appQuery(majorKey, apiUrl, queryOptions),
      get: (apiUrl: string, queryKey: string = 'temp-key') => {
        const queryOptions = appQuery<TQueryFnData, TError, TData>(majorKey, apiUrl, {
          isQuery: false,
          queryKey,
          options: {},
        });

        return useQuery<TQueryFnData, TError, TData>(
          {
            ...options,
            ...queryOptions,
            queryKey: [majorKey, queryKey],
            useErrorBoundary: !onError,
          });
      },
      mutation: <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
        mutationKey = 'temp-key',
        mutationFn: MutationFunction<TData, TVariables>,
        options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationKey' | 'mutationFn'>) =>
        appMutation<TData, TError, TVariables, TContext>(majorKey, mutationFn, mutationKey, { ...options }),
    } as unknown as HttpInterface;
};

export default useHttp;
export { appQuery };
