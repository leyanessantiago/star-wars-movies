import { renderHook, act, waitFor } from '@testing-library/react';
import { useFetchDetails } from '../use-fetch-details';
import { SearchResult } from '@/hooks/use-search';
import * as getDetailsModule from '@/libs/get-details';

jest.mock('../../libs/get-details', () => ({
  getDetails: jest.fn(),
}));

const mockSearchResults: SearchResult[] = [
  { category: 'planet', results: [{ name: 'Tatooine', films: [], url: 'https://swapi.dev/api/planets/1/'}]},
  { category: 'people', results: [{ name: 'Luke Skywalker', films: [], url: 'https://swapi.dev/api/people/1/'}] },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test('should start with correct initial state', async () => {
  const { result } = renderHook(() => useFetchDetails(mockSearchResults));

  expect(result.current.details).toBeUndefined();
  expect(result.current.isFetchingDetails).toBe(false);
  expect(result.current.fetchDetailsError).toBe('');
});

test('fetches details successfully', async () => {
  const mockDetails = { name: 'Tatooine', population: '200000'};
  jest.spyOn(getDetailsModule, 'getDetails').mockResolvedValueOnce(mockDetails);

  const { result } = renderHook(() => useFetchDetails(mockSearchResults));

  act(() => {
    result.current.fetch('category', 'url');
  });

  expect(result.current.isFetchingDetails).toBe(true);

  await waitFor(() => {
    expect(result.current.isFetchingDetails).toBe(false);
    expect(result.current.fetchDetailsError).toBe('');
    expect(result.current.details).toEqual(mockDetails);
  });
});

test('handles fetch error', async () => {
  jest.spyOn(getDetailsModule, 'getDetails').mockRejectedValue(new Error('Fetch error'));

  const { result } = renderHook(() => useFetchDetails(mockSearchResults));

  act(() => {
    result.current.fetch('category', 'url');
  });

  expect(result.current.isFetchingDetails).toBe(true);

  await waitFor(() => {
    expect(result.current.details).toBeUndefined();
    expect(result.current.isFetchingDetails).toBe(false);
    expect(result.current.fetchDetailsError).toBe('Error fetching details');
  });
});

test('resets details when searchResults becomes empty', async () => {
  const { result, rerender } = renderHook(() => useFetchDetails([]));

  const mockDetails = { name: 'Tatooine', population: '200000'};
  jest.spyOn(getDetailsModule, 'getDetails').mockResolvedValueOnce(mockDetails);

  act(() => {
    result.current.fetch('category', 'url');
  });

  await waitFor(() => {
    expect(result.current.details).toBeUndefined();
  });

});
