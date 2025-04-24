import { useAnimate } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMatrixArray,
  getMatrixArrayAttributesAndContainer,
} from "../../utils/array";
import { standardMultiplication } from "../../utils/multiplication";
import { delayInMs } from "../../utils/time";
import { createPortal } from "react-dom";
import { getMatrixSpan } from "../../utils/element";
import { animate } from "motion";

export function useStartButtonAnimation(started) {
  const [startButtonScope, animate] = useAnimate(null);

  useEffect(() => {
    if (started === true) {
      const animateStartButton = async () => {
        await animate(
          startButtonScope.current,
          { opacity: 0 },
          { duration: 0.5, ease: "easeInOut" },
        );
        startButtonScope.current.disabled = true;
        startButtonScope.current.classList.add("invisible");
      };
      animateStartButton();
    }
  });
  return startButtonScope;
}

export function useStandardMatrixAnimation(started, multMatrixScope,animateMult) {
  const [outputMatrixScope, animateOutput] = useAnimate(null);
  const [matrixPositioned, setMatrixPositioned] = useState(false);
  const invisibleSpanRef = useRef([]);
  const animateMatrixNumbers = useCallback(async(result, steps) => {
    const matrix1 = document.getElementById("matrix1");
    const matrix2 = document.getElementById("matrix2");
    const animatingMultSymbol = document.getElementById('animatingMultSymbol')
    
    console.log(steps);
    let orderNumber = 1;
    for (const step of steps) {
      if (step.type === "multiply") {
        const matrix1Span = getMatrixSpan(matrix1, step.a);
        const matrix2Span = getMatrixSpan(matrix2, step.b);
        const matrix1SpanDimension = matrix1Span.getBoundingClientRect()
        const matrix2SpanDimension = matrix2Span.getBoundingClientRect()
        const multSymbolDimension = animatingMultSymbol.getBoundingClientRect()
        const order = document.querySelector(`div[data-order="${orderNumber}"]`)
        const orderSpan = order.getElementsByTagName('span')[0]
        const orderDimension = order.getBoundingClientRect()
        orderSpan.textContent = step.value
        const matrix1XPos = multSymbolDimension.x - matrix1SpanDimension.x - 35
        const matrix1YPos = multSymbolDimension.y - matrix1SpanDimension.y
        const matrix2XPos = multSymbolDimension.x - matrix2SpanDimension.x + 35 
        const matrix2YPos = multSymbolDimension.y - matrix2SpanDimension.y
        const orderXPos = multSymbolDimension.x - orderDimension.x
        const orderYPos = multSymbolDimension.y - orderDimension.y
        console.log(orderDimension)
        animate(order,{y:orderYPos},{duration:0.9,ease:'easeOut'})
        animate(order,{x:orderXPos,y:orderYPos},{duration:0.45,ease:'easeOut'})
        // console.log(multSymbolDimension)
        // console.log(matrix1SpanDimension)
        animateMult(matrix1Span,{y:matrix1YPos},{duration:0.5})
        await animateMult(matrix2Span,{y:matrix2YPos},{duration:0.5})
        animateMult(matrix1Span,{x:matrix1XPos},{duration:0.5})
        animateMult(matrix2Span,{x:matrix2XPos},{duration:0.5})
        await animateMult(animatingMultSymbol,{opacity:1},{duration:1})
        await delayInMs(1)
        animateMult(animatingMultSymbol,{opacity:0,scale:0},{duration:1})
        animateMult(matrix1Span,{x:matrix1XPos+45,scale:0,opacity:0},{duration:0.8,ease:'easeOut'})
        animateMult(matrix2Span,{x:matrix2XPos-45,scale:0,opacity:0},{duration:0.8,ease:'easeOut'})
        animate(orderSpan,{scale:1},{duration:0.2,delay:0.6,ease:'easeOut'})
        return
      }
      if(step.type === 'add'){

      }
    }
  },[animateMult])

  useEffect(() => {
    if (started === true && matrixPositioned === false) {
      function makeInvisibleSpanRef() {
        const matrix1AttributeAndContainer =
          getMatrixArrayAttributesAndContainer("matrix1");
        const matrix2AttributeAndContainer =
          getMatrixArrayAttributesAndContainer("matrix2");
        matrix1AttributeAndContainer.forEach((attribute) => {
          invisibleSpanRef.current.push({ data: attribute });
        });
        matrix2AttributeAndContainer.forEach((attribute) => {
          invisibleSpanRef.current.push({ data: attribute });
        });
      }
      const fadeOutOutputMatrix = async () => {
        await delayInMs(5000);
        const multMatrixesOffset =
          multMatrixScope.current.getBoundingClientRect();
        outputMatrixScope.current.classList.remove("invisible");
        const outputMatrixPositionWithMargin =
          multMatrixesOffset.left + multMatrixesOffset.width + 100;
        outputMatrixScope.current.style.left = `${outputMatrixPositionWithMargin}px`;
        outputMatrixScope.current.style.top = `${multMatrixesOffset.top}px`;
        await animateOutput(
          outputMatrixScope.current,
          { opacity: 1 },
          { duration: 1, ease: "easeInOut" },
        );
        console.log(invisibleSpanRef.current);
        makeInvisibleSpanRef();
        setMatrixPositioned(true);
      };
      fadeOutOutputMatrix();
    } else if (matrixPositioned === true) {
      const matrix1 = getMatrixArray("matrix1");
      const matrix2 = getMatrixArray("matrix2");
      const { result, steps } = standardMultiplication(matrix1, matrix2);
      animateMatrixNumbers(result, steps);
    }
  }, [
    started,
    animateOutput,
    outputMatrixScope,
    multMatrixScope,
    matrixPositioned,
    animateMatrixNumbers
  ]);

  return { outputMatrixScope, invisibleSpanRef, matrixPositioned };
}

export function useHeaderAnimation(started) {
  const [multMatrixScope, animateMult] = useAnimate(null);
  useEffect(() => {
    if (started === true) {
      const matrixSizeElement = document.getElementById("matrixSizeHeader");
      const matrixSizeXOffset = matrixSizeElement.getBoundingClientRect().left;
      const multMatrixScopeXOffset =
        multMatrixScope.current.getBoundingClientRect().left;

      animateMult(
        multMatrixScope.current,
        { x: matrixSizeXOffset - multMatrixScopeXOffset + 60, y: 150 },
        { duration: 0.7, ease: "easeOut", delay: 4 },
      );
    }
  }, [started, animateMult, multMatrixScope]);

  return {multMatrixScope,animateMult};
}
