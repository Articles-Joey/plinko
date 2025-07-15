// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'

export const useWallet = create((set) => ({
    wallet: {
        total: 0
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