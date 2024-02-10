import { cards } from "../data";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { shuffleArray } from "../utils";
import { DataObject, DataObjectArray } from "../types";

shuffleArray(cards);

export const FlashCards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [keyIndex, setKeyIndex] = useState(0);
  const clickRef = useRef<any>();
  const scrollRef = useRef<any>();

  const card: DataObject = cards[activeCard];
  const filteredData: DataObjectArray = cards.filter((item) =>
    item.key.toLocaleLowerCase().startsWith(filterValue)
  );

  // when a value from the dropdown is selected, set that as the active card
  const handleFilterClick = (item: DataObject) => {
    const idx = cards.indexOf(item);
    setFilterValue(item.key);
    setActiveCard(idx);
  };

  // hide the dropdown if user clicks outside the element
  const handleOutterClick = (e: any) => {
    if (clickRef.current && !clickRef.current?.contains(e.target)) {
      setHidden(true);
    }
  };

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
      if (activeCard >= cards.length - 1) {
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
      case "ArrowDown":
        if (keyIndex === filteredData.length - 1) return;
        setKeyIndex((i) => ++i);
        scrollRef.current.scrollBy(0, 24);
        break;
      case "ArrowUp":
        if (keyIndex === 0) return;
        setKeyIndex((i) => --i);
        scrollRef.current.scrollBy(0, -24);
        break;
      case "Enter":
        setFilterValue(filteredData[keyIndex].key);
        setActiveCard(keyIndex);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("click", handleOutterClick);
    return () => {
      document.removeEventListener("keydown", keyPressed);
      document.removeEventListener("click", handleOutterClick);
    };
  }, [handleClick, handleOutterClick, keyPressed]);

  return (
    <div className="flex flex-col items-center justify-center " id="test">
      <div>
        <div className="self-start my-2 mx-2">
          <div className="flex justify-between ">
            <span>
              Card: {activeCard + 1} / {cards.length}
            </span>
            <div>
              <div className="relative" ref={clickRef}>
                <input
                  className="text-black rounded-md p-1 outline-none ring-2 ring-gray-500 focus:ring-blue-400 relative"
                  onClick={() => setHidden((h) => !h)}
                  onChange={(e) => setFilterValue(e.target.value)}
                  value={filterValue}
                  placeholder="Search..."
                />
                <ChevronDownIcon
                  className="h-6 w-6 absolute top-1 right-1 stroke-slate-500"
                  onClick={() => setHidden((h) => !h)}
                />
                <div
                  className={`${
                    hidden && "hidden"
                  } absolute right-0 top-6  border-blue-500 w-full h-fit max-h-64 overflow-y-auto`}
                  ref={scrollRef}
                >
                  {filteredData.map((item, idx) => {
                    return (
                      <p
                        className={`bg-white text-black cursor-pointer hover:bg-slate-300 hover:text-white px-2 ${
                          idx === keyIndex &&
                          "border-2 border-blue-400 bg-slate-300 text-white"
                        }`}
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
              activeCard >= cards.length - 1
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-600"
            } px-6 py-2`}
            onClick={() => handleClick("right")}
            disabled={activeCard >= cards.length - 1}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
