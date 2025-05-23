import { useAnimate } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMatrixArray,
  getMatrixArrayAttributesAndContainer,
  setMatrixInputFrom2dArray,
} from "../../utils/array";
import {
  standardMultiplication,
  strassenMultiplicationWithSteps,
} from "../../utils/multiplication";
import { delayInMs, getIsSkipped, getSpeed } from "../../utils/time";
import { getMatrixSpan, setTranslate } from "../../utils/element";
import { animate } from "motion";
import {
  useIsResultButtonVisible,
  useMatrixSizeStore,
  useMultiplicationType,
  useResultExecutionTime,
  useResultMatrixSize,
  useStartedStore,
} from "../../utils/store";
import { a, span, symbol } from "motion/react-client";

export function useSmallStartButtonAnimation(started) {
  const [startButtonScope, animate] = useAnimate(null);
  const matrixSize = useMatrixSizeStore((state) => state.matrixSize);
  useEffect(() => {
    if (started === true && matrixSize === "small") {
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
  }, [started, matrixSize, animate, startButtonScope]);
  return startButtonScope;
}

export function useSmallMatrixAnimation(multMatrixScope, animateMult) {
  const setIsResultVisible = useIsResultButtonVisible(
    (state) => state.setIsResultVisible,
  );
  const started = useStartedStore((state) => state.started);
  const [outputMatrixScope, animateOutput] = useAnimate(null);
  const [matrixPositioned, setMatrixPositioned] = useState(false);
  const invisibleSpanRef = useRef([]);
  const setResultMatrixSize = useResultMatrixSize(
    (state) => state.setResultMatrixSize,
  );
  const setResultExecutionTime = useResultExecutionTime(
    (state) => state.setResultExecutionTime,
  );
  const matrixSize = useMatrixSizeStore((state) => state.matrixSize);
  const multiplicationType = useMultiplicationType(
    (state) => state.multiplicationType,
  );
  const animateStandardMatrixNumbers = useCallback(
    async (result, steps) => {
      const matrix1 = document.getElementById("matrix1");
      const matrix2 = document.getElementById("matrix2");
      const outputMatrix = document.getElementById("outputMatrix");
      const outputMatrixDimension = outputMatrix.getBoundingClientRect();
      const outputMatrixCenterPos =
        outputMatrixDimension.x + outputMatrixDimension.width / 2;
      const animatingMultSymbol = document.getElementById(
        "animatingMultSymbol",
      );
      console.log(result);
      console.log(steps);
      let x = 0;
      let y = 0;
      let orderNumber = 1;
      for (const step of steps) {
        await animateMult(
          animatingMultSymbol,
          { scale: 1, opacity: 0 },
          { duration: 0.001 },
        );
        if (step.type === "multiply") {
          const matrix1Span = getMatrixSpan(matrix1, step.a);
          const matrix2Span = getMatrixSpan(matrix2, step.b);
          const matrix1SpanDimension = matrix1Span.getBoundingClientRect();
          const matrix2SpanDimension = matrix2Span.getBoundingClientRect();
          const multSymbolDimension =
            animatingMultSymbol.getBoundingClientRect();
          const order = document.querySelector(
            `.product[data-order="${orderNumber}"]`,
          );
          const orderSpan = order.getElementsByTagName("span")[0];
          orderSpan.textContent = step.value;
          const orderDimension = order.getBoundingClientRect();
          const matrix1XPos =
            multSymbolDimension.x - matrix1SpanDimension.x - 35;
          const matrix1YPos = multSymbolDimension.y - matrix1SpanDimension.y;
          const matrix2XPos =
            multSymbolDimension.x - matrix2SpanDimension.x + 35;
          const matrix2YPos = multSymbolDimension.y - matrix2SpanDimension.y;
          const orderXPos = multSymbolDimension.x - orderDimension.x + 10;
          const orderYPos = multSymbolDimension.y - orderDimension.y + 10;
          await animate(
            order,
            { x: [orderXPos, orderXPos], y: [orderYPos, orderYPos] },
            { duration: 0.001 },
          );
          animateMult(
            matrix1Span,
            { y: matrix1YPos },
            { duration: 0.5 * getSpeed() },
          );
          await animateMult(
            matrix2Span,
            { y: matrix2YPos },
            { duration: 0.5 * getSpeed() },
          );
          animateMult(
            matrix1Span,
            { x: matrix1XPos },
            { duration: 0.5 * getSpeed() },
          );
          animateMult(
            matrix2Span,
            { x: matrix2XPos },
            { duration: 0.5 * getSpeed() },
          );
          await animateMult(
            animatingMultSymbol,
            { opacity: 1 },
            { duration: 1 * getSpeed() },
          );
          await delayInMs(1);
          animateMult(
            animatingMultSymbol,
            { opacity: 0, scale: 0 },
            { duration: 1 * getSpeed() },
          );
          animateMult(
            matrix1Span,
            { x: matrix1XPos + 45, scale: 0, opacity: 0 },
            { duration: 0.8 * getSpeed(), ease: "easeOut" },
          );
          animateMult(
            matrix2Span,
            { x: matrix2XPos - 45, scale: 0, opacity: 0 },
            { duration: 0.8 * getSpeed(), ease: "easeOut" },
          );
          await animate(
            orderSpan,
            { scale: 1 },
            {
              duration: 0.2 * getSpeed(),
              delay: 0.6 * getSpeed(),
              ease: "easeOut",
            },
          );
          if (orderNumber === 1) {
            const orderXPos2 =
              outputMatrixCenterPos -
              (orderDimension.x + orderDimension.width / 2);
            animate(
              order,
              { x: orderXPos2, y: orderYPos },
              { duration: 1 * getSpeed() },
            );
          }

          if (orderNumber >= 2) {
            const gap = 15;
            const plusWidth = 16;
            const spanWidth = 30;
            const sumWidth =
              spanWidth * orderNumber +
              gap * orderNumber +
              plusWidth * orderNumber;
            const startX = outputMatrixCenterPos - sumWidth / 2;
            for (let i = 1; i <= orderNumber - 1; i++) {
              const previousProduct = document.querySelector(
                `.product[data-order="${i}"]`,
              );
              const addedXPos = (i - 1) * (gap * 2 + spanWidth + plusWidth);
              animate(
                previousProduct,
                { x: startX + addedXPos },
                { duration: 1 * getSpeed() },
              );
            }
            for (let i = 1; i <= orderNumber - 2; i++) {
              const previousPlus = document.querySelector(
                `.plus[data-order="${i}"]`,
              );
              const addedPlusXPos =
                i * (spanWidth + gap) + (i - 1) * (gap + plusWidth);
              animate(
                previousPlus,
                { x: startX + addedPlusXPos },
                { duration: 1 * getSpeed() },
              );
            }
            const orderPlus = document.querySelector(
              `.plus[data-order="${orderNumber - 1}"]`,
            );
            const orderPlusXPos =
              startX +
              (orderNumber - 1) * (spanWidth + gap) +
              (orderNumber - 2) * (gap + plusWidth);

            setTranslate(orderPlus, orderPlusXPos, orderYPos + 8);
            animate(
              orderPlus,
              { opacity: 1, scale: [0, 1], x: orderPlusXPos, y: orderYPos + 8 },
              { duration: 0.5 * getSpeed(), delay: 1 * getSpeed() },
            );
            await animate(
              order,
              { x: orderXPos, y: orderYPos - 100 },
              { duration: 0.5 * getSpeed() },
            );
            const orderXPos2 =
              startX + (orderNumber - 1) * (gap * 2 + spanWidth + plusWidth);
            await animate(
              order,
              { x: orderXPos2, y: orderYPos - 100 },
              { duration: 0.5 * getSpeed() },
            );
            animate(
              order,
              { x: orderXPos2, y: orderYPos },
              { duration: 0.5 * getSpeed() },
            );
          }

          animateMult(
            matrix1Span,
            { x: [0, 0], y: [0, 0], scale: [1, 1], opacity: [1, 1] },
            { duration: 0.001 },
          );
          animateMult(
            matrix2Span,
            { x: [0, 0], y: [0, 0], scale: [1, 1], opacity: [1, 1] },
            { duration: 0.001 },
          );
          orderNumber += 1;
        } else if (step.type === "add") {
          const invisibleSum = document.getElementById("invisibleSum");
          const invisibleSumSpan = invisibleSum.getElementsByTagName("span")[0];
          const invisibleSumDimension = invisibleSum.getBoundingClientRect();
          const previousProduct = document.querySelector(
            `.product[data-order="1"]`,
          ) ;
          const previousProductDimension =
            previousProduct.getBoundingClientRect();
          const invisibleSumXPos =
            outputMatrixCenterPos - invisibleSumDimension.width / 2 - 5;
          const invisibleSumYPos =
            previousProductDimension.y - invisibleSumDimension.y - 15;
          invisibleSumSpan.textContent = step.value;
          await animate(
            invisibleSum,
            {
              x: [invisibleSumXPos, invisibleSumXPos],
              y: [invisibleSumYPos, invisibleSumYPos],
            },
            { duration: 0.001 },
          );
          console.log(invisibleSum);
          await delayInMs(1000 * getSpeed());
          for (let i = 1; i <= orderNumber - 1; i++) {
            const previousProduct = document.querySelector(
              `.product[data-order="${i}"]`,
            );
            const previousProductSpan =
              previousProduct.getElementsByTagName("span")[0];
            animate(
              previousProductSpan,
              { scale: 0 },
              { duration: 0.8 * getSpeed(), ease: "easeOut" },
            );
          }
          for (let i = 1; i <= orderNumber - 2; i++) {
            const previousPlus = document.querySelector(
              `.plus[data-order="${i}"]`,
            );
            animate(
              previousPlus,
              { scale: 0 },
              { duration: 0.8 * getSpeed(), ease: "easeOut" },
            );
          }
          console.log({ x, y });
          await animate(
            invisibleSumSpan,
            { scale: 1 },
            { duration: 0.4 * getSpeed(), delay: 0.6 * getSpeed() },
          );
          const matrixInput = outputMatrix.querySelector(
            `input[data-row="${y}"][data-col="${x}"]`,
          );
          const matrixInputDimension = matrixInput.getBoundingClientRect();
          const invisibleSumXPos2 = matrixInputDimension.x - invisibleSumXPos;
          const invisibleSumYPos2 = matrixInputDimension.y - invisibleSumYPos;
          await delayInMs(100);
          await animate(
            invisibleSum,
            {
              x: invisibleSumXPos + invisibleSumXPos2,
              y: invisibleSumYPos + invisibleSumYPos2,
            },
            { duration: 0.4 * getSpeed() },
          );
          matrixInput.value = step.value;
          for (let i = 1; i <= orderNumber - 1; i++) {
            const previousProduct = document.querySelector(
              `.product[data-order="${i}"]`,
            );
            await animate(
              previousProduct,
              { x: [0, 0], y: [0, 0] },
              { duration: 0.001 },
            );
          }
          await animate(
            invisibleSumSpan,
            { scale: [0, 0] },
            { duration: 0.001 },
          );
          await animate(
            invisibleSum,
            { x: [invisibleSumXPos, invisibleSumXPos], y: [0, 0] },
            { duration: 0.001 },
            
          );

          y = Math.floor((x + 1) / result[0].length) + y;
          x = (1 + x) % result[0].length;

          orderNumber = 1;
          if (getIsSkipped()) break;
        }
      }
      if (getIsSkipped) {
        setMatrixInputFrom2dArray("outputMatrix", result);
      }
      setIsResultVisible(true);
    },
    [animateMult, setIsResultVisible],
  );

  const animateStrassenMatrixNumbers = useCallback(
    async (result, steps) => {
      const matrix1 = document.getElementById("matrix1");
      const matrix2 = document.getElementById("matrix2");
      const outputMatrix = document.getElementById("outputMatrix");
      const outputMatrixDimension = outputMatrix.getBoundingClientRect();
      const matrix1Dimension = matrix1.getBoundingClientRect();
      const matrix2Dimension = matrix2.getBoundingClientRect();
      const matrix1CenterPos = matrix1Dimension.x + matrix1Dimension.width / 2;
      const matrix2CenterPos = matrix2Dimension.x + matrix2Dimension.width / 2;
      const outputMatrixCenterPos =
        outputMatrixDimension.x + outputMatrixDimension.width / 2;
      const animatingMultSymbol = document.getElementById(
        "animatingMultSymbol",
      );
      const animatingMultSymbolDimension =
        animatingMultSymbol.getBoundingClientRect();
      const strassenButtonHeader = document.getElementById(
        "strassenButtonHeader",
      );
      const strassenButtonHeaderDimension =
        strassenButtonHeader.getBoundingClientRect();
      const productsYPlacement = strassenButtonHeaderDimension.y + 150;
      const gap = 15;
      const plusWidth = 16;
      const spanWidth = 35;
      let outputNumber = 1;
      let order = 1;
      const sumY = outputMatrixDimension.y - 230
      let plusOrder = 0
      let minusOrder = 0
      let symbolOrder = 0
      for (const step of steps) {
        if (
          step.status === "setup" &&
          (step.type === "add" || step.type === "subtract")
        ) {
          const firstSpan =
            step.matrix === "a"
              ? getMatrixSpan(matrix1, step.a)
              : getMatrixSpan(matrix2, step.a);
          const secondSpan =
            step.matrix === "a"
              ? getMatrixSpan(matrix1, step.b)
              : getMatrixSpan(matrix2, step.b);
          const sumWidth = spanWidth * 2 + gap * 2 + plusWidth + 10;
          const startX =
            step.matrix === "a"
              ? matrix1CenterPos - sumWidth / 2
              : matrix2CenterPos - sumWidth / 2;
          const targetMatrixDimension =
            step.matrix === "a"
              ? matrix1.getBoundingClientRect()
              : matrix2.getBoundingClientRect();
          const firstSpanDimension = firstSpan.getBoundingClientRect();
          const secondSpanDimension = secondSpan.getBoundingClientRect();
          const firstSpanOffsetX = targetMatrixDimension.x - firstSpanDimension.x - 70;
          const secondSpanOffsetX = targetMatrixDimension.x - secondSpanDimension.x + 230;
          const firstSpanX = order === 7 &&  step.type === 'subtract'?
          -67:
          firstSpanDimension.x - startX
          ;
          const secondSpanX = step.a.col === step.b.col && order !== 7?
            64:
            secondSpanDimension.x -
            (startX + (spanWidth + gap * 2 + plusWidth))
            ;
          const mathSign =
            step.type === "add"
              ? document.getElementsByClassName("plus")[0]
              : document.getElementsByClassName("minus")[0];
          const mathSignX = order === 7 && step.type ==='subtract'?
           290:
           firstSpanX + spanWidth + gap + startX;
          const mathSignY =
            step.type === "add"
              ? matrix1Dimension.y - 66
              : matrix1Dimension.y - 70;
          const firstSpanY = mathSignY - firstSpanDimension.y;
          const secondSpanY = mathSignY - secondSpanDimension.y;
          const partialOutputDiv = document.querySelector(
            `.partialOutput[data-order="${step.order}"]`,
          );
          const partialOutputSpan =
            partialOutputDiv.getElementsByTagName("span")[0];
          partialOutputSpan.textContent = step.value;
          const partialOutputX = mathSignX - 18;
          const partialOutputY = matrix1Dimension.y - 71;
          await delayInMs(1);
          await animate(
            mathSign,
            { x: mathSignX, y: matrix1Dimension.y - 50 },
            { duration: 0.001 },
          );
          await animate(
            partialOutputDiv,
            { x: partialOutputX, y: partialOutputY },
            { duration: 0.001 },
          );
          animateMult(firstSpan, { x: firstSpanOffsetX }, { duration: 0.5 * getSpeed() });
          await animateMult(
            secondSpan,
            { x: secondSpanOffsetX },
            { duration: 0.5 * getSpeed() },
          );
          animateMult(
            firstSpan,
            { x: firstSpanOffsetX, y: firstSpanY },
            { duration: 0.5 * getSpeed() },
          );
          await animateMult(
            secondSpan,
            { x: secondSpanOffsetX, y: secondSpanY },
            { duration: 0.5 * getSpeed() },
          );
          animateMult(
            firstSpan,
            { x: firstSpanX, y: firstSpanY },
            { duration: 0.5 * getSpeed() },
          );
          animateMult(
            secondSpan,
            { x: secondSpanX, y: secondSpanY },
            { duration: 0.5 * getSpeed() },
          );
          await animate(mathSign, { opacity: 1 }, { duration: 1 * getSpeed() });
          await delayInMs(500 * getSpeed());
          animate(
            mathSign,
            { opacity: 0, scale: 0 },
            { duration: 1 * getSpeed() },
          );
          animateMult(
            firstSpan,
            { x: firstSpanX + 40, scale: 0, opacity: 0 },
            { duration: 0.8 * getSpeed(), ease: "easeOut" },
          );
          animateMult(
            secondSpan,
            { x: secondSpanX - 40, scale: 0, opacity: 0 },
            { duration: 0.8 * getSpeed(), ease: "easeOut" },
          );
          await animate(
            partialOutputSpan,
            { scale: 1 },
            {
              duration: 0.2 * getSpeed(),
              delay: 0.6 * getSpeed(),
              ease: "easeOut",
            },
          );
          partialOutputDiv.setAttribute("data-pos", step.order);
          const plusSign =  document.getElementsByClassName("plus")[0]
          const minusSign = document.getElementsByClassName("minus")[0];
          await animate(
            mathSign,
            { x: 0, y: 0, scale: 1 },
            { duration: 0.001 },
          );
          await animate(
            plusSign,
            { x: 0, y: 0, scale: 1 },
            { duration: 0.001 },
          );
          await animate(
            minusSign,
            { x: 0, y: 0, scale: 1 },
            { duration: 0.001 },
          );
          await animate(
            firstSpan,
            { x: 0, y: 0, scale: 1, opacity: 1 },
            { duration: 0.001 },
          );
          await animate(
            secondSpan,
            { x: 0, y: 0, scale: 1, opacity: 1 },
            { duration: 0.001 },
          );
        } else if (step.status === "setup" && step.type === "combine") {
          const partialOutput1Div = document.querySelector(`div[data-pos="1"]`);
          const partialOutput2Div = document.querySelector(`div[data-pos="2"]`);
            
          const partialOutput1Span =
            partialOutput1Div.getElementsByTagName("span")[0];
          const partialOutput2Span =
            partialOutput2Div.getElementsByTagName("span")[0];
          const partialOutput1X = animatingMultSymbolDimension.x - 30;
          const partialOutput2X = animatingMultSymbolDimension.x + 30;
          const partialOutputY = matrix1Dimension.y - 71;
          const productDiv = document.querySelector(
            `.product[data-order="${order}"]`,
          );
          const productDivInitialX = animatingMultSymbolDimension.x + 10 + ((order - 1) * 1)
          const productSpan1 = productDiv.getElementsByTagName("span")[0];
          const productSpan2 = productDiv.getElementsByTagName("span")[1];
          const productDivFinalX =
            animatingMultSymbolDimension.x + 10 + (order - 1) * 80;
          await animate(
            productSpan1,
            { scale: 0 },
            {
              duration: 0.001,
            },
          );
          await animate(
            productSpan2,
            { scale: 0 },
            {
              duration: 0.001,
            },
          );
          productSpan1.textContent = step.value;
          productSpan2.textContent = step.value;

          await animate(
            productDiv,
            { x: productDivInitialX, y: partialOutputY + 5 },
            { duration: 0.001 },
          );
          animate(
            partialOutput1Div,
            { x: partialOutput1X, y: partialOutputY },
            { duration: 1 * getSpeed() },
          );
          animate(
            partialOutput2Div,
            { x: partialOutput2X, y: partialOutputY },
            { duration: 1 * getSpeed() },
          );
          await animateMult(
            animatingMultSymbol,
            { opacity: 1 },
            { duration: 1 * getSpeed() },
          );
          await delayInMs(1000 * getSpeed());

          animateMult(
            animatingMultSymbol,
            { opacity: 0, scale: 0 },
            { duration: 1 * getSpeed() },
          );
          animate(
            partialOutput1Div,
            { x: partialOutput1X + 45, scale: 0, opacity: 0 },
            { duration: 1 * getSpeed() },
          );
          animate(
            partialOutput2Div,
            { x: partialOutput2X - 45, scale: 0, opacity: 0 },
            { duration: 1 * getSpeed() },
          );
          await animate(
            productSpan1,
            { scale: 1 },
            {
              duration: 0.2 * getSpeed(),
              delay: 0.6 * getSpeed(),
              ease: "easeOut",
            },
          );
          await delayInMs(200 * getSpeed());
          animate(
            productSpan2,
            { scale: 1 },
            {
              duration: 0.001 * getSpeed(),
            },
          );
          await animate(
            productDiv,
            { y: productsYPlacement + 120 },
            { duration: 0.5 * getSpeed() },
          );
          await animate(
            productDiv,
            { x: productDivFinalX, y: productsYPlacement + 120 },
            { duration: 0.5 * getSpeed() },
          );
          await animate(
            productDiv,
            { y: productsYPlacement },
            { duration: 0.5 * getSpeed() },
          );
          partialOutput1Div.setAttribute("data-pos", 0);
          partialOutput2Div.setAttribute("data-pos", 0);
          partialOutput1Span.textContent = "";
          partialOutput2Span.textContent = "";

          await animate(
            partialOutput1Span,
            { scale: 0 },
            {
              duration: 0.001,
            },
          );
          await animate(
            partialOutput2Span,
            { scale: 0 },
            {
              duration: 0.001,
            },
          );
          await animateMult(
            animatingMultSymbol,
            { opacity: 0, scale: 1 },
            { duration: 0.001 },
          );

          animate(
            partialOutput1Div,
            { x: 0, y: 0, scale: 1, opacity: 1 },
            { duration: 0.001 },
          );
          await animate(
            partialOutput2Div,
            { x: 0, y: 0, scale: 1, opacity: 1 },
            { duration: 0.001 },
          );

          order += 1;
        } else if (step.status === "setup" && step.type === "standby") {
          const standbySpan =
            step.matrix === "a"
              ? getMatrixSpan(matrix1, step.a)
              : getMatrixSpan(matrix2, step.a);
          const standbySpanDimension = standbySpan.getBoundingClientRect();
          const partialProductDiv = document.querySelector(
            `.partialOutput[data-order="${step.order}"]`,
          );
          const partialProductSpan =
            partialProductDiv.getElementsByTagName("span")[0];

          partialProductSpan.textContent = step.value;
          const standbyX =
            step.matrix === "a" ? matrix1CenterPos - 25 : matrix2CenterPos - 25;
          const offsetXDirection = step.matrix === "a" ? -140 : 140;
          const standbyY = matrix1Dimension.y - 70;
          await animate(
            partialProductDiv,
            { x: standbySpanDimension.x, y: standbySpanDimension.y },
            { duration: 0.001 },
          );
          await animate(partialProductSpan, { scale: 1 }, { duration: 0.001 });

          await animate(
            partialProductDiv,
            { x: standbyX + offsetXDirection },
            { duration: 0.5 * getSpeed() },
          );
          await animate(
            partialProductDiv,
            { x: standbyX + offsetXDirection, y: standbyY },
            { duration: 0.5 * getSpeed() },
          );
          await animate(
            partialProductDiv,
            { x: standbyX, y: standbyY },
            { duration: 0.5 * getSpeed() },
          );

          partialProductDiv.setAttribute("data-pos", step.order);
        }else if(step.status === 'output' && step.type === 'first'){

          const product1Div = 
          document.querySelector(
            `.product[data-order="${step.a}"]`
          )
          const product1Span = product1Div.getElementsByTagName('span')[1]
          const product1SpanDimension = product1Span.getBoundingClientRect() 
          const product1SpanX = outputMatrixCenterPos - product1SpanDimension.x - product1SpanDimension.width / 2
          await animate(product1Span,
            {y: (sumY/2) },
            {duration:0.5  * getSpeed()}
          )
          await animate(product1Span,
            {x:product1SpanX,y: (sumY /2) },
            {duration:0.5 * getSpeed()}
          )
          await animate(product1Span,
            {x:product1SpanX,y: (sumY) },
            {duration:0.5 * getSpeed()}
          )
          product1Div.setAttribute('data-pos',outputNumber)
          outputNumber += 1
        }else if(step.status === "output" && (step.type === "add" || step.type === 'subtract')){
          const sumWidth = spanWidth * outputNumber 
          + gap * outputNumber + plusWidth * (outputNumber )
          const startX = outputMatrixCenterPos - sumWidth / 2

          for (let i = 1; i <= outputNumber - 1; i++) {
            const previousProductDiv = document.querySelector(
              `.product[data-pos="${i}"]`,
            );
            const previousProductDivDimension = previousProductDiv.getBoundingClientRect()
            const previousProductSpan = previousProductDiv.getElementsByTagName('span')[1]
            const addedXPos = (i - 1) * (gap * 2 + spanWidth + plusWidth);
            const previousX = startX - 
            previousProductDivDimension.x + addedXPos
            animate(
              previousProductSpan,
              { x: previousX },
              { duration: 1 * getSpeed() },
            );
          }
          for (let i = 1; i <= outputNumber - 2; i++) {
              const previousSymbol = document.querySelector(
                `div[symbolOrder="${i}"]`
              ) 
              const addedPlusXPos =
                i * (spanWidth + gap) + (i - 1) * (gap + plusWidth);
              animate(
                previousSymbol,
                { x: startX + addedPlusXPos },
                { duration: 1 * getSpeed() },
              );
          }
          
          const mathSign =
            step.type === "add"
              ? document.getElementsByClassName("plus")[plusOrder]
              : document.getElementsByClassName("minus")[minusOrder];
          const mathSignDimension = 
            mathSign.getBoundingClientRect()
          const mathSignXPos = 
          startX - mathSignDimension.x +
              (outputNumber - 1) * (spanWidth + gap) +
              (outputNumber - 2) * (gap + plusWidth);
          const mathSignYPos = step.type === 'add'? 
          outputMatrixDimension.y - 44:
          outputMatrixDimension.y - 39
          await animate(mathSign,{x:mathSignXPos,y: mathSignYPos},
            {duration:0.001}
          )
          animate(
            mathSign,
            { opacity: 1, scale: [0, 1], x: mathSignXPos, y: mathSignYPos},
            { duration: 0.5 * getSpeed(), delay: 1 * getSpeed() },
          );
          const currentDiv = 
          document.querySelector(
            `.product[data-order="${step.a}"]`
          )
          const currentDivDimension = currentDiv.getBoundingClientRect() 
          const currentSpan = currentDiv.getElementsByTagName('span')[1]
          const currentSpanX = 
          startX - currentDivDimension.x + (outputNumber - 1) * (gap * 2 + spanWidth + plusWidth);
          
          await animate(
            currentSpan,
            {y:sumY / 2},
            {duration:0.5 * getSpeed()}
          )
          await animate(
            currentSpan,
            {x:currentSpanX,y:sumY / 2},
            {duration:0.5 * getSpeed()}
          )
          await animate(
            currentSpan,
            {x:currentSpanX,y:sumY},
            {duration:0.5 * getSpeed()}

          )
          currentDiv.setAttribute('data-pos',outputNumber)
          outputNumber += 1
          symbolOrder += 1
          mathSign.setAttribute('symbolOrder',symbolOrder)
          plusOrder = step.type === 'add' ? plusOrder + 1 : plusOrder
          minusOrder = step.type === 'subtract' ? minusOrder + 1 : minusOrder
        }else if(step.status === 'output' && step.type ==='combine'){
          const invisibleSum = document.getElementById("invisibleSum");
          const invisibleSumSpan = invisibleSum.getElementsByTagName("span")[0];
          const invisibleSumDimension = invisibleSum.getBoundingClientRect();
          const invisibleSumXPos =
            outputMatrixCenterPos - invisibleSumDimension.width / 2;
          const invisibleSumYPos = outputMatrixDimension.y - 59   
          invisibleSumSpan.textContent = step.value
          await animate(
            invisibleSum,
            {
              x: [invisibleSumXPos, invisibleSumXPos],
              y: [invisibleSumYPos, invisibleSumYPos],
            },
            { duration: 0.001 },
          );
          await delayInMs(1000 * getSpeed());
          for (let i = 1; i <= outputNumber - 1; i++) {
            const currentDiv = document.querySelector(
              `div[data-pos="${i}"]`,
            );
            const previousProductSpan =
              currentDiv.getElementsByTagName("span")[1];
            animate(
              previousProductSpan,
              { scale: 0 },
              { duration: 0.8 * getSpeed(), ease: "easeOut" },
            );
          }
          for (let i = 1; i <= outputNumber - 2; i++) {
            const previousPlus = document.querySelector(
              `div[symbolOrder="${i}"]`,
            );
            animate(
              previousPlus,
              { scale: 0 },
              { duration: 0.8 * getSpeed(), ease: "easeOut" },
            );
          }
          await animate(
            invisibleSumSpan,
            { scale: 1 },
            { duration: 0.4 * getSpeed(), delay: 0.6 * getSpeed() },
          );
          const matrixInput = outputMatrix.querySelector(
            `input[data-row="${step.a.row}"][data-col="${step.a.col}"]`,
          );
          const matrixInputDimension = matrixInput.getBoundingClientRect();
          const invisibleSumXPos2 = matrixInputDimension.x - invisibleSumXPos;
          const invisibleSumYPos2 = matrixInputDimension.y - invisibleSumYPos;
          await delayInMs(100);
          await animate(
            invisibleSum,
            {
              x: invisibleSumXPos + invisibleSumXPos2,
              y: invisibleSumYPos + invisibleSumYPos2,
            },
            { duration: 0.4 * getSpeed() },
          );
          matrixInput.value = step.value;
          for (let i = 1; i <= outputNumber - 1; i++) {
            const currentDiv = document.querySelector(
              `div[data-pos="${i}"]`,
            );
            const previousProductSpan =
              currentDiv.getElementsByTagName("span")[1];

            await animate(
              previousProductSpan,
              { x: [0, 0], y: [0, 0] },
              { duration: 0.001 },
            );
            
            await animate(
              previousProductSpan,
              { scale: 1 },
              { duration: 0.001},
            );
            currentDiv.removeAttribute('data-pos')
          }
          for (let i = 1; i <= outputNumber - 2; i++) {
            const previousPlus = document.querySelector(
              `div[symbolOrder="${i}"]`,
            );
            await animate(
              previousPlus,
              { x: [0, 0], y: [0, 0] },
              { duration: 0.001 },
            );
            
            previousPlus.removeAttribute('symbolOrder')
          }
          await animate(
            invisibleSumSpan,
            { scale: [0, 0] },
            { duration: 0.001 },
          );
          await animate(
            invisibleSum,
            { x: [invisibleSumXPos, invisibleSumXPos], y: [0, 0] },
            { duration: 0.001 },
            
          );
          outputNumber = 1
          symbolOrder = 0
          plusOrder = 0
          minusOrder = 0
          if(getIsSkipped())break;
        }
      }
      if (getIsSkipped) {
        setMatrixInputFrom2dArray("outputMatrix", result);
      }
      setIsResultVisible(true);

    },
    [animateMult,setIsResultVisible],
  );

  useEffect(() => {
    if (
      started === true &&
      matrixPositioned === false &&
      matrixSize === "small"
    ) {
      function makeInvisibleSpanRef() {
        const matrix1 = getMatrixArray("matrix1");
        const matrix2 = getMatrixArray("matrix2");

        const { result, runtimeMs } = standardMultiplication(matrix1, matrix2);
        const resultDimension = result.length + "x" + result[0].length;
        setResultMatrixSize(resultDimension);
        setResultExecutionTime(runtimeMs);
        setMatrixInputFrom2dArray("resultMatrix", result);
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
        outputMatrixScope.current.style.top = `190px`;
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
    } else if (
      matrixPositioned === true &&
      matrixSize === "small" &&
      multiplicationType === "standard"
    ) {
      const matrix1 = getMatrixArray("matrix1");
      const matrix2 = getMatrixArray("matrix2");
      const { result, steps } = standardMultiplication(matrix1, matrix2);
      animateStandardMatrixNumbers(result, steps);
    } else if (
      matrixPositioned === true &&
      matrixSize === "small" &&
      multiplicationType === "strassen"
    ) {
      const matrix1 = getMatrixArray("matrix1");
      const matrix2 = getMatrixArray("matrix2");
      const { result, steps } = strassenMultiplicationWithSteps(
        matrix1,
        matrix2,
      );
      animateStrassenMatrixNumbers(result, steps);
      console.log(result, steps);
    }
  }, [
    started,
    animateOutput,
    outputMatrixScope,
    multMatrixScope,
    matrixPositioned,
    animateStandardMatrixNumbers,
    animateStrassenMatrixNumbers,
    setResultExecutionTime,
    setResultMatrixSize,
    matrixSize,
    multiplicationType,
  ]);

  return { outputMatrixScope, invisibleSpanRef, matrixPositioned };
}

export function useHeaderAnimation() {
  const started = useStartedStore((state) => state.started);
  const [multMatrixScope, animateMult] = useAnimate(null);
  const matrixSize = useMatrixSizeStore((state) => state.matrixSize);
  useEffect(() => {
    if (started === true && matrixSize === "small") {
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
  }, [started, animateMult, multMatrixScope, matrixSize]);

  return { multMatrixScope, animateMult };
}
