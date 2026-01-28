import React, { useEffect, useState } from "react";
import { useClickerStore } from "../store/useClickerStore.js";

export default function Click() {
  const count = useClickerStore((state) => state.count);
  const clickButton = useClickerStore((state) => state.clickButton);

  // ป้องกัน Hydration Error
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // ถ้ายังโหลดข้อมูลจาก LocalStorage ไม่เสร็จ ให้ยังไม่ต้องแสดงผล
  if (!isReady) return null;

  return (
    <div>
      <div className="text-5xl p-5">{count}</div>
      <button
        className="px-4 py-2 bg-blue-500 text-4xl rounded-4xl hover:scale-110 transition-transform
"
        onClick={clickButton}
      >
        Click Here!
      </button>
    </div>
  );
}
