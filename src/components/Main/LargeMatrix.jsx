import { useEffect, useRef } from "react";
import DimensionInput from "./DimensionInput";
import largeXSymbol from "@images/largeXSymbol.svg";
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
      <div className="mb-[204px] flex gap-[150px]">
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
      <div></div>
    </main>
  );
}
