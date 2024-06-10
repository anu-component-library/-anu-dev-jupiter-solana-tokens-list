# Solana Tokens List (Jupiter)

The `SolanaTokensProvider` is a React context provider designed to facilitate the fetching and distribution of Solana token data across React applications. It provides convenient access to two key datasets: strict tokens and all tokens, optionally including banned tokens. Additionally, it supports automatic loading of token data when the provider mounts, based on configurable options.

Powered by Jupiter (jup.ag)'s token list.

## Features

- Fetch and distribute Solana token data using React context.
- Automatic loading of token data on provider mount (`autoLoad`).
- State management to maintain and expose fetched token data along with loading status.
- Error handling during data fetching operations with console output for debugging.
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
First, wrap your application's root component with the `SolanaTokensProvider` to ensure that all components in your app can access the token data.

Configure the optional `autoLoad` prop to automatically load specific token data on mount.

```tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { SolanaTokensProvider } from '@anu-dev/jupiter-solana-tokens-list';
import App from './App'; // Your App component

ReactDOM.render(
  <React.StrictMode>
    <SolanaTokensProvider autoLoad="all">
      <App />
    </SolanaTokensProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

If the `autoLoad` prop is not used, use the provided hook `useSolanaTokens` within any component to fetch token data:

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

Use the provided hook `useSolanaTokens` within any component to access token data:

```tsx
import React from 'react';
import { useSolanaTokens } from '@anu-dev/jupiter-solana-tokens-list';

const TokenList = () => {
  const { solTokens, solTokensLoading } = useSolanaTokens();

  if (solTokensLoading) {
    return <div>Loading tokens...</div>;
  }

  return (
          <div>
            {solTokens.map(token => (
                    <div key={token.address}>
                      {token.name} ({token.symbol})
                    </div>
            ))}
          </div>
  );
};

export default TokenList;
```
## Configuration

### autoLoad Prop

The `autoLoad` prop in the `SolanaTokensProvider` controls the automatic loading of token data when the provider mounts, facilitating immediate data availability without manual invocation. Here are the options available for the `autoLoad` prop:

- **`strict`**: Automatically fetches and loads a list of strict Solana tokens. These tokens meet stringent criteria and are typically used where strict compliance with specific attributes is necessary.

- **`all`**: Automatically fetches and loads all Solana tokens, except those marked as banned. Ideal for applications needing comprehensive visibility of available tokens without banned entries.

- **`all+banned`**: Automatically fetches and loads all Solana tokens, including those marked as banned. Useful for applications that require a complete dataset, including tokens that might be flagged for various reasons.

These options can be configured based on the specific requirements of your application, ensuring that the relevant token data is loaded and ready upon the initial render of your app's UI.


## API

The provider offers the following functions:

- `getStrictTokens()`: Fetches and returns a list of strict Solana tokens.
- `getAllTokens(includeBanned?: boolean)`: Fetches and returns a list of all Solana tokens. If `includeBanned` is true, the banned tokens will also be included in the response.
- `solTokens`: An array of Solana tokens currently loaded into the context's state.
- `solTokensLoading`: A boolean that indicates whether the tokens are currently being fetched.

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
