import { useEffect, useState } from "react";
import { useStartedStore } from "../../utils/store";

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

  }

  return {isEnabled,handleStart,started}
}