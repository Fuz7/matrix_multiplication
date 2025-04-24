import { useState } from "react";
import DimensionInput from "./DimensionInput";
import Matrix from "./Matrix";
import multiplicationSymbol from "@images/multiplicationSymbol.svg";
import animatingMultSymbol from "@images/animatingMultSymbol.svg";
import { useStartedStore } from "../../utils/store";
import equalSymbol from "@images/equalSymbol.svg";
import { useStartButtonMatrixValidation } from "../hooks/validation";
import {
  useHeaderAnimation,
  useStandardMatrixAnimation,
  useStartButtonAnimation,
} from "../hooks/animation";
import { createPortal } from "react-dom";
import { InvisibleMatrixInputSpan, InvisibleProductSpan } from "./Animation";

export default function Main() {
  const [matrix1Pos, setMatrix1Pos] = useState({ row: "3", col: "2" });
  const [matrix2Pos, setMatrix2Pos] = useState({ row: "2", col: "3" });
  const started = useStartedStore((state) => state.started);
  const { multMatrixScope, animateMult } = useHeaderAnimation(started);
  const { outputMatrixScope, invisibleSpanRef, matrixPositioned } =
    useStandardMatrixAnimation(started, multMatrixScope, animateMult);
  const invisibleProducts = Array.from(
    { length: Number.parseInt(matrix1Pos.col) },
    (_, i) => i + 1,
  );

  return (
    <main className="flex flex-col items-center gap-[45px]">
      <div
        ref={multMatrixScope}
        className="mt-[40px] flex items-center justify-center gap-[50px]"
      >
        <div className="flex flex-col gap-[30px]">
          <div className="flex h-[300px] w-[360px] flex-col items-center justify-center">
            <Matrix
              row={matrix1Pos.row}
              column={matrix1Pos.col}
              id={"matrix1"}
            ></Matrix>
          </div>
          <DimensionInput matrixPos={matrix1Pos} setMatrixPos={setMatrix1Pos} />
        </div>
        <div className="relative">
          <img
            id="multiplicationSymbol"
            src={multiplicationSymbol}
            className="mb-[66px]"
            alt=""
          />
          <div
             id="animatingMultSymbol"
           className="w-[50px] aspect-square absolute top-[-200px] left-1/2 -translate-x-1/2
           flex justify-center items-center opacity-0">
          <img
            className="w-[16px]"
            src={animatingMultSymbol}
            alt=""
          />
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex h-[300px] w-[360px] flex-col items-center justify-center">
            <Matrix
              row={matrix2Pos.row}
              column={matrix2Pos.col}
              id={"matrix2"}
            ></Matrix>
          </div>
          <DimensionInput matrixPos={matrix2Pos} setMatrixPos={setMatrix2Pos} />
        </div>
      </div>
      <StartButton matrix1Pos={matrix1Pos} matrix2Pos={matrix2Pos} />
      <div
        ref={outputMatrixScope}
        className="invisible absolute flex gap-[100px] opacity-0"
      >
        <img src={equalSymbol}></img>
        <div
          className="flex h-[300px] w-[360px] flex-col items-center justify-center
       "
        >
          <Matrix
            row={matrix1Pos.row}
            column={matrix2Pos.col}
            matrixOutput={true}
          ></Matrix>
        </div>
      </div>
      {invisibleSpanRef.current.map((spanInfo) => {
        return createPortal(
          <InvisibleMatrixInputSpan {...spanInfo.data.attribute} />,
          spanInfo.data.parent,
        );
      })}
      {matrixPositioned &&
        invisibleProducts.map((order) => {
          return createPortal(
            <InvisibleProductSpan order={order} />,
            document.body,
          );
        })}
    </main>
  );
}

function StartButton({ matrix1Pos, matrix2Pos }) {
  const { isEnabled, started, handleStart } = useStartButtonMatrixValidation(
    matrix1Pos,
    matrix2Pos,
  );
  const startButtonScope = useStartButtonAnimation(started);

  return (
    <button
      ref={startButtonScope}
      onClick={() => {
        handleStart();
      }}
      disabled={!isEnabled}
      className={`flex h-[74px] w-[250px] items-center 
    justify-center text-[64px] tracking-[-0.05em] 
    ${isEnabled && !started ? "cursor-pointer" : "cursor-default opacity-50"}
    border border-white`}
    >
      START
    </button>
  );
}
