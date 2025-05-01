import { largeStandardMultiplication, largeStrassenMultiplication,} from "./multiplication"

onmessage = (e) =>{
  const {matrix1Array,matrix2Array} = e.data
  const result = largeStandardMultiplication(matrix1Array,matrix2Array)
  postMessage(result)
}

