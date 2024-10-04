"use client";
import { useEffect, useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { setUpdateList } from "./utils";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listContainer = useRef();

  useEffect(() => {
    setLists([{ name: "item", x: 10, y: 0, width: 80 }]);
    console.log(listContainer.current);
    window.current = listContainer.current;
  }, []);

  const transitions = useTransition(lists, {
    key: (item) => item.name,
    from: ({ animation, width }) => ({
      width: animation ? 0 : width,
      opacity: animation ? 1 : 0,
    }),
    leave: ({ animation, width }) => ({
      width: animation ? 0 : width,
      opacity: animation ? 0 : 1,
    }),
    enter: ({ y, x, width }) => ({ y, x, width, opacity: 1 }),
    update: ({ y, x, width }) => ({ y, x, width }),
    // config: ({ animation }) => ({ duration: animation ? 500 : 1 }),
  });

  const handleAddToList = () => {
    const containerWidth = listContainer.current.clientWidth;
    const itemText = generateRandomText();
    const width = measureTextWidth(itemText) + 100;

    let newLists = [
      { x: 0, y: 0, width, name: itemText, animation: true },
      ...lists,
    ];
    const updatedList = setUpdateList(newLists, containerWidth, isModalOpen);

    setLists([...updatedList]);
  };
  const handleClick = (item) => {
    // move to first position
    const containerWidth = listContainer.current.clientWidth;
    const filterItems = lists.filter((list) => list.name != item.name);

    const updatedList = setUpdateList(
      [{ ...item, x: 0, y: 0 }, ...filterItems],
      containerWidth,
      isModalOpen
    );

    setLists([...updatedList]);
    setLists(updatedList);
  };
  const handleExpand = () => {
    const containerWidth = listContainer.current.clientWidth;
    setIsModalOpen((prev) => !prev);
    setLists([...setUpdateList(lists, containerWidth, !isModalOpen)]);
  };
  return (
    <div className="container mx-auto my-10">
      <h2 className="my-10 font-bold">List animation</h2>
      <div className="container flex relative">
        <div className="">
          <button
            onClick={handleAddToList}
            className="rounded-md px-8 py-4 font-bold text-gray-500 bg-gray-200"
          >
            Add
          </button>
        </div>

        <div
          ref={listContainer}
          className={`relative ml-2 w-full overflow-hidden overflow-x-scroll no-scrollbar min-h-20 h-80  ${
            isModalOpen ? " p-3 bg-gray-200 " : "max-h-20 "
          }`}
        >
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
        <button
          onClick={handleExpand}
          className="absolute z-40 right-0 -top-8 bg-gray-600 text-white font-bold py-1 px-3 rounded-md"
        >
          {isModalOpen ? "Collabpse" : "Expand"}
        </button>
      </div>
    </div>
  );
}
