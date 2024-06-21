import { is } from '../src/index';
describe('isNull', () => {
  it('should return true if the value is null', () => {
    const result = is.isEmptyVal(null);
    expect(result).toBe(true);
  });

  it('should return false if the value is not null', () => {
    const result = is.isEmptyVal('some value');
    expect(result).toBe(false);
  });

});