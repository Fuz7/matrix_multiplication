import DimensionInput from "./DimensionInput";
import largeXSymbol from '@images/largeXSymbol.svg'
export default function LargeMatrix({inputMatrixes}){
  const { matrix1Pos, setMatrix1Pos, matrix2Pos, setMatrix2Pos } =
    inputMatrixes;

  return(
    <main className="flex min-w-[100%] flex-col items-center
    min-h-[calc(100vh-204px)] justify-between">
      <div></div>
      <div className="flex gap-[150px] mb-[204px]">
        <DimensionInput matrixPos={matrix1Pos} setMatrixPos={setMatrix1Pos} />
        <img src={largeXSymbol} alt="" />
        <DimensionInput matrixPos={matrix2Pos} setMatrixPos={setMatrix2Pos}/>
      </div>
      <div></div>
    </main>
  )
}

