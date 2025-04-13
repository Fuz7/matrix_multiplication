import { useEffect, useState } from "react"
import DimensionInput from "./DimensionInput"
import Matrix from "./Matrix"
import multiplicationSymbol from '@images/multiplicationSymbol.svg'
import { useStartedStore } from "../../utils/store"
import { useAnimate } from "motion/react"

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
  const {started,setStarted} = useStartedStore((state) => state)
  const [isEnabled, setIsEnabled] = useState(true)
  const [startButtonScope,animate] = useAnimate(null)

  useEffect(()=>{
    if(started === true){
      const animateStartButton = async() => {
        await animate(startButtonScope.current,{opacity:0},{duration:0.5,ease:'easeInOut'})
        startButtonScope.current.disabled = true
        startButtonScope.classList.add('invisible')
      }
      animateStartButton()
    }
  })

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

  function validateMatrixInput(){
    const inputs = Array.from(document.getElementsByClassName('matrixInput'))
    inputs.forEach((input)=> input.classList.remove("errorMatrixInput"))
    const missingInput = inputs.filter((input)=>input.value === '');
    if(missingInput.length === 0) return true
    missingInput.forEach((input)=> input.classList.add("errorMatrixInput"))
    console.log(missingInput)
  }


  return (
    <button
    ref={startButtonScope}
      onClick={() => {
        if(!validateMatrixInput()) return 
        setStarted(true)
      }}
      disabled={!isEnabled}
      className={`text-[64px] w-[250px] h-[74px] flex 
    justify-center items-center tracking-[-0.05em] 
    ${isEnabled && !started?'cursor-pointer':'opacity-50 cursor-default'}
    border border-white`}>START</button>
  )
}