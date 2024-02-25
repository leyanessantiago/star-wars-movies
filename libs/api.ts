import { SearchTerm } from '@/constants/search-terms';

export const BASE_URL = 'https://swapi.dev/api'

export async function searchByCategories(searchTerms: SearchTerm[], searchValue: string) {
  const allResults = await Promise.allSettled(
    searchTerms.map(async ({ value, label }) => {
      const response = await fetch(`${BASE_URL}/${value}/?search=${searchValue}`);
      return {
        category: label,
        response
      };
    })
  );

  if (allResults.every(r => r.status === 'rejected')) {
    throw new Error('Error fetching data');
  }

  const fulfilledResponses = allResults.filter(r => r.status === 'fulfilled');
  const data = await Promise.all(fulfilledResponses.map(async (r: any) => {
    const json = await r.value.response.json();
    return {
      category: r.value.category,
      results: json.results.map((r: any) => ({ name: r.name, films: r.films, url: r.url}))
    };
  }));

  return data.filter(d => d.results.length > 0);
}

export async function fetchDetails(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch details`)
  }

  return res.json()
}

export async function getNeedPollingData(urls: string[]) {
  const allResults = await Promise.allSettled(urls.map(url => fetch(url.replace('http:', 'https:'))));

  if (allResults.every(r => r.status === 'rejected')) {
    throw new Error('Failed to fetch films details');
  }

  const fulfilledResponses = allResults.filter(r => r.status === 'fulfilled');
  const names = await Promise.all(fulfilledResponses.map(async (r: any) => {
    const json = await r.value.json();
    return json?.name || json?.title;
  }));

  return names.join(', ');
}
