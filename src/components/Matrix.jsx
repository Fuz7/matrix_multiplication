export default function Matrix(){
  return(
    <div className="flex  gap-[10px]">
    <LeftBracket rowSize={3}/>
    <RightBracket rowSize={3} />
    </div>
  )
}

function LeftBracket({rowSize}){
  const rowHeight = {
    1:"h-[90px]",
    2:'h-[160px]',
    3:'h-[230px]',
    4:'h-[300px]'
  }
  
  const containerHeight = rowHeight[rowSize]


  return(
    <div className={`${containerHeight} w-[40px] relative `}>
      <div className="absolute left-0 h-full bg-matrixBracket w-[10px]"></div>
      <div className="absolute top-0 left-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
      <div className="absolute bottom-0 left-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
    </div>
  )
}

function RightBracket({rowSize}){
  const rowHeight = {
    1:"h-[90px]",
    2:'h-[160px]',
    3:'h-[230px]',
    4:'h-[300px]'
  }
  
  const containerHeight = rowHeight[rowSize]


  return(
    <div className={`${containerHeight} w-[40px] relative `}>
      <div className="absolute right-0 h-full bg-matrixBracket w-[10px]"></div>
      <div className="absolute top-0 right-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
      <div className="absolute bottom-0 right-[10px] bg-matrixBracket h-[10px] w-[30px]"></div>
    </div>
  )
}

