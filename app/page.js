"use client";
import { useEffect, useState } from "react";
import { useTransition, animated } from "@react-spring/web";

const generateRandomText = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const textLength = Math.floor(Math.random() * (20 - 5 + 1)) + 5; // random length between 12 and 20
  let randomText = "";

  for (let i = 0; i < textLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }

  return randomText;
};

// Measure the text width
const measureTextWidth = (text) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = "14px";
    return context.measureText(text).width;
  }
  return 0;
};

export default function Home() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists([{ name: "item", width: 80 }]);
  }, []);

  let width = 0;
  const transitions = useTransition(
    lists.map((data) => ({
      ...data,
      x: (width += data.width + 10) - data.width,
    })),
    {
      key: (item) => item.name,
      from: { width: 0, opacity: 0 },
      leave: { width: 0, opacity: 0 },
      enter: ({ x, width }) => ({ x, width, opacity: 1 }),
      update: ({ x, width }) => ({ x, width }),
      // config: { duration: 500 },
    }
  );

  const handleAddToList = () => {
    const itemText = generateRandomText();
    const width = itemText.split("").length * 14;
    const textWidth = measureTextWidth("");
    setLists([{ name: itemText, width }, ...lists]);
  };
  const handleClick = (item) => {
    // move to first position
    const filterItems = lists.filter((list) => list.name != item.name);
    setLists([item, ...filterItems]);
  };
  return (
    <div className="container mx-auto my-10">
      <h2 className="my-10 font-bold">List animation</h2>
      <div className="list__container relative w-full overflow-hidden overflow-x-scroll no-scrollbar h-[80px]">
        {transitions((style, item, t, index) => (
          <animated.div
            className="absolute h-auto mx-3 cursor-pointer rounded-md overflow-hidden"
            style={{ zIndex: lists.length - index, ...style }}
            onClick={() => handleClick(item)}
          >
            <div className="py-5 bg-gray-800 text-white w-full text-center select-none text-sm font-bold ">
              {item.name}
            </div>
          </animated.div>
        ))}
      </div>
      {/* <div className="my-20">
        <App />
      </div> */}
      <div className="my-10 ">
        <button
          onClick={handleAddToList}
          className="rounded-md px-10 py-5 font-bold text-gray-500 bg-gray-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}
