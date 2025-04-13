import smallBracket from '@images/smallBracket.svg'
import { useMatrixSizeStore, useMultiplicationType, useStartedStore } from '../utils/store';
import { useEffect, useRef } from 'react';
import { motion, useAnimate } from 'motion/react';

export default function Header() {



  return (
    <header className="flex flex-col px-[60px]">
      <div className="flex justify-between">
        <MatrixSizeSection />
        <FastForwardSection />
      </div>
      <MultiplicationType />
    </header>
  );
}
function MatrixSizeSection() {
  const { matrixSize, setMatrixSize } = useMatrixSizeStore((state) => state);
  const started = useStartedStore((state) => state.started)
  const [sizeScope,animate] = useAnimate(null)

  useEffect(()=>{
    if(started === true){
      animate(sizeScope.current,{y:-150},{duration:1,ease:'easeInOut'})
    }
  },[started,animate,sizeScope])



  function SizeButton({ text }) {
    return <div
      onClick={() => {
        matrixSize !== text && setMatrixSize(text);
      }}
      className={`h-[50px] w-[150px] tracking-[-0.05em]
        ${matrixSize === text ? 'bg-white text-mainBlack' :
          'text-white border-white border-solid border cursor-pointer'}
           flex justify-center items-center
        text-[40px]`}
    >
      {text.toUpperCase()}
    </div>;
  }

  return (
    <div id='matrixSizeHeader'
     ref={sizeScope} className="flex flex-col mt-[40px] gap-[5px] ">
      <h3 className="text-[30px] tracking-[-0.03em]">MATRIXES</h3>
      <div className="flex gap-[33px]">
        <SizeButton text={"small"} />
        <SizeButton text={"large"} />
      </div>
    </div>
  );
}



function FastForwardSection() {

  const started = useStartedStore((state) => state.started)
  const [fastForwardScope,animate] = useAnimate(null)

  useEffect(()=>{
    if(started === true){
      animate(fastForwardScope.current,{y:100},{duration:0.7,ease:'easeInOut',delay:4,})
    }
  },[started,animate,fastForwardScope])
  
  return (
    <motion.div ref={fastForwardScope} className={`flex gap-[40px] mt-[50px] -translate-y-[100px]`}>
      <div className="flex gap-[10px] text-white">
        <div
          className="flex flex-col justify-center items-center
            text-white border border-solid border-white tracking-[-0.1em]
            w-[70px] h-[50px] text-[40px] "
        >
          2x
        </div>
        <div
          className="flex flex-col justify-center items-center
            text-white border border-solid border-white tracking-[-0.1em]
            w-[70px] h-[50px] text-[40px] "
        >
          4x
        </div>
        <div
          className="flex flex-col justify-center items-center
            text-white border border-solid border-white tracking-[-0.1em]
            w-[70px] h-[50px] text-[40px] "
        >
          8x
        </div>
        <div
          className="flex flex-col justify-center items-center
            text-white border border-solid border-white tracking-[-0.1em]
            w-[70px] h-[50px] text-[40px] "
        >
          16x
        </div>
      </div>
      <div
        className="flex flex-col justify-center items-center
          h-[50px] w-[120px] border border-solid border-white text-[40px]
          tracking-[-0.1em]"
      >
        SKIP
      </div>
    </motion.div>
  );
}

function MultiplicationType() {

  const { multiplicationType, setMultiplicationType } =
    useMultiplicationType((state) => state)
  const started = useStartedStore((state) => state.started)
  const [typeScope,animate] = useAnimate(null)

  useEffect(()=>{
    if(started === true){
      const typeHeaderAnimation = async()=>{
        const matrixSizeElement = document.getElementById('matrixSizeHeader')
        const matrixSizeXOffset = matrixSizeElement.getBoundingClientRect().left; 
        const standardButtonElement = document.getElementById('standardButtonHeader')
        const standardButtonXOffset = standardButtonElement.getBoundingClientRect().left;
        await animate(typeScope.current,{x:matrixSizeXOffset-standardButtonXOffset},
          {delay:1, duration:1,ease:'easeInOut'})
        await animate(typeScope.current,{y:-100},
          {duration:1,ease:'easeInOut'})
        await animate('.strassenType',{y:-100},
          {duration:0.8,ease:'easeInOut'})
        animate('.typeUnderline',{opacity:0},{duration:0.5,ease:'easeInOut'})
      }
      typeHeaderAnimation()
    }

  },[typeScope,animate,started])  


  return (<div
    ref={typeScope}
  className='flex gap-[90px] justify-center'>
    <div
     onClick={()=>{
      if(multiplicationType !== 'standard'){
        setMultiplicationType('standard')
      }
     }}
     id='standardButtonHeader'
     className={`flex items-center gap-[20px] standardType
          ${multiplicationType === 'standard' ? 'cursor-default' : 'cursor-pointer'} 
      `}>
      <img src={smallBracket} alt="" />
      <h3 className='text-[60px] tracking-[-0.05em] relative'>STANDARD
        <span className={`absolute bottom-0 left-[6px] w-[96%] h-[2px] bg-white
          typeUnderline
          ${multiplicationType === 'standard'? 'visible' : 'invisible'} 
          `}
        ></span>
      </h3>
      <img className='rotate-180' src={smallBracket} alt="" />
    </div>
    <div 
    onClick={()=>{
      
    }}
    className={`flex items-center gap-[20px] strassenType
          ${multiplicationType === 'strassen' ? 'cursor-default' : 'cursor-pointer'} 
      
      `}>
      <img src={smallBracket} alt="" />
      <h3 className='text-[60px] tracking-[-0.05em] relative'>STRASSEN
        <span className={`absolute bottom-0 left-[6px] w-[96%] h-[2px] bg-white
        typeUnderline
          ${multiplicationType === 'strassen'? 'visible' : 'invisible'} 
           `}></span>
      </h3>
      <img className='rotate-180' src={smallBracket} alt="" />
    </div>
  </div>);
}
