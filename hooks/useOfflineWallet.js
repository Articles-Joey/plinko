// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'

export const useOfflineWallet = create((set) => ({
    wallet: {
        total: 100
    },
    lastClaim: null,
    setLastClaim: (newValue) => {
        set((prev) => ({
            lastClaim: newValue
        }))
    },
    addTotal: (newValue) => {
        set((prev) => ({
            wallet: {
                ...prev.wallet,
                total: prev.wallet.total + newValue
            }
        }))
    },
    setWallet: (newValue) => {
        set((prev) => ({
            wallet: newValue
        }))
    }
}))