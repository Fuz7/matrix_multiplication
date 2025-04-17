export function standardMultiplication(A, B) {
  const rowA = Number.parseInt(A.length)
  const colA = Number.parseInt(A[0].length)
  const rowB = Number.parseInt(B.length)
  const colB = Number.parseInt(B[0].length)


  if (colA !== rowB) {
    throw new Error("Matrix dimension do not match")
  }

  const result = Array(rowA).fill().map(()=>Array(colB).fill(0))

  const steps = []

  for(let i = 0; i < rowA;i++){
    for(let j = 0;j < colB;j++){
      let sum = 0;
      for(let k = 0; k < colA; k++){
        const product = A[i][k] * B[k][j]
        steps.push({a:{row:i,col:k},b:{row:k,col:j},type:'multiply'})
        sum+= product
      }
      result[i][j] = sum
      steps.push({value:sum,type:'add'})
    }
  }

  return {result:result,steps:steps}
}