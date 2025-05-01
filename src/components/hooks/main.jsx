import { useEffect } from "react";

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
      setLargeMatrix1Pos({ row: "6", col: "6" });
      setLargeMatrix2Pos({ row: "6", col: "6" });
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

