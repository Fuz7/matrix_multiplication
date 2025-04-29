import { createPortal } from "react-dom";
import Matrix from "./Matrix";
import {
  useFastForwardSpeed,
  useIsMultiplicationFinished,
  useIsResultButtonVisible,
  useIsSkipped,
  useResultExecutionTime,
  useResultMatrixSize,
  useStandardKey,
  useStartedStore,
} from "../../utils/store";
import { useEffect, useState } from "react";

export default function StandardResult({ row, col }) {

  const resultMatrixSize = useResultMatrixSize((state)=>state.resultMatrixSize)
  const resultExecutionTime = useResultExecutionTime((state)=>state.resultExecutionTime)
  
  return (
    <div className="flex flex-col min-w-[100%] gap-[100px]">
    <div className="flex min-w-[100%] gap-[150px] pt-[120px] pl-[300px]">
      <div className="h-fit">
        <Matrix
          row={row}
          column={col}
          id={"resultMatrix"}
          matrixOutput={true}
        />
      </div>
    
      <div className="flex flex-col gap-[50px]">
        <h2 className="text-[50px] leading-none tracking-[-0.08em] ">
          RESULTS
        </h2>
        <div className="flex flex-col gap-[30px]">
          <div className="flex gap-[70px]">
            <h3 className="w-[260px] text-[35px] leading-none tracking-[-0.06em]">
              MATRIX SIZE:
            </h3>
            <div className="relative flex w-[190px] justify-end">
              <div
              id="resultMatrixSize"
               className="tracking-tight">{resultMatrixSize}</div>
              <span className="absolute bottom-[-4px] h-[2px] w-full bg-white"></span>
            </div>
          </div>
          <div className="flex gap-[70px]">
            <h3 className="max-w-[260px] text-[35px] leading-none tracking-[-0.06em]">
              ALGORITHM EXECUTION TIME:
            </h3>
            <div className="relative flex w-[190px] items-end justify-end">
              <div 
              id="resultMatrixExecutionTime"
              className="text-right tracking-tight">{resultExecutionTime}ms</div>
              <span className="absolute bottom-[-4px] h-[2px] w-full bg-white"></span>
            </div>
          </div>
        </div>
      </div>
      {createPortal(<ResultButton />, document.body)}
    </div>
    <DoneButton />
    </div>
  );
}

function DoneButton(){
  
  const [isButtonVisible,setIsButtonVisible] = useState(false)
  const isMultiplicationFinished = useIsMultiplicationFinished(
    (state) => state.isMultiplicationFinished,
  );
  const setIsMultiplicationFinished = useIsMultiplicationFinished(
    (state) => state.setIsMultiplicationFinished,
  );
  const setStandardKey = useStandardKey((state)=>state.setStandardKey)
  const setStarted = useStartedStore((state)=>state.setStarted)

  useEffect(()=>{
    if(isMultiplicationFinished){
      setTimeout(() => {
        setIsButtonVisible(true)
      }, 3000);
    }
  },[isMultiplicationFinished])
  

  return (
    <button
      onClick={()=>{
        setIsButtonVisible(false)
        setIsMultiplicationFinished(false)
        setStarted(false)
        setStandardKey((key)=>key+1)
      }}
      className={`h-[74px] w-[250px] text-[64px] font-smt
        self-center ${isButtonVisible?'visible':'invisible'}
        flex cursor-pointer items-center justify-center
         border border-solid border-white tracking-[-0.07em]
    text-white`}>DONE</button>

  )
}

function ResultButton() {
  const {isResultVisible,setIsResultVisible} = useIsResultButtonVisible(
    (state) => state,
  );
  const setIsMultiplicationFinished = useIsMultiplicationFinished(
    (state) => state.setIsMultiplicationFinished,
  );
  const setFastForwardSpeed = useFastForwardSpeed((state)=>state.setFastForwardSpeed)
  const setIsSkipped = useIsSkipped((state)=>state.setIsSkipped)

  return (
    <div
      onClick={()=>{
        setIsMultiplicationFinished(true)
        setIsResultVisible(false)
        setFastForwardSpeed(1)
        setIsSkipped(false)
      }}
      className={`h-[74px] w-[250px] text-[64px] font-smt
        ${isResultVisible ? "visible" : "invisible"} fixed bottom-[50px] 
        left-1/2 flex -translate-x-1/2 cursor-pointer items-center justify-center
        self-end border border-solid border-white tracking-[-0.07em]
    text-white`}
    >
      RESULT
    </div>
  );
}

