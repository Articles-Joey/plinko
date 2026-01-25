// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create()(
    persist(
        (set, get) => ({

            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                });
            },

            // Only available on larger screens
            showSidebar: true,
            setShowSidebar: (newValue) => {
                set((prev) => ({
                    showSidebar: newValue
                }))
            },

            darkMode: true,
            toggleDarkMode: () => set({ darkMode: !get().darkMode }),
            setDarkMode: (mode) => set({ darkMode: mode }),

            theme: null,
            setTheme: (theme) => set({ theme }),

            balls: [],
            addBall: (type) => {
                set((prev) => ({
                    balls: [
                        ...prev.balls,
                        {
                            spawned: Date.now(),
                            type
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

            teleportLocation: false,
            setTeleportLocation: (location) => {
                set({ teleportLocation: location })
            },

            menuOpen: false,
            setMenuOpen: (open) => {
                set({ menuOpen: open })
            },

            // Flat or Upright
            sceneOrientation: "Flat",
            setSceneOrientation: (orientation) => {
                set({ sceneOrientation: orientation })
            },
            toggleSceneOrientation: () => {
                set((prev) => ({
                    sceneOrientation: prev.sceneOrientation === "Flat" ? "Upright" : "Flat"
                }))
            }

        }),
        {
            name: 'plinko-storage-articles-media', // name of the item in the storage (must be unique)
            version: 1,
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true)
            }
            // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)