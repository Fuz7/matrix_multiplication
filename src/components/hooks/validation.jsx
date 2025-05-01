import { useEffect, useState } from "react";
import { useMultiplicationType, useStartedStore } from "../../utils/store";
import { isValidPowerOfTwo } from "../../utils/multiplication";

export function useSmallStartButtonMatrixValidation(matrix1Pos, matrix2Pos) {
  const [isEnabled, setIsEnabled] = useState(true);
  const { started, setStarted } = useStartedStore((state) => state);

  useEffect(() => {
    if (
      matrix1Pos.row === "" ||
      matrix1Pos.col === "" ||
      matrix2Pos.row === "" ||
      matrix2Pos.col === ""
    ) {
      setIsEnabled(false);
      return;
    }

    if (matrix1Pos.col !== matrix2Pos.row) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);
  }, [matrix1Pos, matrix2Pos, setIsEnabled]);

  function validateMatrixInput() {
    const inputs = Array.from(document.getElementsByClassName("matrixInput"));
    inputs.forEach((input) => input.classList.remove("errorMatrixInput"));
    const missingInput = inputs.filter((input) => input.value === "");
    if (missingInput.length === 0) return true;
    missingInput.forEach((input) => input.classList.add("errorMatrixInput"));
  }

  const handleStart = () => {
    if (!validateMatrixInput()) return;
    setStarted(true);
  };

  return { isEnabled, handleStart, started };
}

export function useLargeStartButtonMatrixValidation(matrix1Pos, matrix2Pos) {
  const [isEnabled, setIsEnabled] = useState(true);
  const { started, setStarted } = useStartedStore((state) => state);
  const multiplicationType = useMultiplicationType(
    (state) => state.multiplicationType,
  );
  useEffect(() => {
    if (
      matrix1Pos.col === matrix2Pos.row &&
      multiplicationType === "standard"
    ) {
      setIsEnabled(true);
      return
    } else if (
      matrix1Pos.col === matrix2Pos.row &&
      multiplicationType === "strassen" &&
      isValidPowerOfTwo(matrix1Pos.col)
    ) {
      setIsEnabled(true)
      return
    }
    setIsEnabled(false);
  }, [matrix1Pos, matrix2Pos, setIsEnabled, multiplicationType]);

  const handleStart = () => {
    if (!isEnabled) return;

    started ? setStarted(false) : setStarted(true);
  };

  return { isEnabled, started, handleStart };
}
