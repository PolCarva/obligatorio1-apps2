import { useState, useRef } from "react";

const Roulette = () => {
  const barRef = useRef(null);
  const [force, setForce] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    barRef.current.classList.toggle("stopAnimation");
    const forceAmount = barRef.current.getBoundingClientRect().width;
    console.log(forceAmount);
    setForce(forceAmount);

    spin();
  };

  const spin = () => {
    const randomSpin = Math.floor(Math.random() * 100) + 50;
    console.log(randomSpin);
    setRotation(rotation + force * 50 + randomSpin);
  };

  const handleEndOfTransition = () => {
    barRef.current.classList.toggle("stopAnimation");
    const degrees = ((rotation % 360) + 360) % 360;

    const categories = [
      "Category 1 Sports",
      "Category 2 Geography",
      "Category 3 Math",
      "Category 4 Science and Nature",
      "Category 5 Music",
      "Category 6 Video Games",
      "Category 7 TV",
      "Category 8 Movies",
      "Category 9 BOOKS",
      "Category 10 General Knowledge",
    ];

    const categoryIndex = Math.floor(degrees / 36);
    console.log(categories[categoryIndex]);
  };

  return (
    <div className="fixed inset-0 z-10">
      <div className="text-center  flex flex-col justify-around w-screen h-screen bg-black bg-opacity-50">
        <div className="relative">
          <div
            className="roulette w-[90%] max-w-[70vh] h-auto mx-auto aspect-square bg-center bg-cover"
            style={{
              backgroundImage: `url('./rula.png')`,
              transform: `rotate(${rotation}deg)`,
              transition: `transform 6s cubic-bezier(0.2,0.8,0.7,0.99)`,
            }}
            onTransitionEnd={handleEndOfTransition}
          ></div>
          <div className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto">
            <img src="./center.png" alt="" className="max-w-[100px] w-full" />
          </div>
        </div>
        <div className="prize">{1}</div>
        <div className="intensityBar w-3/5 md:w-2/5 lg:w-1/5 p-1 h-8 rounded-full border-2 border-indigo-300 bg-indigo-400 bg-opacity-70 mx-auto">
          <div
            ref={barRef}
            className="widthAnimation h-full bg-yellow-500 rounded-full"
          ></div>
        </div>
        <button
          onClick={handleSpin}
          className="spin w-full md:w-2/5 mx-auto lg:w-1/5 bg-red-300 text-xl rounded-lg py-2 px-8"
        >
          Spin!
        </button>
      </div>
    </div>
  );
};

export default Roulette;
