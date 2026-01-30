import React, { useEffect } from "react";
import Click from "../components/click";
import Store from "../components/store";
import { useClickerStore } from "../store/useClickerStore";
import AutoStore from "../components/autoStore";
import { upgradeData } from "../Data/storeData";
import { autoData } from "../Data/autoData";

export default function GameScreen() {
    const count = useClickerStore((state) => state.count);
  const tick = useClickerStore((state) => state.tick);
  const autoPower = useClickerStore((state) => state.autoPower);
  const unlockItem = useClickerStore((state) => state.unlockItem);
  const unlockedItems = useClickerStore((state) => state.unlockedItems);
  useEffect(() => {
    // เช็ค Upgrade
    upgradeData.forEach((item) => {
      if (count >= item.cost * 0.5 && !unlockedItems.includes(item.id)) {
        unlockItem(item.id);
      }
    });

    // เช็ค Auto Units
    autoData.forEach((item) => {
      if (count >= item.startCost * 0.5 && !unlockedItems.includes(item.id)) {
        unlockItem(item.id);
      }
    });
  }, [count, unlockedItems, unlockItem]); // รันทุกครั้งที่แต้มเปลี่ยน

  useEffect(() => {
    // ถ้ามีพลัง Auto มากกว่า 0 ถึงจะเริ่มทำงาน
    if (autoPower <= 0) return;

    const interval = setInterval(() => {
      tick();
    }, 1000); // ทำงานทุก 1 วินาที

    return () => clearInterval(interval); // ล้างทิ้งเมื่อปิดหน้าจอเพื่อไม่ให้เครื่องค้าง
  }, [tick, autoPower]);

  return (
    <div className="w-full h-full text-center p-15">
      <h1 className="text-4xl md:text-8xl ">Animal Clicker</h1>
      <Click />
      <Store />
      <AutoStore />
    </div>
  );
}
