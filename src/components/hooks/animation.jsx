import { useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getMatrixArray, getMatrixArrayAttributesAndContainer } from "../../utils/array";
import { standardMultiplication } from "../../utils/multiplication";
import { delayInMs } from "../../utils/time";
import { createPortal } from "react-dom";

export function useStartButtonAnimation(started) {
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
      animateStartButton();
    }
  });
  return startButtonScope

}


export function useStandardMatrixAnimation(started, multMatrixScope) {
  const [outputMatrixScope, animateOutput] = useAnimate(null)
  const [matrixPositioned,setMatrixPositioned] = useState(false)
  const invisibleSpanRef = useRef([])
  function animateMatrixNumbers(result, steps) {
    console.log(steps)
    const matrix1 = document.getElementById('matrix1')
    const matrix2 = document.getElementById('matrix2')
    const NumberSpan = () => {
      return createPortal(<span className="relative left-0 top-0 leading-none 
            aspect-square w-[50px] text-center bg-red-200"></span>)
    }

  }

  useEffect(() => {
    if (started === true && matrixPositioned === false) {
      function makeInvisibleSpanRef(){
        const matrix1AttributeAndContainer = getMatrixArrayAttributesAndContainer('matrix1')
        const matrix2AttributeAndContainer = getMatrixArrayAttributesAndContainer('matrix2')
        matrix1AttributeAndContainer.forEach((attribute)=>{
          invisibleSpanRef.current.push({data:attribute})
        })
        matrix2AttributeAndContainer.forEach((attribute)=>{
          invisibleSpanRef.current.push({data:attribute})
        })
      }
      const fadeOutOutputMatrix = async () => {

        await delayInMs(5000)
        const multMatrixesOffset = multMatrixScope.current.getBoundingClientRect()
        outputMatrixScope.current.classList.remove('invisible')
        const outputMatrixPositionWithMargin = multMatrixesOffset.left + multMatrixesOffset.width + 100
        outputMatrixScope.current.style.left = `${outputMatrixPositionWithMargin}px`
        outputMatrixScope.current.style.top = `${multMatrixesOffset.top}px`
        await animateOutput(outputMatrixScope.current, { opacity: 1 }, { duration: 1, ease: 'easeInOut' })
        console.log(invisibleSpanRef.current )
        const matrix1 = getMatrixArray('matrix1')
        const matrix2 = getMatrixArray('matrix2')
        makeInvisibleSpanRef()
        setMatrixPositioned(true)
        const { result, steps } = standardMultiplication(matrix1, matrix2)
        animateMatrixNumbers(result,steps)
      }
      fadeOutOutputMatrix()

    }else if(matrixPositioned === true){

    }
  }, [started, animateOutput, outputMatrixScope, multMatrixScope,matrixPositioned]);


  return ({ outputMatrixScope,invisibleSpanRef,matrixPositioned })

}

export function useHeaderAnimation(started) {
  const [multMatrixScope, animate] = useAnimate(null);
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

  return multMatrixScope
}
