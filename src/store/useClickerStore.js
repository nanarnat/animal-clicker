import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useClickerStore = create(
  persist(
    (set) => ({
      count: 0,
      power: 1,

      clickButton: () =>
        set((state) => ({
          count: state.count + state.power,
        })),

      upgradePowerPlus: (num) =>
        set((state) => ({
          power: state.power + num,
        })),

      upgradePowerMultiply: (num) =>
        set((state) => ({
          power: state.power * num,
        })),

      shop: (cost) => 
        set((state) => {
          if (state.count >= cost) {
            return {count: state.count - cost}
          }
          return state
        }),  
    }),
    {
      name: "clicker-store",
    },
  ),
);
