import { useStartedStore } from "../../utils/store";
import DimensionInput from "./DimensionInput";
import Matrix from "./Matrix";
import multiplicationSymbol from "@images/multiplicationSymbol.svg";
import animatingMultSymbol from "@images/animatingMultSymbol.svg";
import equalSymbol from "@images/equalSymbol.svg";
import { useStartButtonMatrixValidation } from "../hooks/validation";
import {
  useHeaderAnimation,
  useStandardMatrixAnimation,
  useStartButtonAnimation,
} from "../hooks/animation";
import { createPortal } from "react-dom";
import {
  InvisibleMatrixInputSpan,
  InvisiblePlusSign,
  InvisibleProductSpan,
  InvisibleSumSpan,
} from "./Animation";

export default function SmallMatrix({ inputMatrixes }) {
  const { matrix1Pos, setMatrix1Pos, matrix2Pos, setMatrix2Pos } =
    inputMatrixes;
  const started = useStartedStore((state) => state.started);
  const { multMatrixScope, animateMult } = useHeaderAnimation(started);
  const { outputMatrixScope, invisibleSpanRef, matrixPositioned } =
    useStandardMatrixAnimation(started, multMatrixScope, animateMult);
  const invisibleProducts = Array.from(
    { length: Number.parseInt(matrix1Pos.col) },
    (_, i) => i + 1,
  );

  const invisiblePlusSign = Array.from(
    { length: Number.parseInt(matrix1Pos.col - 1) },
    (_, i) => i + 1,
  );
  return (
    <div 
    className="flex min-w-[100%] relative flex-col items-center gap-[45px]">
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
            style={{
              top: `-${160 + Number.parseInt(matrix1Pos.row) * 20}px`,
            }}
            className="absolute left-1/2 flex 
            aspect-square w-[50px] origin-center -translate-x-1/2
           items-center justify-center pb-[4px] opacity-0"
          >
            <img className="w-[16px]" src={animatingMultSymbol} alt="" />
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
      {matrixPositioned &&
        invisibleProducts.map((order) => {
          return createPortal(
            <InvisibleProductSpan order={order} />,
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
      {matrixPositioned && createPortal(<InvisibleSumSpan />, document.body)}
    </div>
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
