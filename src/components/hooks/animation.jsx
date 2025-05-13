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
import { span } from "motion/react-client";

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
          );
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
      const gap = 15;
      const plusWidth = 16;
      const spanWidth = 35;
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
          const firstSpanDimension = firstSpan.getBoundingClientRect();
          const secondSpanDimension = secondSpan.getBoundingClientRect();
          const firstSpanX = firstSpanDimension.x - startX;
          const secondSpanX =
            secondSpanDimension.x -
            (startX + (spanWidth + gap * 2 + plusWidth));
          const mathSign =
            step.type === "add"
              ? document.getElementsByClassName("plus")[0]
              : document.getElementsByClassName("minus")[0];
          const mathSignX = firstSpanX + spanWidth + gap + startX;
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
          const partialOutputX =  mathSignX - 18
          const partialOutputY = matrix1Dimension.y - 71
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
          animateMult(firstSpan, { x: -120 }, { duration: 0.5 });
          await animateMult(secondSpan, { x: 120 }, { duration: 0.5 });
          animateMult(firstSpan, { x: -120, y: firstSpanY }, { duration: 0.5 });
          await animateMult(
            secondSpan,
            { x: 120, y: secondSpanY },
            { duration: 0.5 },
          );
          animateMult(
            firstSpan,
            { x: firstSpanX, y: firstSpanY },
            { duration: 0.5 },
          );
          animateMult(
            secondSpan,
            { x: secondSpanX, y: secondSpanY },
            { duration: 0.5 },
          );
          await animate(mathSign, { opacity: 1 }, { duration: 1 });
          await delayInMs(500);
          animate(mathSign, { opacity: 0, scale: 0 }, { duration: 1 });
          animateMult(
            firstSpan,
            { x: firstSpanX + 40, scale: 0, opacity: 0 },
            { duration: 0.8, ease: "easeOut" },
          );
          animateMult(
            secondSpan,
            { x: secondSpanX - 40, scale: 0, opacity: 0 },
            { duration: 0.8, ease: "easeOut" },
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
          partialOutputSpan.setAttribute('data-pos',step.order)
          await animate(
            mathSign,
            { x: 0, y: 0,scale:1},
            { duration: 0.001 },
          )
          await animate(
            firstSpan,
            { x: 0, y: 0,scale:1,opacity:1},
            { duration: 0.001 },
          )
          await animate(
            secondSpan,
            { x: 0, y: 0,scale:1,opacity:1},
            { duration: 0.001 },
          )
        }
      }
    },
    [animateMult],
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
