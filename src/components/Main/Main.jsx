import { useEffect, useState } from "react";
import DimensionInput from "./DimensionInput";
import Matrix from "./Matrix";
import multiplicationSymbol from "@images/multiplicationSymbol.svg";
import { useStartedStore } from "../../utils/store";
import { useAnimate } from "motion/react";
import equalSymbol from '@images/equalSymbol.svg'
import { delayInMs } from "../../utils/time";
import { standardMultiplication } from "../../utils/multiplication";
import { getMatrixArray } from "../../utils/array";
import { useStartButtonMatrixValidation } from "../hooks/validation";
import { useHeaderAnimation, useStandardMatrixAnimation, useStartButtonAnimation } from "../hooks/animation";


export default function Main() {
  const [matrix1Pos, setMatrix1Pos] = useState({ row: "3", col: "2" });
  const [matrix2Pos, setMatrix2Pos] = useState({ row: "2", col: "3" });
  const started = useStartedStore((state) => state.started);
  const multMatrixScope = useHeaderAnimation(started)
  const {outputMatrixScope} = useStandardMatrixAnimation(started,multMatrixScope)


  return (
    <main className="flex flex-col items-center gap-[45px]">
      <div
        ref={multMatrixScope}
        className="flex justify-center items-center gap-[50px] mt-[40px]"
      >
        <div className="flex flex-col gap-[30px]">
          <div className="w-[360px] h-[300px] flex flex-col justify-center items-center">
            <Matrix row={matrix1Pos.row} column={matrix1Pos.col} id={'matrix1'}></Matrix>
          </div>
          <DimensionInput matrixPos={matrix1Pos} setMatrixPos={setMatrix1Pos} />
        </div>
        <img src={multiplicationSymbol} className="mb-[66px]" alt="" />
        <div className="flex flex-col gap-[30px]">
          <div className="w-[360px] h-[300px] flex flex-col justify-center items-center">
            <Matrix row={matrix2Pos.row} column={matrix2Pos.col} id={'matrix2'}></Matrix>
          </div>
          <DimensionInput matrixPos={matrix2Pos} setMatrixPos={setMatrix2Pos} />
        </div>
      </div>
      <StartButton matrix1Pos={matrix1Pos} matrix2Pos={matrix2Pos} />
      <div
        ref={outputMatrixScope}
        className="absolute flex gap-[100px] opacity-0 invisible">
        <img src={equalSymbol}>

        </img>
        <div
          className="w-[360px] h-[300px] flex flex-col justify-center items-center
       ">
          <Matrix row={matrix1Pos.row} column={matrix2Pos.col}
            matrixOutput={true}></Matrix>
        </div>

      </div>
    </main>
  );
}

function StartButton({ matrix1Pos, matrix2Pos }) {
  const { isEnabled, started, handleStart } = 
  useStartButtonMatrixValidation(matrix1Pos, matrix2Pos)
  const startButtonScope = useStartButtonAnimation(started)

  return (
    <button
      ref={startButtonScope}
      onClick={() => {
        handleStart()
      }}
      disabled={!isEnabled}
      className={`text-[64px] w-[250px] h-[74px] flex 
    justify-center items-center tracking-[-0.05em] 
    ${isEnabled && !started ? "cursor-pointer" : "opacity-50 cursor-default"}
    border border-white`}
    >
      START
    </button>
  );
}
