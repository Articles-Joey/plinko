// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional';
import { persist } from 'zustand/middleware';

export const useOfflineWallet = create(
    persist(
        (set) => ({
            wallet: {
                total: 100
            },
            lastClaim: null,
            setLastClaim: (newValue) => {
                set((prev) => ({
                    lastClaim: newValue
                }));
            },
            addTotal: (newValue) => {
                set((prev) => ({
                    wallet: {
                        ...prev.wallet,
                        total: prev.wallet.total + newValue
                    }
                }));
            },
            setWallet: (newValue) => {
                set((prev) => ({
                    wallet: newValue
                }));
            }
        }),
        {
            name: 'plink-offline-wallet-store', // Name of the localStorage key
            partialize: (state) => ({ wallet: state.wallet, lastClaim: state.lastClaim }) // Specify what to persist
        }
    )
);