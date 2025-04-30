import { useEffect,  } from "react";
import { useMatrixSizeStore, useMultiplicationType, useStartedStore } from "../../utils/store";
import { useAnimate } from "motion/react";
import { validateMatrixInput } from "../../utils/element";

export default function DimensionInput({ matrixPos, setMatrixPos }) {
  const started = useStartedStore((state) => state.started);
  const [scope, animate] = useAnimate(null);
  const matrixSize = useMatrixSizeStore((state)=>state.matrixSize)
  const multiplicationType = useMultiplicationType((state)=>state.multiplicationType)
  useEffect(()=>{
    if(started === true && matrixSize === 'small'){
      const inputs = Array.from(scope.current.getElementsByTagName('input'))
      inputs.forEach((input)=>{
        input.disabled = true;
      })
      const animateDimension = async()=>{
        await animate(scope.current,{opacity:0},{duration:0.5,ease:'easeInOut'})
        scope.current.classList.add('invisible')
      } 
      animateDimension()
    }
  })

  return (
    <div
    ref={scope}
     className="flex justify-center items-center gap-[30px]">
      <input
        onInput={(e) => {
          const { value } = e.target;
          const newValue = validateMatrixInput(matrixSize,multiplicationType,value)
          setMatrixPos({ ...matrixPos, row: newValue });
        }}
        value={matrixPos.row}
        className={`${matrixSize === 'small'?'w-[30px] h-[34px]':'w-[200px] h-[75px] text-[84px] pt-[5px]'} border-b-[2px] border-white text-center`}
        type="text"
      />
      <span>x</span>
      <input

        onInput={(e) => {
          const { value } = e.target;
          const newValue = validateMatrixInput(matrixSize,multiplicationType,value)

          setMatrixPos({ ...matrixPos, col: newValue });
        }}
        value={matrixPos.col}
        className={`${matrixSize === 'small'?'w-[30px] h-[34px]':'w-[200px] h-[75px] text-[84px] pt-[5px]'} border-b-[2px] border-white text-center`}
        type="text"
      />
    </div>
  );
}
