import { Sequence } from './sequence.entity';

describe('Sequence Entity', () => {
  let sequence: Sequence;

  beforeEach(() => {
    sequence = new Sequence();
  });

  it('should create a new Sequence instance', () => {
    expect(sequence).toBeTruthy();
  });

  it('should have a createdAt property that is a string', () => {
    expect(sequence.createdAt).toEqual(expect.any(String));
  });
});
