import { BASE_URL, searchByCategories } from '../api';
import { SEARCH_TERMS_OPTIONS } from '@/constants/search-terms';

global.fetch = jest.fn();

describe('searchByCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches data successfully and returns formatted results', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce((url) =>
      Promise.resolve({
        json: () => Promise.resolve({
          results: [
            { name: 'Test', films: ['Film URL'], url: 'Item URL' }
          ],
        })
      } as any)
    );
    jest.spyOn(global, 'fetch').mockImplementationOnce((url) =>
      Promise.resolve({
        json: () => Promise.resolve({
          results: [
            { name: 'Test2', films: ['Film URL2'], url: 'Item URL2' }
          ],
        })
      } as any)
    );

    const searchTerms = SEARCH_TERMS_OPTIONS.slice(1,3);
    const searchValue = 'test';

    const results = await searchByCategories(searchTerms, searchValue);

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/people/?search=test`);
    expect(results).toEqual([
      {
        category: 'People',
        results: [{ name: 'Test', films: ['Film URL'], url: 'Item URL' }],
      },
      {
        category: 'Planets',
        results: [{ name: 'Test2', films: ['Film URL2'], url: 'Item URL2' }],
      }
    ]);
  });

  test('handles fetch error by throwing an exception', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Fetch error'));

    const searchTerms = SEARCH_TERMS_OPTIONS.slice(1,2);
    const searchValue = 'test';

    await expect(searchByCategories(searchTerms, searchValue))
      .rejects.toThrow('Error fetching data');
  });

  test('filters out categories with no results', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [] }),
      } as any)
    );

    const searchTerms = SEARCH_TERMS_OPTIONS.slice(1);
    const searchValue = 'test';

    const results = await searchByCategories(searchTerms, searchValue);

    expect(results.length).toBe(0);
  });
});
