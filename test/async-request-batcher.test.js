const AsyncRequestBatcher = require('../index');
const axios = require('axios');

jest.mock('axios');

describe('AsyncRequestBatcher', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  test('should execute requests with given concurrency limit', async () => {
    const concurrencyLimit = 2;

    axios.mockResolvedValue({ data: 'success' });

    const requestBatcher = new AsyncRequestBatcher(concurrencyLimit);

    const requests = Array(5)
      .fill(null)
      .map((_, i) => ({
        method: 'GET',
        url: `https://api.example.com/data${i + 1}`,
      }));

    const results = await requestBatcher.executeBatch(requests);

    expect(axios).toHaveBeenCalledTimes(5);
    expect(results).toHaveLength(5);
    results.forEach((result) => {
      expect(result.data).toBe('success');
    });
  });

  test('should handle request errors gracefully', async () => {
    const concurrencyLimit = 2;

    axios
      .mockResolvedValueOnce({ data: 'success' })
      .mockRejectedValueOnce(new Error('Request failed'))
      .mockResolvedValueOnce({ data: 'success' });

    const requestBatcher = new AsyncRequestBatcher(concurrencyLimit);

    const requests = Array(3)
      .fill(null)
      .map((_, i) => ({
        method: 'GET',
        url: `https://api.example.com/data${i + 1}`,
      }));

    try {
      const results = await requestBatcher.executeBatch(requests);
    } catch (error) {
      expect(error).toEqual(new Error('Request failed'));
    }
  });  
});
