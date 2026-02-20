import { create } from 'zustand'

export const useCameraStore = create((set) => ({
  cameraPosition: [0, 0, 0],
  cameraTarget: [0, 0, 0],
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
}))
