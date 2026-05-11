// import { create } from 'zustand'
import { createWithEqualityFn as create } from 'zustand/traditional'
import { persist, createJSONStorage } from 'zustand/middleware'

import typicalZustandStoreExcludes from '@articles-media/articles-dev-box/typicalZustandStoreExcludes';
import typicalZustandStoreStateSlice from '@articles-media/articles-dev-box/typicalZustandStoreStateSlice';

import randomNicknameConfig from '@/util/randomNicknameConfig';

export const useStore = create()(
    persist(
        (set, get) => ({

            ...typicalZustandStoreStateSlice(
                set,
                get,
                randomNicknameConfig,
            ),

            betAmount: 10,
            setBetAmount: (amount) => {
                set({ betAmount: amount })
            },

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

            controlType: "Orbit",
            setControlType: (type) => {
                set({ controlType: type })
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

            loadDecorativeContent: false,
            setLoadDecorativeContent: (load) => {
                set({ loadDecorativeContent: load })
            },

        }),
        {
            name: 'plinko-storage-articles-media', // name of the item in the storage (must be unique)
            version: 2,
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true)
            },
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => ![
                        ...typicalZustandStoreExcludes,
                        "balls",
                        "loadDecorativeContent",
                    ].includes(key))
                ),
        },
    ),
)