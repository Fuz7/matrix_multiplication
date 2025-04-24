export function getMatrixSpan(matrixContainer, position) {
  const matrixSpan = matrixContainer.querySelector(
    `span[data-row="${position.row}"][data-col="${position.col}"]`
  );
  return matrixSpan
}

