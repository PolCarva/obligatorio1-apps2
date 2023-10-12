import categories from "../data/categories";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

/* Sonidos Ruleta */
import fastSpinSound from "../assets/music/spinSlow.mp3";
import slowSpinSound from "../assets/music/spinFast.mp3";
import successSpinSound from "../assets/music/successSpin.mp3";

const fastSpinAudio = new Audio(fastSpinSound);
const slowSpinAudio = new Audio(slowSpinSound);
const successSpinAudio = new Audio(successSpinSound);

const Roulette = ({ onCategorySelected, closeModal }) => {
  const [currentForce, setCurrentForce] = useState(0);

  const barRef = useRef(null);
  const barContainerRef = useRef(null);

  const [rotation, setRotation] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Spin To Play!");
  const [disableSpinButton, setDisableSpinButton] = useState(false);

  const handleSpin = (e) => {
    e.stopPropagation();
    setDisableSpinButton(true);
    barRef.current.classList.toggle("stopAnimation");
    const forceAmount = barRef.current.getBoundingClientRect().width;

    setCurrentForce(forceAmount);
    spin(forceAmount);
  };

  useEffect(() => {
    //Evita que la ruleta suene al entrar
    setTimeout(() => {
      fastSpinAudio.pause();
      fastSpinAudio.currentTime = 0;

      slowSpinAudio.pause();
      slowSpinAudio.currentTime = 0;
    }, 1);
  }, []);

  const spin = (forceAmount) => {
    const randomSpin = Math.floor(Math.random() * 100) + 50;
    const rotationAmount = rotation + forceAmount * 50 + randomSpin;
    setRotation(rotationAmount);
  };

  const handleEndOfTransition = () => {
    barRef.current.classList.toggle("stopAnimation");
    const degrees = ((rotation % 360) + 360) % 360;

    const categoryIndex = Math.floor(degrees / 36);
    setSelectedCategory(categories[categoryIndex].display);
    onCategorySelected(categories[categoryIndex].id);

    setDisableSpinButton(false);
    successSpinAudio.play();
  };

  useEffect(() => {
    fastSpinAudio.pause();
    fastSpinAudio.currentTime = 0;

    slowSpinAudio.pause();
    slowSpinAudio.currentTime = 0;

    const threshold =
      0.4 * barContainerRef.current.getBoundingClientRect().width;
    // Determine if the spin is fast or slow
    if (currentForce < threshold) {
      fastSpinAudio.play();
    } else {
      slowSpinAudio.play();
    }
  }, [currentForce]);

  return (
    <div className="fixed inset-0 z-10">
      <div
        onClick={closeModal}
        className="text-center px-5 flex flex-col justify-center gap-5 w-screen h-screen bg-black bg-opacity-80"
      >
        <AiOutlineClose
          onClick={closeModal}
          className={"fill-white w-8 h-8 absolute cursor-pointer top-4 right-4"}
        />
        <div className="relative">
          <div
            onClick={handleSpin}
            className="roulette w-[90%] max-w-[60vh] h-auto mx-auto aspect-square bg-center bg-cover"
            style={{
              backgroundImage: `url('./rula.png')`,
              transform: `rotate(${rotation}deg)`,
              transition: `transform 6s cubic-bezier(0.2,0.8,0.7,0.99)`,
            }}
            onTransitionEnd={handleEndOfTransition}
          ></div>
          <div
            onClick={handleSpin}
            className="center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto"
          >
            <img
              src="./center.png"
              alt=""
              className="max-w-[60px] md:max-w-[100px] w-full"
            />
          </div>
        </div>
        <div className="prize text-xl font-bold">{selectedCategory}</div>
        <div className="intensityBar w-3/5 md:w-2/5 lg:w-1/5 p-1 h-8 rounded-full border-2 border-indigo-300 bg-indigo-400 bg-opacity-70 mx-auto">
          <div
            ref={barRef}
            className="widthAnimation h-full bg-yellow-500 rounded-full"
          ></div>
        </div>
        <button
          ref={barContainerRef}
          onClick={handleSpin}
          disabled={disableSpinButton}
          className="spin w-full md:w-2/5 mx-auto lg:w-1/5 bg-green-400 text-xl rounded-lg py-2 px-8 disabled:text-gray-400 disabled:bg-green-800 disabled:cursor-not-allowed"
        >
          Spin!
        </button>
      </div>
    </div>
  );
};

export default Roulette;
