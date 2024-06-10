import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';

export interface SolanaTokensProviderProps {
    children: ReactNode;
    autoLoad?: 'strict' | 'all' | 'all+banned';  // Updated to include 'all+banned'
}

export interface SolanaToken {
    address: string;
    chainId: number;
    decimals: number;
    name: string;
    symbol: string;
    logoURI: string;
    tags?: string[];
    extensions?: Record<string, string>;
}

interface SolanaTokensContextType {
    getStrictTokens: () => Promise<SolanaToken[]>;
    getAllTokens: (includeBanned?: boolean) => Promise<SolanaToken[]>;
    solTokens: SolanaToken[]; // Exposing the tokens
}

const SolanaTokensContext = createContext<SolanaTokensContextType | undefined>(undefined);

export const SolanaTokensProvider: React.FC<SolanaTokensProviderProps> = ({ children, autoLoad }) => {
    const [solTokens, setSolTokens] = useState<SolanaToken[]>([]); // State to store the tokens

    const getStrictTokens = async () => {
        const response = await fetch('https://token.jup.ag/strict');
        const data = await response.json() as SolanaToken[];
        setSolTokens(data); // Update state with fetched tokens
        return data;
    };

    const getAllTokens = async (includeBanned?: boolean) => {
        let url = 'https://token.jup.ag/all';
        if (includeBanned) {
            url += '?includeBanned=true';
        }
        const response = await fetch(url);
        const data = await response.json() as SolanaToken[];
        setSolTokens(data); // Update state with fetched tokens
        return data;
    };

    const value = {
        getStrictTokens,
        getAllTokens,
        solTokens, // Expose the tokens through the context
    };

    useEffect(() => {
        switch (autoLoad) {
            case 'strict':
                getStrictTokens();
                break;
            case 'all':
                getAllTokens();
                break;
            case 'all+banned':
                getAllTokens(true); // Pass true to include banned tokens
                break;
            default:
                // No auto-load action if autoLoad prop is not set or set to an unrecognized value
                break;
        }
    }, [autoLoad]);  // Dependency array includes autoLoad

    return (
        <SolanaTokensContext.Provider value={value}>
            {children}
        </SolanaTokensContext.Provider>
    );
};

export const useSolanaTokens = (): SolanaTokensContextType => {
    const context = useContext(SolanaTokensContext);
    if (context === undefined) {
        throw new Error('useSolanaTokens must be used within a SolanaTokensProvider');
    }
    return context;
};
