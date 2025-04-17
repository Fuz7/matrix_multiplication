export function getMatrixArray(id) {
  const matrix = document.getElementById(id)
  const rowSize = Number.parseInt(matrix.getAttribute('data-row'))
  const colSize = Number.parseInt(matrix.getAttribute('data-col'))
  const matrixArray = Array(rowSize).fill().map(() => Array(colSize).fill(0))
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      const matrixInput = matrix
                  .querySelector(`input[data-row="${i}"][data-col="${j}"]`)
      matrixArray[i][j] = Number.parseInt(matrixInput.value)
    }
  }
  return(matrixArray)
}