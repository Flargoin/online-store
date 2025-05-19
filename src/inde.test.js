import { sum } from './index';

describe('test index', () => {
  it('sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
