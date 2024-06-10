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
    const [solTokensLoading, setSolTokensLoading] = useState(false);

    const getStrictTokens = async () => {
        setSolTokensLoading(true);
        try {
            const response = await fetch('https://token.jup.ag/strict');
            const data = await response.json() as SolanaToken[];
            setSolTokens(data);
        } catch (error) {
            console.error("Failed to fetch strict tokens:", error);
        }
        setSolTokensLoading(false);
    };

    const getAllTokens = async (includeBanned: boolean = false) => {
        setSolTokensLoading(true);
        try {
            let url = 'https://token.jup.ag/all';
            if (includeBanned) {
                url += '?includeBanned=true';
            }
            const response = await fetch(url);
            const data = await response.json() as SolanaToken[];
            setSolTokens(data);
        } catch (error) {
            console.error("Failed to fetch all tokens:", error);
        }
        setSolTokensLoading(false);
    };

    const value = {
        getStrictTokens,
        getAllTokens,
        solTokens,
        solTokensLoading,
    };

    useEffect(() => {
        if (autoLoad === 'strict') {
            getStrictTokens();
        } else if (autoLoad === 'all') {
            getAllTokens();
        } else if (autoLoad === 'all+banned') {
            getAllTokens(true);
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
