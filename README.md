# Solana Tokens List (Jupiter)

The `SolanaTokensProvider` is a React context provider designed to facilitate the fetching and distribution of Solana token data across React applications. It provides convenient access to two key datasets: strict tokens and all tokens, optionally including banned tokens.

Powered by Jupiter (jup.ag)'s token list.

## Features

- Fetch and distribute Solana token data using React context.
- Easy to use API with support for optional query parameters.
- Lightweight implementation using native Fetch API.

## Installation

Install the package using npm:

```bash
npm install @anu-dev/jupiter-solana-tokens-list
```

Or using yarn:
```bash
yarn add @anu-dev/jupiter-solana-tokens-list
```

## Usage
First, wrap your application's root component with the `SolanaTokensProvider` to ensure that all components in your app can access the token data:

```tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { SolanaTokensProvider } from '@anu-dev/jupiter-solana-tokens-list';
import App from './App'; // Your App component

ReactDOM.render(
  <React.StrictMode>
    <SolanaTokensProvider>
      <App />
    </SolanaTokensProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Then, use the provided hook `useSolanaTokens` within any component to fetch token data:

```tsx
import React, { useEffect } from 'react';
import { useSolanaTokens } from '@anu-dev/jupiter-solana-tokens-list';

const TokenList = () => {
  const { getAllTokens, getStrictTokens } = useSolanaTokens();

  useEffect(() => {
    getAllTokens().then(tokens => console.log(tokens));
    getStrictTokens().then(tokens => console.log(tokens));
  }, []);

  return <div>Check console for token details!</div>;
};

export default TokenList;
```

## API

The provider offers the following functions:

- `getStrictTokens()`: Fetches and returns a list of strict Solana tokens.
- `getAllTokens(includeBanned?: boolean)`: Fetches and returns a list of all Solana tokens. If `includeBanned` is true, the banned tokens will also be included in the response.

### Types

- `SolanaToken`: Describes the structure of a Solana token object.
    - `address`: string
    - `chainId`: number
    - `decimals`: number
    - `name`: string
    - `symbol`: string
    - `logoURI`: string
    - `tags?`: string[]
    - `extensions?`: Record<string, string>

## Contributing

Contributions to the `@anu-dev/jupiter-solana-tokens-list` are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for each feature or improvement.
3. Submit a pull request with comprehensive description of changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
