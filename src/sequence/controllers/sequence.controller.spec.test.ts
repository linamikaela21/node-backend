it('should return bad request if the sequence is not an array', async () => {
  const sequence = 'not an array';
  const response: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  await controller.createSubsequence(sequence as any, response);

  expect(service.saveSequence).not.toHaveBeenCalled();
  expect(response.send).toHaveBeenCalledWith({
    message: 'Sequence should be an array',
  });
});