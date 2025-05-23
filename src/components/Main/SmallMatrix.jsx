import { useIsResultButtonVisible, useMultiplicationType, useStartedStore } from "../../utils/store";
import DimensionInput from "./DimensionInput";
import Matrix from "./Matrix";
import multiplicationSymbol from "@images/multiplicationSymbol.svg";
import animatingMultSymbol from "@images/animatingMultSymbol.svg";
import equalSymbol from "@images/equalSymbol.svg";
import { useSmallStartButtonMatrixValidation } from "../hooks/validation";
import {
  useHeaderAnimation,
  useSmallMatrixAnimation,
  useSmallStartButtonAnimation,
} from "../hooks/animation";
import { createPortal } from "react-dom";
import {
  InvisibleMatrixInputSpan,
  InvisibleMinusSign,
  InvisiblePartialOutput,
  InvisiblePlusSign,
  InvisibleProductSpan,
  InvisibleProductStrassenSpan,
  InvisibleSumSpan,
} from "./Animation";
import { useEffect } from "react";
import plusSign from "@images/plusSign.svg";

export default function SmallMatrix({ inputMatrixes }) {
  const {
    smallMatrix1Pos,
    setSmallMatrix1Pos,
    smallMatrix2Pos,
    setSmallMatrix2Pos,
  } = inputMatrixes;
  const { multMatrixScope, animateMult } = useHeaderAnimation();
  const { outputMatrixScope, invisibleSpanRef, matrixPositioned } =
    useSmallMatrixAnimation(multMatrixScope, animateMult);
  const isResultVisible = useIsResultButtonVisible((state)=>state.isResultVisible)
  const invisibleProducts = Array.from(
    { length: Number.parseInt(smallMatrix1Pos.col) },
    (_, i) => i + 1,
  );
  const invisibleStrassenProducts = Array.from({ length: 7 }, (_, i) => i + 1);
  const multiplicationType = useMultiplicationType(
    (state) => state.multiplicationType,
  );

  const invisiblePlusSign = Array.from(
    { length: Number.parseInt(smallMatrix1Pos.col) },
    (_, i) => i + 1,
  );

  useEffect(() => {
    setTimeout(() => {
      multMatrixScope.current.style.visibility = "visible";
    }, 50);
  }, [multMatrixScope]);
  
  return (
    <div className="relative flex min-w-[100%] flex-col items-center gap-[45px]">
      <div
        style={{
          visibility: "hidden",
        }}
        ref={multMatrixScope}
        className="relative mt-[40px] flex items-center justify-center gap-[50px]"
      >
        <div className="flex flex-col gap-[30px]">
          <div
            className="relative flex h-[300px] w-[360px] 
          flex-col items-center justify-center"
          >
            <Matrix
              row={smallMatrix1Pos.row}
              column={smallMatrix1Pos.col}
              id={"matrix1"}
            ></Matrix>
          </div>
          <DimensionInput
            matrixPos={smallMatrix1Pos}
            setMatrixPos={setSmallMatrix1Pos}
          />
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
            style={{
              top: `-${
                multiplicationType === "standard"
                  ? 160 + Number.parseInt(smallMatrix1Pos.row) * 20
                  : "132"
              }px`,
            }}
            className="absolute left-1/2 flex 
            aspect-square w-[50px] origin-center -translate-x-1/2
           items-center justify-center pb-[4px] opacity-0"
          >
            <img className="w-[16px] origin-center" src={animatingMultSymbol} alt="" />
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex h-[300px] w-[360px] flex-col items-center justify-center">
            <Matrix
              row={smallMatrix2Pos.row}
              column={smallMatrix2Pos.col}
              id={"matrix2"}
            ></Matrix>
          </div>
          <DimensionInput
            matrixPos={smallMatrix2Pos}
            setMatrixPos={setSmallMatrix2Pos}
          />
        </div>
      </div>
      <StartButton matrix1Pos={smallMatrix1Pos} matrix2Pos={smallMatrix2Pos} />
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
            row={smallMatrix1Pos.row}
            column={smallMatrix2Pos.col}
            id={"outputMatrix"}
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
      {matrixPositioned && multiplicationType === "standard"
        ? invisibleProducts.map((order) => {
            return createPortal(
              <InvisibleProductSpan order={order} />,
              document.body,
            );
          })
        : isResultVisible === false && 
        invisibleStrassenProducts.map((order) => {
            return createPortal(
              <InvisibleProductStrassenSpan order={order} />,
              document.body,
            );
          })}
      {matrixPositioned &&
        invisiblePlusSign.map((order) => {
          return createPortal(
            <InvisiblePlusSign order={order} />,
            document.body,
          );
        })}
      {matrixPositioned &&
        multiplicationType === "strassen" &&
        invisiblePlusSign.map((order) => {
          return createPortal(
            <InvisibleMinusSign order={order} />,
            document.body,
          );
        })}
      
      {matrixPositioned &&
        multiplicationType === "strassen" &&
        invisibleProducts.map((order)=>{
          return createPortal(
            <InvisiblePartialOutput order={order} />,
            document.body
          )
        })
      }
      {matrixPositioned && createPortal(<InvisibleSumSpan />, document.body)}
    </div>
  );
}

function StartButton({ matrix1Pos, matrix2Pos }) {
  const { isEnabled, started, handleStart } =
    useSmallStartButtonMatrixValidation(matrix1Pos, matrix2Pos);
  const startButtonScope = useSmallStartButtonAnimation(started);

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
