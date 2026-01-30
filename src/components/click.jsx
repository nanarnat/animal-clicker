import React, { useEffect, useState } from "react";
import { useClickerStore } from "../store/useClickerStore.js";

export default function Click() {
  const count = useClickerStore((state) => state.count);
  const clickButton = useClickerStore((state) => state.clickButton);
  const autoPower = useClickerStore((state) => state.autoPower);

  // ป้องกัน Hydration Error
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // ถ้ายังโหลดข้อมูลจาก LocalStorage ไม่เสร็จ ให้ยังไม่ต้องแสดงผล
  if (!isReady) return null;

  return (
    <div>
      <div className="text-5xl p-5">{count.toFixed(1)}</div>
      <p>{autoPower.toFixed(1)} click/second</p>
      <button
        className="px-4 py-2 bg-blue-500 text-4xl rounded-3xl hover:scale-110 transition-transform
"
        onClick={clickButton}
      >
        Click Here!
      </button>
    </div>
  );
}
