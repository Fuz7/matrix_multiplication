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

export function getMatrixArrayAttributesAndContainer(id){
  const matrix = document.getElementById(id)
  const matrixInputContainers = Array.from(matrix.getElementsByClassName('inputContainer'))
  const matrixAttributes = matrixInputContainers.map((inputContainer)=>{
    const input = inputContainer.getElementsByTagName('input')[0]
    const dataCol = input.getAttribute('data-col')
    const dataRow = input.getAttribute('data-row')
    const value = input.value
    return {attribute:{dataCol,dataRow,value},parent:inputContainer}
  })
  return matrixAttributes
}