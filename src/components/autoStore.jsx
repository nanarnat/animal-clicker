import React from "react";
import { autoData } from "../Data/autoData";
import { useClickerStore } from "../store/useClickerStore";

export default function AutoStore() {
  const buyAuto = useClickerStore((state) => state.buyAuto);
  const autoUnit = useClickerStore((state) => state.autoUnit);
  const count = useClickerStore((state) => state.count);
  const unlockedItems = useClickerStore((state) => state.unlockedItems);

  const handleBuy = (item) => buyAuto(item);

  return (
    <div className="w-full flex flex-row flex-wrap gap-7 justify-center md:py-7 py-3">

      {autoData.filter((item) => unlockedItems.includes(item.id)).map((item) => {
        const num = autoUnit[item.id] || 0;
        const currentCost = Math.floor(item.startCost * Math.pow(item.growthRate, num));

        return(
        <div key={item.id} >
            
          <button onClick={()=>handleBuy(item)} disabled={count < currentCost} className="w-85 flex flex-row items-center rounded-3xl hover:scale-110 transition-transform bg-blue-200">
            <div className="h-20 w-20"><img src={item.img}/></div>
            <div>
            <p>{item.name}</p> 
            <p>{item.description}</p>
            <p>current : {num}</p> 
            <p>cost : {currentCost}</p>
            </div>
          </button>
        </div>)
})}
    </div>
  );
}
