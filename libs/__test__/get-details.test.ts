import { findNeedPollingData } from '@/libs/get-details';
import { url } from 'inspector';

describe('findNeedPollingData', () => {
  it('should return an array of data that needs polling', () => {
    const data = {
      name: 'Luke Skywalker',
      films: ['https://swapi.dev/api/films/1/'],
      url: 'https://swapi.dev/api/people/1/'
    };
    const category = 'people';

    const result = findNeedPollingData(data, category);

    expect(result).toEqual({films: ["https://swapi.dev/api/films/1/"]});
  });

  it('should return an empty object if no data needs polling', () => {
    const data = {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
      mass: 84
    };
    const category = 'people';

    const result = findNeedPollingData(data, category);

    expect(result).toEqual({});
  });

  it('should return an empty array if data is empty', () => {
    const data = {};
    const category = 'movies';

    const result = findNeedPollingData(data, category);

    expect(result).toEqual({});
  });
});
