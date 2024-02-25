import { buildQueryParams } from '../build-query-params';

test('buildQueryParams should return an empty string when given an empty object', () => {
  const queryParams = buildQueryParams({});
  expect(queryParams).toBe('');
});

test('buildQueryParams should return a query string with a single key-value pair', () => {
  const queryParams = buildQueryParams({ key: 'value' });
  expect(queryParams).toBe('key=value');
});

test('buildQueryParams should return a query string with multiple key-value pairs', () => {
  const queryParams = buildQueryParams({ key1: 'value1', key2: 'value2', key3: 'value3' });
  expect(queryParams).toBe('key1=value1&key2=value2&key3=value3');
});
