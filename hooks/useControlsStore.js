// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useControlsStore = create()(
    persist(
        (set, get) => ({

            hasHydrated: false,
            setHasHydrated: (val) => set({ hasHydrated: val }),

            mappings: {
                "Redeem Online Ball": '1',
                'Claim Online Points': '2',
                "Redeem Offline Ball": '3',
                "Claim Offline Points": '4',
            },
            setMapping: (action, key) => {
                set((prev) => ({
                    mappings: {
                        ...prev.mappings,
                        [action]: key
                    }
                }))
            },
            clearMapping: (action) => {
                set((prev) => ({
                    mappings: {
                        ...prev.mappings,
                        [action]: null
                    }
                }))
            },
            resetControls: () => {
                set({
                    mappings: {
                        "Redeem Online Ball": '1',
                        'Claim Online Points': '2',
                        "Redeem Offline Ball": '3',
                        "Claim Offline Points": '4',
                    }
                })
            },

        }),
        {
            name: 'controls-store', // name of the item in the storage (must be unique)
            version: 0,
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true)
            },
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => ![
                        'hasHydrated'
                    ].includes(key))
                ),
        },
    ),
)