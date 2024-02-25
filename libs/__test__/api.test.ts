import { BASE_URL, searchByCategories, getNeedPollingData } from '../api';
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

describe('getNeedPollingData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches data successfully from multiple URLs and returns concatenated names', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) =>
      Promise.resolve({
        json: () => Promise.resolve((url as string).includes('name') ? { name: 'Test Name' } : { title: 'Test Title' }),
      } as any)
    );

    const urls = ['http://test.com/name', 'http://test.com/title'];
    const expectedResult = 'Test Name, Test Title';

    const result = await getNeedPollingData(urls);

    expect(result).toBe(expectedResult);
  });

  test('returns only successfully fetched names when some requests fail', async () => {
    jest.spyOn(global, 'fetch').mockImplementation((url) =>
      (url as string).includes('fail')
        ? Promise.reject(new Error('Fetch failed'))
        : Promise.resolve({
            json: () => Promise.resolve({ title: 'Successful Title' }),
          } as any)
    );

    const urls = ['http://test.com/fail', 'http://test.com/success'];
    const expectedResult = 'Successful Title';

    const result = await getNeedPollingData(urls);

    expect(result).toBe(expectedResult);
  });

  test('throws an error when all fetch requests fail', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Fetch failed'));

    const urls = ['http://test.com/fail1', 'http://test.com/fail2'];

    await expect(getNeedPollingData(urls)).rejects.toThrow('Failed to fetch films details');
  });
});
