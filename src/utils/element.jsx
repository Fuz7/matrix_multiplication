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

export function validateMatrixInput(matrixSize, matrixType, value) {
  let newValue = value;
  if (matrixSize === "small" && matrixType === "standard") {
    newValue = value === "" ? "" : value.replace(/[^1-4]/g, "").slice(0, 1); // keep only first digit 1–4 or empty
  } else if (matrixSize === "small" && matrixType === "strassen") {

    if(value === ""){
      newValue = ""
    }else if(value === "2"){
      newValue = value
    }else if(value.length === 2){
      newValue = value.slice(0,1)
    }else if(value.length === 1){
      newValue =  ""
    }
  }else{
    newValue = newValue.replace(/[^0-9]/g, "");

    if(Number.parseInt(newValue) > 4096){
        newValue = "4096"; // or "" if you want to clear it
    }
  }

  return newValue;
}
