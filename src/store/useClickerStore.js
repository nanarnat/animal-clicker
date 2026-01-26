import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useClickerStore = create(
    persist(
        (set) => ({
            click : 0,
            power: 1,

            clickButton: ()=>(
                set(state => ({
    click: state.click + state.power,
  })))

        }),
        {
      name: "clicker-store", 
    }
    ));