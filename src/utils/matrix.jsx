export function createMatrix(row, column) {
  const matrixArray = Array(row)
    .fill()
    .map(() =>
      Array(column)
        .fill()
        .map(() => Math.floor(Math.random() * 10)),
    );
  return matrixArray;
}
