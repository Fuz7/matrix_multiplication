import { useAnimate } from "motion/react";
import { useEffect } from "react";
import { getMatrixArray } from "../../utils/array";
import { standardMultiplication } from "../../utils/multiplication";
import { delayInMs } from "../../utils/time";

export function useStartButtonAnimation(started){
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
      console.log(standardMultiplication(matrix1, matrix2))
    }
  });
  return startButtonScope

}


export function useStandardMatrixAnimation(started,multMatrixScope){
  const [outputMatrixScope, animateOutput] = useAnimate(null)


  useEffect(() => {
    if (started === true) {
      const fadeOutOutputMatrix = async () => {

        await delayInMs(5000)
        const multMatrixesOffset = multMatrixScope.current.getBoundingClientRect()
        outputMatrixScope.current.classList.remove('invisible')
        const outputMatrixPositionWithMargin = multMatrixesOffset.left + multMatrixesOffset.width + 100
        outputMatrixScope.current.style.left = `${outputMatrixPositionWithMargin}px`
        outputMatrixScope.current.style.top = `${multMatrixesOffset.top}px`
        await animateOutput(outputMatrixScope.current, { opacity: 1 }, { duration: 1, ease: 'easeInOut' })
      }
      fadeOutOutputMatrix()

    } 
  }, [started, animateOutput, outputMatrixScope, multMatrixScope]);


  return({outputMatrixScope})

}

export function useHeaderAnimation(started){
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
