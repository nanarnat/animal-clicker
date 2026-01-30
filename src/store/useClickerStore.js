import { create } from "zustand";
import { persist } from "zustand/middleware";
import { autoData } from "../Data/autoData";

export const useClickerStore = create(
  persist(
    (set,get) => ({
      count: 0,
      power: 1,
      purchasedItems: [],
      autoPower: 0,
      autoUnit: {},
      autoBuff: {},
      unlockedItems: [],

      // ฟังก์ชันช่วยคำนวณพลังผลิตรวม (Total CPS)
      calculateTotalCPS: (units, buffs) => {
        return autoData.reduce((total, item) => {
          const count = units[item.id] || 0;
          const buff = buffs[item.id] || 1; // บัฟรายตัว
          return total + (count * item.value * buff );
        }, 0);
      },

      // ฟังก์ชันสำหรับปลดล็อกไอเทม
      unlockItem: (id) => set((state) => {
        if (state.unlockedItems.includes(id)) return state;
        return { unlockedItems: [...state.unlockedItems, id] };
      }),

      clickButton: () =>
        set((state) => ({
          count: state.count + state.power,
        })),

      tick: () =>
        set((state) => ({
          count: state.count + state.autoPower,
        })),

      buyAuto: (item) =>
        set((state) => {
          const currentLevel = state.autoUnit[item.id] || 0;
          const currentCost = Math.floor(
            item.startCost * Math.pow(item.growthRate, currentLevel),
          );
          if (state.count < currentCost) return state;
          const nextUnits = { ...state.autoUnit, [item.id]: currentLevel + 1 };
        // คำนวณ autoPower ใหม่ทุกครั้งที่ซื้อสัตว์
        const newTotalPower = get().calculateTotalCPS(nextUnits, state.autoBuff);
          
          return {
            count: state.count - currentCost,
            // เพิ่มจำนวน Unit โดยใช้ ID เป็น Key (แม่นยำกว่าใช้ชื่อ)
            autoUnit: {
              ...state.autoUnit,
              [item.id]: currentLevel + 1,
            },
            autoPower: newTotalPower,
          };
        }),

      buyUpgrade: (item) =>
        set((state) => {
          if (state.count < item.cost) return state;
          let newPower = state.power;
          let newBuff = { ...state.autoBuff }

          if (item.type === "Plus") {
            newPower = state.power + item.value;
          } else if (item.type === "Multiply") {
            newPower = state.power * item.value;
          } else if (item.type === "Auto"){
            const currentBuff = state.autoBuff[item.targetId] || 1;
            newBuff[item.targetId] = currentBuff * item.value
          }

          const newTotalPower = get().calculateTotalCPS(state.autoUnit, newBuff)
          return {
            count: state.count - item.cost,
            power: newPower,
            autoBuff:newBuff,
            autoPower: newTotalPower,
            purchasedItems: [...state.purchasedItems, item.id],
          };
        }),

      // upgradePowerPlus: (num) =>
      //   set((state) => ({
      //     power: state.power + num,
      //   })),

      // upgradePowerMultiply: (num) =>
      //   set((state) => ({
      //     power: state.power * num,
      //   })),

      // shop: (cost) =>
      //   set((state) => {
      //     if (state.count >= cost) {
      //       return {count: state.count - cost}
      //     }
      //     return state
      //   }),
    }),
    {
      name: "clicker-store",
    },
  ),
);
