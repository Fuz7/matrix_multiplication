import { useEffect, useRef, useState } from "react";
import DimensionInput from "./DimensionInput";
import largeXSymbol from "@images/largeXSymbol.svg";
import { useStartedStore } from "../../utils/store";
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
      <div className="mb-[104px] flex gap-[150px]">
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
      <StartButton matrix1Pos={largeMatrix1Pos} matrix2Pos={largeMatrix2Pos} />
    </main>
  );
}

function StartButton({ matrix1Pos, matrix2Pos }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const { started, setStarted } = useStartedStore((state) => state);

  useEffect(()=>{
    if(matrix1Pos.col !== matrix2Pos.row){
      setIsEnabled(false)
      return
    }
    setIsEnabled(true)
  },[matrix1Pos,matrix2Pos,setIsEnabled])

  return (
    <button
      onClick={() => {
      }}
      disabled={!isEnabled}
      className={`flex h-[74px] w-[250px] items-center 
    justify-center text-[64px] tracking-[-0.05em] mb-[100px]
    ${isEnabled && !started ? "cursor-pointer" : "cursor-default opacity-50"}
    border border-white`}
    >
      START
    </button>
  );
}