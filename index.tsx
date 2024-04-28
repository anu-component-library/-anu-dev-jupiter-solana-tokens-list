import React, {createContext, useContext} from 'react';

// Define the structure of the tokens now named SolanaToken based on the given API response format
interface SolanaToken {
    address: string;
    chainId: number;
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string;
    tags?: string[];  // Tags are now optional
    extensions?: Record<string, string>;  // Extensions are now optional and can have any string key and string value
}

// Create a context with the token functions now named SolanaTokensContextType
interface SolanaTokensContextType {
    getStrictTokens: () => Promise<SolanaToken[]>;
    getAllTokens: (includeBanned?: boolean) => Promise<SolanaToken[]>;
}

const SolanaTokensContext = createContext<SolanaTokensContextType | undefined>(undefined);

// Provider component
export const SolanaTokensProvider: React.FC = ({children}) => {
    // Function to fetch strict tokens
    const getStrictTokens = async () => {
        const response = await fetch('https://token.jup.ag/strict');
        const data = await response.json() as SolanaToken[];
        return data;
    };

    // Function to fetch all tokens with an optional includeBanned parameter
    const getAllTokens = async (includeBanned?: boolean) => {
        let url = 'https://token.jup.ag/all';
        if (includeBanned) {
            url += '?includeBanned=true';
        }
        const response = await fetch(url);
        const data = await response.json() as SolanaToken[];
        return data;
    };

    // Provide the context value
    const value = {
        getStrictTokens,
        getAllTokens,
    };

    return (
        <SolanaTokensContext.Provider value={value}>
            {children}
        </SolanaTokensContext.Provider>
    );
};

// Custom hook to use the SolanaTokens context
export const useSolanaTokens = (): SolanaTokensContextType => {
    const context = useContext(SolanaTokensContext);
    if (context === undefined) {
        throw new Error('useSolanaTokens must be used within a SolanaTokensProvider');
    }
    return context;
};
