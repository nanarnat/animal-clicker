import React from "react";
import { useClickerStore } from "../store/useClickerStore.js"

export default function Click() {
    
    const {click, clickButton} = useClickerStore()

    return (
        <div>
            <div className="text-5xl p-5">{click}</div>
        <button className="px-4 py-2 bg-blue-500 text-4xl rounded-4xl hover:scale-110 transition-transform
" onClick={clickButton}>Click Here!</button>
        </div>

    )
}