export type SearchTerm = {  label: string; value: string; }

export const SEARCH_TERMS_OPTIONS: SearchTerm[] = [
  { label: 'All', value: '*' },
  { label: 'People', value: 'people' },
  { label: 'Planets', value: 'planets' },
  { label: 'Starships', value: 'starships' },
  { label: 'Vehicles', value: 'vehicles' },
]
