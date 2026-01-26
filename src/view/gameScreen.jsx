import React from "react";
import Click from "../components/click";

export default function GameScreen() {
    return (
        <div className="w-full h-full text-center">
            <h1 className="text-8xl p-7">Animal Clicker</h1>
            <Click/>
        </div>
    );

}