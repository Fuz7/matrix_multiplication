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


export default function Main() {
  const [matrix1Pos, setMatrix1Pos] = useState({ row: "3", col: "2" });
  const [matrix2Pos, setMatrix2Pos] = useState({ row: "2", col: "3" });
  const started = useStartedStore((state) => state.started);
  const [multMatrixScope, animate] = useAnimate(null);
  const [outputMatrixScope, animateOutput] = useAnimate(null)

  useEffect(() => {
    if (started === true) {
      const matrixSizeElement = document.getElementById("matrixSizeHeader");
      const matrixSizeXOffset = matrixSizeElement.getBoundingClientRect().left;
      const multMatrixScopeXOffset = multMatrixScope.current.getBoundingClientRect().left

      animate(
        multMatrixScope.current,
        { x: matrixSizeXOffset - multMatrixScopeXOffset + 60, y: 150 },
        { duration: 0.7, ease: "easeOut", delay: 4 }
      );
    }
  }, [started, animate, multMatrixScope]);


  useEffect(() => {
    if (started === true) {
      const fadeOutOutputMatrix = async() =>{
        
        await delayInMs(5000)
        const multMatrixesOffset = multMatrixScope.current.getBoundingClientRect()
        outputMatrixScope.current.classList.remove('invisible')
        const outputMatrixPositionWithMargin = multMatrixesOffset.left + multMatrixesOffset.width + 100
        outputMatrixScope.current.style.left = `${outputMatrixPositionWithMargin}px`
        outputMatrixScope.current.style.top = `${multMatrixesOffset.top}px`
        await animateOutput(outputMatrixScope.current, { opacity: 1 }, { duration: 1, ease: 'easeInOut'})
      }
      fadeOutOutputMatrix()

    }
  }, [started, animateOutput, outputMatrixScope,multMatrixScope]);

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
        <img src={multiplicationSymbol} className="mb-[66px]" alt=""/>
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
  const { started, setStarted } = useStartedStore((state) => state);
  const [isEnabled, setIsEnabled] = useState(true);
  const [startButtonScope, animate] = useAnimate(null);

  useEffect(() => {
    if (started === true) {
      const animateStartButton = async () => {
        await animate(
          startButtonScope.current,
          { opacity: 0 },
          { duration: 0.5, ease: "easeInOut" }
        );
        startButtonScope.current.disabled = true;
        startButtonScope.current.
          classList.add("invisible");
      };
      const matrix1 = getMatrixArray('matrix1')
      const matrix2 = getMatrixArray('matrix2')
      animateStartButton();
      console.log(standardMultiplication(matrix1,matrix2))
    }
  });

  useEffect(() => {
    if (
      matrix1Pos.row === "" ||
      matrix1Pos.col === "" ||
      matrix2Pos.row === "" ||
      matrix2Pos.col === ""
    ) {
      setIsEnabled(false);
      return;
    }

    if (matrix1Pos.col !== matrix2Pos.row) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);
  }, [matrix1Pos, matrix2Pos, setIsEnabled]);

  function validateMatrixInput() {
    const inputs = Array.from(document.getElementsByClassName("matrixInput"));
    inputs.forEach((input) => input.classList.remove("errorMatrixInput"));
    const missingInput = inputs.filter((input) => input.value === "");
    if (missingInput.length === 0) return true;
    missingInput.forEach((input) => input.classList.add("errorMatrixInput"));
  }

  return (
    <button
      ref={startButtonScope}
      onClick={() => {
        if (!validateMatrixInput()) return;
        setStarted(true);
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
