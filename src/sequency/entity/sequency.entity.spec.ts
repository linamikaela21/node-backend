import { Sequency } from './sequency.entity';

describe('Sequency', () => {
  let sequency: Sequency;

  beforeEach(() => {
    sequency = new Sequency();
  });

  it('should create a new Sequency instance', () => {
    expect(sequency).toBeTruthy();
  });

  it('should have an empty subSequences array by default', () => {
    expect(sequency.subSequences).toEqual([]);
  });

  it('should have a createdAt property that is a string', () => {
    expect(sequency.createdAt).toEqual(expect.any(String));
  });
});
