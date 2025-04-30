import { useEffect, useRef, useState } from "react";
import DimensionInput from "./DimensionInput";
import largeXSymbol from "@images/largeXSymbol.svg";
import { useStartedStore } from "../../utils/store";
import { useLargeStartButtonMatrixValidation } from "../hooks/validation";
import { motion } from "motion/react";
import { createMatrix } from "../../utils/matrix";
import { useHeaderAnimation } from "../hooks/animation";
export default function LargeMatrix({ inputMatrixes }) {
  const largeMatrixRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      largeMatrixRef.current.style.visibility = "visible";
    }, 50);
  }, [largeMatrixRef]);

  const {
    largeMatrix1Pos,
    setLargeMatrix1Pos,
    largeMatrix2Pos,
    setLargeMatrix2Pos,
  } = inputMatrixes;

  return (
    <main
      ref={largeMatrixRef}
      style={{
        visibility: "hidden",
      }}
      className="flex min-h-[calc(100vh-204px)] min-w-[100%] flex-col 
    items-center justify-between"
    >
      <div></div>
      <div className="mb-[0px] flex gap-[150px]">
        <DimensionInput
          matrixPos={largeMatrix1Pos}
          setMatrixPos={setLargeMatrix1Pos}
        />
        <img src={largeXSymbol} alt="" />
        <DimensionInput
          matrixPos={largeMatrix2Pos}
          setMatrixPos={setLargeMatrix2Pos}
        />
      </div>
      <div className="flex flex-col items-center gap-[40px]">
        <ProcessingText />
        <StartButton
          matrix1Pos={largeMatrix1Pos}
          matrix2Pos={largeMatrix2Pos}
        />
      </div>
    </main>
  );
}

function StartButton({ matrix1Pos, matrix2Pos }) {
  const { isEnabled, started, handleStart } =
    useLargeStartButtonMatrixValidation(matrix1Pos, matrix2Pos);
  useHeaderAnimation(started)
  return (
    <button
      onClick={() => {
        handleStart()
        console.log(createMatrix(
          Number.parseInt(matrix1Pos.row),Number.parseInt(matrix1Pos.col)))
      }}
      disabled={!isEnabled}
      className={`mb-[100px] flex h-[74px] w-[250px] 
    items-center justify-center text-[64px] tracking-[-0.05em]
    ${isEnabled && !started ? "cursor-pointer" : "cursor-default opacity-50"}
    border border-white`}
    >
      START
    </button>
  );
}

function ProcessingText() {
  const dotCountArray = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="flex text-[64px] tracking-[-0.07em]">
      <div>PROCESSING</div>
      {dotCountArray.map((_, i) => {
        return (
          <motion.div
            key={i+"dot"}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="ml-[5px]"
          >
            .
          </motion.div>
        );
      })}
    </div>
  );
}
