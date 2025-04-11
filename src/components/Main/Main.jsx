import { useState } from "react"
import DimensionInput from "./DimensionInput"
import Matrix from "./Matrix"
import multiplicationSymbol from '@images/multiplicationSymbol.svg'
import { useStartedStore } from "../../utils/store"

export default function Main() {

  const [matrix1Pos, setMatrix1Pos] = useState({ row: '2', col: '1' })
  const [matrix2Pos, setMatrix2Pos] = useState({ row: '1', col: '2' })


  return (
    <main className="flex flex-col items-center gap-[45px]">
    <div className="flex justify-center items-center gap-[50px] mt-[40px]">
      <div className="flex flex-col gap-[30px]">
        <div className="w-[360px] h-[300px] flex flex-col justify-center items-center">
          <Matrix row={matrix1Pos.row} column={matrix1Pos.col}></Matrix>
        </div>
        <DimensionInput matrixPos={matrix1Pos} setMatrixPos={setMatrix1Pos} />
      </div>
      <img src={multiplicationSymbol} className="mb-[66px]" alt="" />
      <div className="flex flex-col gap-[30px]">
        <div className="w-[360px] h-[300px] flex flex-col justify-center items-center">
          <Matrix row={matrix2Pos.row} column={matrix2Pos.col}></Matrix>
        </div>
        <DimensionInput matrixPos={matrix2Pos} setMatrixPos={setMatrix2Pos} />
      </div>
    </div>
    <StartButton />
    </main>
  )
}

function StartButton(){
  const setStarted = useStartedStore((state)=>state.setStarted)

  return (
    <button 
    onClick={()=>{
      setStarted(true)
    }}
    className="text-[64px] w-[250px] h-[74px] flex 
    justify-center items-center tracking-[-0.05em] cursor-pointer
    border border-white">START</button>
  )
}