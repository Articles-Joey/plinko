// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create()(
    persist(
        (set, get) => ({

            darkMode: true,
            toggleDarkMode: () => set({ darkMode: !get().darkMode }),

            balls: [],
            addBall: () => {
                set((prev) => ({
                    balls: [
                        ...prev.balls,
                        {
                            spawned: Date.now()
                        }
                    ]
                }))
            },
            removeBall: (ball_id) => {
                set((prev) => ({
                    balls: [
                        ...prev.balls.filter(obj => obj.spawned !== ball_id)
                    ]
                }))
            },

            debug: false,
            setDebug: () => {
                set((prev) => ({
                    debug: !prev.debug
                }))
            },

        }),
        {
            name: 'plinko-storage-articles-media', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)