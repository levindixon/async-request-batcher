const axios = require('axios');

class AsyncRequestBatcher {
  constructor(concurrencyLimit) {
    this.concurrencyLimit = concurrencyLimit || 5;
    this.queue = [];
    this.activeRequests = 0;
  }

  async executeBatch(requests) {
    this.queue.push(...requests);

    const results = await Promise.all(
      requests.map(async () => {
        while (this.queue.length > 0) {
          if (this.activeRequests < this.concurrencyLimit) {
            const request = this.queue.shift();
            this.activeRequests++;
            const result = await axios(request);
            this.activeRequests--;
            return result;
          }
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      })
    );

    return results.filter((result) => result !== undefined);
  }
}

module.exports = AsyncRequestBatcher;
