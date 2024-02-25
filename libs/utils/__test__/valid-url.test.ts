import { isValidURL } from '@/libs/utils/valid-url';

test('should return true for a valid URL', () => {
  expect(isValidURL('https://www.example.com')).toBe(true);
  expect(isValidURL('httpS://www.example.com')).toBe(true);
});

test('should return false for an invalid URL', () => {
  expect(isValidURL('not-a-valid-url')).toBe(false);
  expect(isValidURL('htps://www.example.com')).toBe(false);
  expect(isValidURL('http://www.example.')).toBe(false);
  expect(isValidURL('http://www')).toBe(false);
});

