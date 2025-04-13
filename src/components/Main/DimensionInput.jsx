import { useEffect, useState } from "react";
import { useStartedStore } from "../../utils/store";
import { useAnimate } from "motion/react";

export default function DimensionInput({ matrixPos, setMatrixPos }) {
  const started = useStartedStore((state) => state.started);
  const [scope, animate] = useAnimate(null);
  
  useEffect(()=>{
    if(started === true){
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
          const newValue =
            value === "" ? "" : value.replace(/[^1-4]/g, "").slice(0, 1); // keep only first digit 1–4 or empty

          setMatrixPos({ ...matrixPos, row: newValue });
        }}
        value={matrixPos.row}
        className="w-[30px] h-[34px] border-b-[2px] border-white text-center"
        type="text"
      />
      <span>x</span>
      <input

        onInput={(e) => {
          const { value } = e.target;
          const newValue =
            value === "" ? "" : value.replace(/[^1-4]/g, "").slice(0, 1); // keep only first digit 1–4 or empty

          setMatrixPos({ ...matrixPos, col: newValue });
        }}
        value={matrixPos.col}
        className="w-[30px] h-[34px] border-b-[2px] border-white text-center"
        type="text"
      />
    </div>
  );
}
