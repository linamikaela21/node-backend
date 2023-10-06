import { HaveValidToken } from './accessToken.guard';

describe('HaveValidToken', () => {
  it('should be defined', () => {
    expect(new HaveValidToken()).toBeDefined();
  });
});
