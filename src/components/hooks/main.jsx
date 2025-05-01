import { useEffect } from "react";
import { createMatrix } from "../../utils/matrix";
import { useIsMultiplicationFinished, useMultiplicationType, useResultExecutionTime, useResultMatrixSize, useStartedStore } from "../../utils/store";
import { standardMultiplication } from "../../utils/multiplication";

export function useMatrixSizeAndTypeChange(
  smallMatrixes,
  largeMatrixes,
  matrixSize,
  multiplicationType,
) {
  const { setSmallMatrix1Pos, setSmallMatrix2Pos } = smallMatrixes;
  const { setLargeMatrix1Pos, setLargeMatrix2Pos } = largeMatrixes;
  useEffect(() => {
    if (matrixSize === "small" && multiplicationType === "standard") {
      setSmallMatrix1Pos({ row: "3", col: "2" });
      setSmallMatrix2Pos({ row: "2", col: "3" });
    } else if (matrixSize === "small" && multiplicationType === "strassen") {
      setSmallMatrix1Pos({ row: "2", col: "2" });
      setSmallMatrix2Pos({ row: "2", col: "2" });
    } else if (matrixSize === "large" && multiplicationType === "standard") {
      setLargeMatrix1Pos({ row: "5", col: "5" });
      setLargeMatrix2Pos({ row: "5", col: "5" });
    } else if (matrixSize === "large" && multiplicationType === "strassen") {
      setLargeMatrix1Pos({ row: "16", col: "16" });
      setLargeMatrix2Pos({ row: "16", col: "16" });
    }
  }, [
    matrixSize,
    multiplicationType,
    setSmallMatrix1Pos,
    setSmallMatrix2Pos,
    setLargeMatrix1Pos,
    setLargeMatrix2Pos,
  ]);
}

export function useLargeMatrixStart(largeMatrix1Pos, largeMatrix2Pos) {
  const {started,setStarted} = useStartedStore((state) => state);
  const setResultMatrixSize = useResultMatrixSize((state)=>state.setResultMatrixSize)
  const setResultExecutionTime = useResultExecutionTime((state)=>state.setResultExecutionTime)
  const setIsMultiplicationFinished = useIsMultiplicationFinished((state)=>state.setIsMultiplicationFinished)
  const multiplicationType = useMultiplicationType((state)=>state.multiplicationType)
  useEffect(() => {
    if (started) {
      const matrixWorker = new Worker(
        new URL("../../utils/matrixWorker.jsx", import.meta.url),
        { type: "module" },
      );
      const matrix1Array = createMatrix(
        Number.parseInt(largeMatrix1Pos.row),
        Number.parseInt(largeMatrix1Pos.col),
      );
      const matrix2Array = createMatrix(
        Number.parseInt(largeMatrix2Pos.row),
        Number.parseInt(largeMatrix2Pos.col),
      );
      matrixWorker.postMessage({matrix1Array,matrix2Array,type:multiplicationType})
      matrixWorker.onmessage = (e)=>{
        const {result,runtimeMs} = e.data
        const resultDimension = result.length + "x" + result[0].length;
        setResultExecutionTime(runtimeMs)
        setResultMatrixSize(resultDimension)
        setIsMultiplicationFinished(true)
        setStarted(false)
      }
      return()=>{
        matrixWorker.terminate()
      }
    }
  }, [largeMatrix1Pos, largeMatrix2Pos, started,setStarted,multiplicationType,
    setResultExecutionTime,setResultMatrixSize,setIsMultiplicationFinished]);
}
