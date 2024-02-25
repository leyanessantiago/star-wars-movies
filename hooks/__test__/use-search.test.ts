import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearch, SearchResult } from '@/hooks/use-search';
import * as apiModule from '@/libs/api';

jest.mock('../../libs/api', () => ({
  searchByCategories: jest.fn(),
}));

const mockResults: SearchResult[] = [
  { category: 'planet', results: [{ name: 'Tatooine', films: [], url: 'https://swapi.dev/api/planets/1/'}]},
  { category: 'people', results: [{ name: 'Luke Skywalker', films: [], url: 'https://swapi.dev/api/people/1/'}] },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test('should start with correct initial state', async () => {
  const { result } = renderHook(() => useSearch());

  expect(result.current.results).toEqual([]);
  expect(result.current.isFetching).toBe(false);
  expect(result.current.error).toBe('');
  expect(result.current.searchValue).toBe('');
});

test('performs a search and updates state with results', async () => {
  jest.spyOn(apiModule, 'searchByCategories').mockResolvedValueOnce(mockResults);

  const { result } = renderHook(() => useSearch('test', '*'));

  expect(result.current.isFetching).toBe(true);

  await waitFor(() => {
    expect(result.current.results).toEqual(mockResults);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBe('');
  });
});

test('handles search error', async () => {
  jest.spyOn(apiModule, 'searchByCategories').mockRejectedValue(new Error('Fetch error'));

  const { result } = renderHook(() => useSearch('test', '*'));

  // Initial state before update
  expect(result.current.isFetching).toBe(true);

  await waitFor(() => {
    expect(result.current.results).toEqual([]);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBe('Error fetching data');
  });
});

test('clears results', async () => {
  jest.spyOn(apiModule, 'searchByCategories').mockResolvedValueOnce(mockResults);

  const { result } = renderHook(() => useSearch('test', '*'));

  await waitFor(() => {
    expect(result.current.results).toEqual(mockResults);
  });

  act(() => {
    result.current.clear();
  });

  expect(result.current.results).toEqual([]);
});

test('does not perform search with empty searchValue', async () => {
  const { result } = renderHook(() => useSearch('', '*'));

  expect(apiModule.searchByCategories).not.toHaveBeenCalled();
  expect(result.current.isFetching).toBe(false);
  expect(result.current.results).toEqual([]);
});
