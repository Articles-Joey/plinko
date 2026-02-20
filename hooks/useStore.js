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

            betAmount: 10,
            setBetAmount: (amount) => {
                set({ betAmount: amount })
            },

            darkMode: true,
            toggleDarkMode: () => set({ darkMode: !get().darkMode }),
            setDarkMode: (mode) => set({ darkMode: mode }),

            theme: null,
            setTheme: (theme) => set({ theme }),

            balls: [],
            addBall: (data) => {
                set((prev) => ({
                    balls: [
                        ...prev.balls,
                        {
                            spawned: Date.now(),
                            ...data,
                            amount: data?.amount || get().betAmount,
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
            resetBalls: () => {
                set({ balls: [] })
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

            teleportTarget: false,
            setTeleportTarget: (target) => {
                set({ teleportTarget: target })
            },

            teleportZoom: false,
            setTeleportZoom: (zoom) => {
                set({ teleportZoom: zoom })
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
            },

            showSettingsModal: false,
            setShowSettingsModal: (show) => {
                set({ showSettingsModal: show })
            },

            setShowCreditsModal: (show) => {
                set({ showCreditsModal: show })
            },
            showCreditsModal: false,

            showInfoModal: false,
            setShowInfoModal: (show) => {
                set({ showInfoModal: show })
            },

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