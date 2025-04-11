export default function DimensionInput({matrixPos,setMatrixPos}){

  // 


  return (
    <div className="flex justify-center items-center gap-[30px]">
      <input 
      onInput={(e)=>{
        const {value} = e.target
        const newValue = value === '' ? '' : value.replace(/[^1-4]/g, '').slice(0, 1); // keep only first digit 1–4 or empty

        setMatrixPos({...matrixPos,row:newValue})
      }}
      value={matrixPos.row}
      className="w-[30px] h-[34px] border-b-[2px] border-white text-center" type="text" />
      <span>x</span>
      <input 
      onInput={(e)=>{
        const {value} = e.target
        const newValue = value === '' ? '' : value.replace(/[^1-4]/g, '').slice(0, 1); // keep only first digit 1–4 or empty

        setMatrixPos({...matrixPos,col:newValue})
      }}
      value={matrixPos.col}
      className="w-[30px] h-[34px] border-b-[2px] border-white text-center" type="text" />
    </div>
  )
}