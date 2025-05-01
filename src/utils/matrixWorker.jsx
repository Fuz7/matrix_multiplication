import {
  largeStandardMultiplication,
  largeStrassenMultiplication,
} from "./multiplication";

onmessage = (e) => {
  const { matrix1Array, matrix2Array, type } = e.data;
  const result =
    type === "standard"
      ? largeStandardMultiplication(matrix1Array, matrix2Array)
      : largeStrassenMultiplication(matrix1Array, matrix2Array);
  postMessage(result);
};
