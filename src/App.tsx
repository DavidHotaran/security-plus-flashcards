import { useState, useEffect, useRef } from "react";
import { FlashCards, Ports } from "./components";
import { cards, ports } from "./data";
import { shuffleArray } from "./utils";

shuffleArray(cards);

export default function App() {
  const [cardType, setCardType] = useState("flash-cards");

  return (
    <div className="flex flex-col min-h-screen  bg-slate-900 text-white">
      <h1 className="text-center pt-10 text-2xl font-bold">
        Security+ (SY0-601) Acronym List Flash Cards
      </h1>
      <div className="mt-10">
        <h4 className="text-center mb-2">Select Card Type</h4>
        <div className="flex justify-around w-64 mx-auto">
          <div>
            <input
              className="me-1"
              value="flash-cards"
              name="card-selection"
              type="radio"
              checked={cardType === "flash-cards"}
              onChange={(e) => setCardType(e.target.value)}
            />
            <label>Flash Cards</label>
          </div>
          <div>
            <input
              className="me-1"
              value="ports"
              name="card-selection"
              type="radio"
              checked={cardType === "ports"}
              onChange={(e) => setCardType(e.target.value)}
            />
            <label>Port #s</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        {cardType === "ports" ? <Ports /> : <FlashCards />}
      </div>
    </div>
  );
}
