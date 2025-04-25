import plusSign from '@images/plusSign.svg'

export function InvisibleMatrixInputSpan({ dataCol, dataRow, value }) {
  return (
    <span
      data-col={dataCol}
      data-row={dataRow}
      className="absolute top-0 left-0 flex aspect-square
    w-[50px] items-center justify-center leading-none"
    >
      {value}
    </span>
  );
}

export function InvisibleProductSpan({ order }) {
  return (
    <div 
    data-order={order}
    className="w-[50px] absolute top-0 left-0 aspect-square 
    flex justify-center items-center product">
      <span
        className="font-smt  aspect-square  
    leading-none text-[30px] text-white transform-[scale(0)]
    origin-center   "
      ></span>
    </div>
  );
}

export function InvisiblePlusSign({order}){
  return(
    <div
    data-order={order}
    className="absolute top-0 left-0 flex justify-center
    items-center plus opacity-0"
    >
      <img
      className='w-[16px]'
       src={plusSign} alt="" />

    </div>
  )
}