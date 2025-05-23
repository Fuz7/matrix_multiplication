import React,{ useEffect, useRef, useState } from "react"
import { useStartedStore } from "../../utils/store"

export default function Matrix({row,column,matrixOutput = false,id}) {
  const [rowDisplay,setRowDisplay] = useState(row)
  const [columnDisplay,setColumnDisplay] = useState(column)
  useEffect(()=>{
    if(row !== ''){
      setRowDisplay(row)
    }
    if(column !== ''){
      setColumnDisplay(column)
    }
    
    
  },[row,column])


  
  return (
    <div id={id}
     data-row={row}
     data-col={column}
     className={`flex items-center gap-[10px]`}>
      <LeftBracket rowSize={rowDisplay} />
      <MatrixInputs rowSize={rowDisplay} colSize={columnDisplay} matrixOutput={matrixOutput} />
      <RightBracket rowSize={rowDisplay} />
    </div>
  )

}

function LeftBracket({ rowSize }) {
  const rowHeight = {
    1: "h-[90px]",
    2: 'h-[160px]',
    3: 'h-[230px]',
    4: 'h-[300px]'
  }

  const containerHeight = rowHeight[rowSize]


  return (
    <div className={`${containerHeight} w-[40px] relative `}>
      <div className="absolute left-0 h-full bg-matrixBracket w-[10px]"></div>
      <div className="absolute top-0 left-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
      <div className="absolute bottom-0 left-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
    </div>
  )
}

function RightBracket({ rowSize }) {
  const rowHeight = {
    1: "h-[90px]",
    2: 'h-[160px]',
    3: 'h-[230px]',
    4: 'h-[300px]'
  }

  const containerHeight = rowHeight[rowSize]


  return (
    <div className={`${containerHeight} w-[40px] relative `}>
      <div className="absolute right-0 h-full bg-matrixBracket w-[10px]"></div>
      <div className="absolute top-0 right-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
      <div className="absolute bottom-0 right-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
    </div>
  )
}

const MatrixInputs = React.memo(function MatrixInputs({ rowSize, colSize,matrixOutput = false }) {
  const numberOfInputs = rowSize * colSize
  const [inputsData, setInputsData] = useState(Array.from({ length: numberOfInputs }, () => '3'))
  // const [inputsData, setInputsData] = useState(Array.from({ length: numberOfInputs }, () => '3'))
  const inputsArray = Array.from({ length: numberOfInputs }, (_,i) => {
    return{row:Math.floor(i/colSize),col:i%colSize}
  });
  const started = useStartedStore((state) => state.started);
  const inputsContainerRef = useRef()
  useEffect(()=>{
    setInputsData(Array.from({ length: numberOfInputs }, () => ''))

    // setInputsData(Array.from({ length: numberOfInputs }, () => '3'))
    const inputs = Array.from(inputsContainerRef.current.getElementsByClassName("matrixInput"));
    inputs.forEach((input) => input.classList.remove("errorMatrixInput"));

  },[numberOfInputs])

  return (
    <div className={`grid gap-[20px]`}
    ref={inputsContainerRef}
      style={{
        gridTemplateColumns: `repeat(${colSize},50px)`,
      }}
    >
      {inputsArray.map((matrixPos, index) => {
        return (
          <div
            key={"container" + index}
           className="inputContainer relative">
          
          <input
            disabled={started || matrixOutput}
            onInput={(e) => {
              const { value } = e.target
              let newValue = value.replace(/[^0-9]/g, '');
              if (newValue.length > 1) {
                newValue = newValue[0]
              }
              if(newValue !== ''){
                e.target.classList.remove('errorMatrixInput')
              }
              setInputsData([...inputsData.slice(0, index), newValue, ...inputsData.slice(index + 1)])
            }}
            data-row={matrixPos.row}
            data-col={matrixPos.col }
            value={inputsData[index] ?? ''}
            key={"matrix" + index} className={`bg-matrixInputBackground  leading-none
          w-[50px] aspect-square text-center ${!matrixOutput&&'matrixInput'} `}></input>
          </div>
        )
      })}
    </div>
  )
  
})
