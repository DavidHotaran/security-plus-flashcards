import { data } from "./data";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { shuffleArray } from "./utils";

shuffleArray(data);

export default function App() {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = data[activeCard];

  useEffect(() => {
    const keyPressed = (e: KeyboardEvent) => {
      if (e.key == "ArrowLeft") {
        if (activeCard == 0) {
          return;
        } else {
          setActiveCard((num) => num - 1);
          setFlipped(false);
        }
      } else if (e.key == "ArrowRight") {
        if (activeCard >= data.length - 1) {
          return;
        } else {
          setActiveCard((num) => num + 1);
          setFlipped(false);
        }
      } else if (e.key == " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    document.addEventListener("keydown", keyPressed);
    return () => {
      document.removeEventListener("keydown", keyPressed);
    };
  });

  return (
    <div className="flex flex-col min-h-screen  bg-slate-900 text-white">
      <h1 className="text-center pt-10 text-2xl font-bold">
        Security+ (SY0-601) Acronym List Flash Cards
      </h1>
      <div className="flex flex-col items-center justify-center h-screen  mt-[-60px]">
        <div>
          <div className="self-start my-2 mx-2">
            <div className="flex justify-between ">
              <span>
                Card: {activeCard + 1} / {data.length}
              </span>
              <div>
                <label>Acronym:</label>
                <select
                  className="text-black ms-2 rounded-md p-1 outline-none ring-2 ring-gray-500 focus:ring-blue-400"
                  onChange={(e) => setActiveCard(Number(e.target.value))}
                  value={activeCard}
                >
                  {data.map((item, idx) => {
                    return (
                      <option value={idx} key={item.key}>
                        {item.key}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="w-[600px] h-96 border-2 rounded-md p-4 border-white flex flex-col items-center justify-center">
            <h3>{flipped ? card.value : card.key}</h3>
          </div>
          <div className="flex justify-between mt-4">
            <button className="border-2 rounded-md bg-slate-600 px-6 py-2">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              className="border-2 rounded-md bg-slate-600 px-6 py-2"
              onClick={() => setFlipped((f) => !f)}
            >
              Flip
            </button>
            <button className="border-2 rounded-md bg-slate-600 px-6 py-2">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
