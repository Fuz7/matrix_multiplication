export function getMatrixSpan(matrixContainer, position) {
  const matrixSpan = matrixContainer.querySelector(
    `span[data-row="${position.row}"][data-col="${position.col}"]`,
  );
  return matrixSpan;
}


export function setTranslate(element, x = 0, y = 0) {
  if (!element) return; // Safety check
  element.style.transform = `translate(${x}px, ${y}px)`;
}