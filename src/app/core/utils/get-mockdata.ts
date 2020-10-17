import * as mock from './../../infrastructure/mock';

export function getMockData<T>(name: string): T {
    const data: T = mock[name];
    if (data) {
      return data;
    }
    return null;
}
