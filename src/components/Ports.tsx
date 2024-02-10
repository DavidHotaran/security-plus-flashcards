import { ports } from "../data";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PortObject } from "../types";

export const Ports = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const port: PortObject = ports[activeCard];

  // button onclick handler
  const handleClick = (direction: "left" | "right") => {
    if (direction == "left") {
      if (activeCard == 0) {
        return;
      } else {
        setActiveCard((num) => num - 1);
        setFlipped(false);
      }
    } else if (direction == "right") {
      if (activeCard >= ports.length - 1) {
        return;
      } else {
        setActiveCard((num) => num + 1);
        setFlipped(false);
      }
    }
  };

  // key press handler
  const keyPressed = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        handleClick("left");
        break;
      case "ArrowRight":
        handleClick("right");
        break;
      case " ": //space bar
        e.preventDefault();
        setFlipped((f) => !f);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    return () => {
      document.removeEventListener("keydown", keyPressed);
    };
  }, [handleClick, keyPressed]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="self-start my-2 mx-2">
          <div className="flex justify-between">
            <span>
              Card: {activeCard + 1} / {ports.length}
            </span>
            <div>
              <select
                onChange={(e) => setActiveCard(Number(e.target.value))}
                className="text-black rounded-md p-1 outline-none ring-2 ring-gray-500 focus:ring-blue-400"
                value={activeCard}
              >
                {ports.map((port: PortObject, idx) => {
                  return (
                    <option value={idx} key={idx}>
                      {port["unsecure protocol"]}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[600px] h-96 border-2 rounded-md p-4 border-white flex flex-col items-center justify-center">
        {!flipped ? (
          <h3>{port["unsecure protocol"]}</h3>
        ) : (
          <div>
            <p>original port: {port["original port"]}</p>
            <p>secure protocol: {port["secure protocol"]}</p>
            <p>secure port: {port["secure port"]}</p>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 w-full">
        <button
          className={`border-2 rounded-md ${
            activeCard == 0 ? "bg-slate-400 cursor-not-allowed" : "bg-slate-600"
          } px-6 py-2`}
          onClick={() => handleClick("left")}
          disabled={activeCard == 0}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          className="border-2 rounded-md bg-slate-600 px-6 py-2"
          onClick={() => setFlipped((f) => !f)}
        >
          Flip
        </button>
        <button
          className={`border-2 rounded-md ${
            activeCard >= ports.length - 1
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-slate-600"
          } px-6 py-2`}
          onClick={() => handleClick("right")}
          disabled={activeCard >= ports.length - 1}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
