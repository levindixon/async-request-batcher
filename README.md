# Async Request Batcher

A utility to efficiently batch and execute multiple HTTP requests asynchronously with a specified concurrency limit. It helps manage and control the rate at which HTTP requests are sent, preventing overloading servers or exceeding API rate limits.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package using npm:

```bash
npm install async-request-batcher
```

## Usage

To use the "async-request-batcher" package, first import the `AsyncRequestBatcher` class and create a new instance with the desired concurrency limit:

```javascript
const AsyncRequestBatcher = require('async-request-batcher');

const requestBatcher = new AsyncRequestBatcher(3); // Set concurrency limit to 3
```

Next, create an array of request objects that you would like to batch and execute:

```javascript
const requests = [
  { method: 'GET', url: 'https://api.example.com/data1' },
  { method: 'GET', url: 'https://api.example.com/data2' },
  { method: 'GET', url: 'https://api.example.com/data3' },
  { method: 'GET', url: 'https://api.example.com/data4' },
  { method: 'GET', url: 'https://api.example.com/data5' },
];
```

Finally, call the executeBatch method and await the results:

```javascript
(async () => {
  const results = await requestBatcher.executeBatch(requests);
  console.log(results);
})();
```

## Tests

This package uses Jest for testing. Run the tests with the following command:

```bash
npm test
```

## Performance

The "async-request-batcher" package efficiently manages request execution, ensuring that no more than the specified number of concurrent requests are active at any given time. This helps prevent server overloads and API rate limit issues while maintaining high performance.

## Contributing

Contributions to the "async-request-batcher" package are welcome. If you have ideas for improvements or bug fixes, please feel free to open an issue or submit a pull request on the project's GitHub repository.

## License

MIT