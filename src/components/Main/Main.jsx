import { useEffect, useState } from "react"
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
      <StartButton matrix1Pos={matrix1Pos} matrix2Pos={matrix2Pos} />
    </main>
  )
}

function StartButton({ matrix1Pos, matrix2Pos }) {
  const setStarted = useStartedStore((state) => state.setStarted)
  const [isEnabled, setIsEnabled] = useState(true)
  useEffect(() => {
    if (matrix1Pos.row === '' || matrix1Pos.col === ''
      || matrix2Pos.row === '' || matrix2Pos.col === '') {
      setIsEnabled(false)
      return
    }

    if (matrix1Pos.row !== matrix2Pos.col) {
      setIsEnabled(false)
      return
    }
    setIsEnabled(true)
  }, [matrix1Pos, matrix2Pos, setIsEnabled])

  return (
    <button
      onClick={() => {
        setStarted(true)
      }}
      disabled={!isEnabled}
      className={`text-[64px] w-[250px] h-[74px] flex 
    justify-center items-center tracking-[-0.05em] 
    ${isEnabled?'cursor-pointer':'opacity-50 cursor-default'}
    border border-white`}>START</button>
  )
}