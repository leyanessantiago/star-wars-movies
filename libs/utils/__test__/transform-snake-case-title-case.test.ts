import { transformSnakeCaseToTitleCase } from '../transform-snake-case-title-case';


test('should transform snake case to title case', () => {
  const input = 'hello_world';
  const expectedOutput = 'Hello World';

  const result = transformSnakeCaseToTitleCase(input);

  expect(result).toEqual(expectedOutput);
});

test('should handle empty input', () => {
  const input = '';
  const expectedOutput = '';

  const result = transformSnakeCaseToTitleCase(input);

  expect(result).toEqual(expectedOutput);
});

test('should handle single word input', () => {
  const input = 'hello';
  const expectedOutput = 'Hello';

  const result = transformSnakeCaseToTitleCase(input);

  expect(result).toEqual(expectedOutput);
});
