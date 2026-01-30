import React from "react";
import { upgradeData } from "../Data/storeData";
import { useClickerStore } from "../store/useClickerStore";

export default function Store() {
  const itemData = upgradeData;
  const count = useClickerStore((state) => state.count);
   const purchasedItems = useClickerStore((state) => state.purchasedItems);
  const buyUpgrade = useClickerStore((state) => state.buyUpgrade);
  const unlockedItems = useClickerStore((state) => state.unlockedItems);

  const handleBuy = (item) => {
    if (count < item.cost) {
      return;
    }

    buyUpgrade(item);
    return

  };

  return (
    <div className="w-full flex flex-row justify-center pt-7">
      {itemData.filter((item) => !purchasedItems.includes(item.id)) // 1. ต้องยังไม่ซื้อ
        .filter((item) => unlockedItems.includes(item.id))    // 2. ต้องเคยปลดล็อกแล้ว
         .map((item) => (
        <div key={item.id} className="bg-gray-300 w-100 rounded-3xl p-1.5">
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.cost}</p>
          <button onClick={() => handleBuy(item)} disabled={count < item.cost} className="bg-blue-700 text-amber-50 px-3 py-1.5 rounded-3xl hover:scale-110 transition-transform">Buy</button>
        </div>
      ))}
    </div>
  );
}
