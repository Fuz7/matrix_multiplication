/* eslint-disable no-unused-vars */
import smallBracket from "@images/smallBracket.svg";
import {
  useFastForwardSpeed,
  useMatrixSizeStore,
  useMultiplicationType,
  useStartedStore,
} from "../utils/store";
import { useEffect, useRef } from "react";
import { motion, useAnimate } from "motion/react";

export default function Header() {
  return (
    <header className="flex flex-col px-[60px]">
      <div className="flex justify-between">
        <MatrixSizeSection />
        <FastForwardSection />
      </div>
      <MultiplicationType />
    </header>
  );
}
function MatrixSizeSection() {
  const { matrixSize, setMatrixSize } = useMatrixSizeStore((state) => state);
  const started = useStartedStore((state) => state.started);
  const [sizeScope, animate] = useAnimate(null);

  useEffect(() => {
    if (started === true) {
      animate(
        sizeScope.current,
        { y: -150 },
        { duration: 1, ease: "easeInOut" },
      );
    }
  }, [started, animate, sizeScope]);

  function SizeButton({ text }) {
    return (
      <div
        onClick={() => {
          matrixSize !== text && setMatrixSize(text);
        }}
        className={`h-[50px] w-[150px] tracking-[-0.05em]
        ${
          matrixSize === text
            ? "text-mainBlack bg-white"
            : "cursor-pointer border border-solid border-white text-white"
        }
           flex items-center justify-center
        text-[40px]`}
      >
        {text.toUpperCase()}
      </div>
    );
  }

  return (
    <div
      id="matrixSizeHeader"
      ref={sizeScope}
      className="mt-[40px] flex flex-col gap-[5px] "
    >
      <h3 className="text-[30px] tracking-[-0.03em]">MATRIXES</h3>
      <div className="flex gap-[33px]">
        <SizeButton text={"small"} />
        <SizeButton text={"large"} />
      </div>
    </div>
  );
}

function FastForwardSection() {
  const started = useStartedStore((state) => state.started);
  const [fastForwardScope, animate] = useAnimate(null);

  useEffect(() => {
    if (started === true) {
      animate(
        fastForwardScope.current,
        { y: 105 },
        { duration: 0.7, ease: "easeInOut", delay: 4 },
      );
    }
  }, [started, animate, fastForwardScope]);

  return (
    <motion.div
      ref={fastForwardScope}
      className={`mt-[50px] flex -translate-y-[105px] gap-[40px]`}
    >
      <div className="flex gap-[10px] text-white">
        <FastForwardButton speed={2} />
        <FastForwardButton speed={4} />
        <FastForwardButton speed={8} />
        <FastForwardButton speed={16} />
      </div>
      <button
        className="flex h-[50px] w-[120px] flex-col
          items-center justify-center border border-solid border-white text-[40px]
          tracking-[-0.1em]"
      >
        SKIP
      </button>
    </motion.div>
  );
}

function MultiplicationType() {
  const { multiplicationType, setMultiplicationType } = useMultiplicationType(
    (state) => state,
  );
  const started = useStartedStore((state) => state.started);
  const [typeScope, animate] = useAnimate(null);

  useEffect(() => {
    if (started === true) {
      const typeHeaderAnimation = async () => {
        const matrixSizeElement = document.getElementById("matrixSizeHeader");
        const matrixSizeXOffset =
          matrixSizeElement.getBoundingClientRect().left;
        const standardButtonElement = document.getElementById(
          "standardButtonHeader",
        );
        const standardButtonXOffset =
          standardButtonElement.getBoundingClientRect().left;
        await animate(
          typeScope.current,
          { x: matrixSizeXOffset - standardButtonXOffset },
          { delay: 1, duration: 1, ease: "easeInOut" },
        );
        await animate(
          typeScope.current,
          { y: -100 },
          { duration: 1, ease: "easeInOut" },
        );
        await animate(
          ".strassenType",
          { y: -100 },
          { duration: 0.8, ease: "easeInOut" },
        );
        animate(
          ".typeUnderline",
          { opacity: 0 },
          { duration: 0.5, ease: "easeInOut" },
        );
      };
      typeHeaderAnimation();
    }
  }, [typeScope, animate, started]);

  return (
    <div ref={typeScope} className="flex justify-center  gap-[90px]">
      <div
        onClick={() => {
          if (multiplicationType !== "standard") {
            setMultiplicationType("standard");
          }
        }}
        id="standardButtonHeader"
        className={`standardType flex items-center gap-[20px]
          ${multiplicationType === "standard" ? "cursor-default" : "cursor-pointer"} 
      `}
      >
        <img src={smallBracket} alt="" />
        <h3 className="relative text-[60px] tracking-[-0.05em]">
          STANDARD
          <span
            className={`typeUnderline absolute bottom-0 left-[6px] h-[2px] w-[96%]
          bg-white
          ${multiplicationType === "standard" ? "visible" : "invisible"} 
          `}
          ></span>
        </h3>
        <img className="rotate-180" src={smallBracket} alt="" />
      </div>
      <div
        onClick={() => {}}
        className={`strassenType flex items-center gap-[20px]
          ${multiplicationType === "strassen" ? "cursor-default" : "cursor-pointer"} 
      
      `}
      >
        <img src={smallBracket} alt="" />
        <h3 className="relative text-[60px] tracking-[-0.05em]">
          STRASSEN
          <span
            className={`typeUnderline absolute bottom-0 left-[6px] h-[2px] w-[96%]
        bg-white
          ${multiplicationType === "strassen" ? "visible" : "invisible"} 
           `}
          ></span>
        </h3>
        <img className="rotate-180" src={smallBracket} alt="" />
      </div>
    </div>
  );
}

function FastForwardButton({speed}) {
  const {fastForwardSpeed,setFastForwardSpeed} = useFastForwardSpeed((state)=>state)
  
  return (
    <button
      onClick={()=>{
        if(speed === fastForwardSpeed){
          setFastForwardSpeed(1)
          return
        }
        setFastForwardSpeed(speed)

      }}
      className={`flex h-[50px] w-[70px] cursor-pointer
            flex-col items-center justify-center 
            ${speed === fastForwardSpeed?'bg-white text-black':
              'border border-solid border-white text-white'}
             text-[40px] tracking-[-0.1em] `}
    >
      {speed}x
    </button>
  );
}
