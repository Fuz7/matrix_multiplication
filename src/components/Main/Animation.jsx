export function InvisibleSpan({dataCol,dataRow,value}){
  return (
    <span 
    data-col={dataCol}
    data-row={dataRow} 
    className="absolute top-0 left-0 w-[50px] aspect-square
    flex justify-center items-center leading-none">{value}</span>
  )
}