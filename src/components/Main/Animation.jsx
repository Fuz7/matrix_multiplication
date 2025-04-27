import plusSign from '@images/plusSign.svg'
import { motion } from 'motion/react';

export function InvisibleMatrixInputSpan({ dataCol, dataRow, value }) {
  return (
    <motion.span
      data-col={dataCol}
      data-row={dataRow}
      className="absolute top-0 left-0 flex aspect-square
    w-[50px] items-center justify-center leading-none"
    >
      {value}
    </motion.span>
  );
}

export function InvisibleProductSpan({ order }) {
  
  return (
    <motion.div 
    data-order={order}
    className="w-[30px] absolute top-0 left-0 aspect-square 
    flex justify-center items-center product">
      <span
        className="font-smt  aspect-square  
    leading-none text-[30px] text-white transform-[scale(0)]
       "
      ></span>
    </motion.div>
  );
}

export function InvisiblePlusSign({order}){
  return(
    <motion.div
    data-order={order}
    className="absolute top-0 left-0 flex justify-center
    items-center plus opacity-0"
    >
      <img
      className='w-[16px]'
       src={plusSign} alt="" />

    </motion.div>
  )
}

export function InvisibleSumSpan(){
  return(
    <motion.div 
    id='invisibleSum'
    className="w-[50px] absolute top-0 left-0 aspect-square 
    flex justify-center items-center product">
      <span
        className="font-smt  aspect-square  text-center
    leading-none text-[30px] text-white transform-[scale(0)]
    flex items-center justify-center
    origin-center"
      ></span>
    </motion.div>
  )
}