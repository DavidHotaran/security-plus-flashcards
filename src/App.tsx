import { data } from "./data";
import { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { shuffleArray } from "./utils";
import { DataObject, DataObjectArray } from "./types";

shuffleArray(data);

export default function App() {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [filerValue, setFilterValue] = useState("");
  const ref = useRef<any>();

  const card: DataObject = data[activeCard];
  const filteredData: DataObjectArray = data.filter((item) =>
    item.key.toLocaleLowerCase().startsWith(filerValue)
  );

  const handleFilterClick = (item: DataObject) => {
    const idx = data.indexOf(item);
    setFilterValue(item.key);
    setActiveCard(idx);
  };

  const handleOutterClick = (e: any) => {
    if (ref.current && !ref.current?.contains(e.target)) {
      setHidden(true);
    }
  };

  const handleClick = (direction: "left" | "right") => {
    if (direction == "left") {
      if (activeCard == 0) {
        return;
      } else {
        setActiveCard((num) => num - 1);
        setFlipped(false);
      }
    } else if (direction == "right") {
      if (activeCard >= data.length - 1) {
        return;
      } else {
        setActiveCard((num) => num + 1);
        setFlipped(false);
      }
    }
  };

  useEffect(() => {
    const keyPressed = (e: KeyboardEvent) => {
      if (e.key == "ArrowLeft") {
        handleClick("left");
      } else if (e.key == "ArrowRight") {
        handleClick("right");
      } else if (e.key == " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("click", handleOutterClick);
    return () => {
      document.removeEventListener("keydown", keyPressed);
      document.removeEventListener("click", handleOutterClick);
    };
  }, [handleClick, handleOutterClick]);

  return (
    <div className="flex flex-col min-h-screen  bg-slate-900 text-white">
      <h1 className="text-center pt-10 text-2xl font-bold">
        Security+ (SY0-601) Acronym List Flash Cards
      </h1>
      <div
        className="flex flex-col items-center justify-center h-screen  mt-[-60px]"
        id="test"
      >
        <div>
          <div className="self-start my-2 mx-2">
            <div className="flex justify-between ">
              <span>
                Card: {activeCard + 1} / {data.length}
              </span>
              <div>
                <div className="relative">
                  <input
                    className="text-black"
                    onClick={() => setHidden((h) => !h)}
                    onChange={(e) => setFilterValue(e.target.value)}
                    value={filerValue}
                    ref={ref}
                  />
                  <div
                    className={`${
                      hidden && "hidden"
                    } absolute right-0 top-6 border-2 border-blue-500 w-full h-fit max-h-64 overflow-y-auto`}
                  >
                    {filteredData.map((item) => {
                      return (
                        <p
                          className="bg-white text-black cursor-pointer hover:bg-slate-300 hover:text-white"
                          key={item.key}
                          onClick={() => handleFilterClick(item)}
                        >
                          {item.key}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[600px] h-96 border-2 rounded-md p-4 border-white flex flex-col items-center justify-center">
            <h3>{flipped ? card.value : card.key}</h3>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className={`border-2 rounded-md ${
                activeCard == 0
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-600"
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
                activeCard >= data.length - 1
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-600"
              } px-6 py-2`}
              onClick={() => handleClick("right")}
              disabled={activeCard >= data.length - 1}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
