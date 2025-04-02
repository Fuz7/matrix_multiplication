import smallBracket from '@images/smallBracket.svg'

export default function Header() {
  return (
    <header className="flex flex-col px-[60px]">
      <div className="flex justify-between">
        <MatrixSizeSection />
        <FastForwardSection />
      </div>
      <div className='flex gap-[90px] justify-center'>
        <div className='flex items-center gap-[20px]'>
          <img src={smallBracket} alt="" />
          <h3 className='text-[60px] tracking-[-0.05em]'>STANDARD</h3>
          <img className='rotate-180' src={smallBracket} alt="" />
        </div>
        <div className='flex items-center gap-[20px]'>
          <img src={smallBracket} alt="" />
          <h3 className='text-[60px] tracking-[-0.05em]'>STRASSEN</h3>
          <img className='rotate-180' src={smallBracket} alt="" />
        </div>
      </div>
    </header>
  );
}
function MatrixSizeSection() {
  return (
    <div className="flex flex-col mt-[40px]">
      <h3 className="text-[30px] tracking-[-0.03em]">MATRIXES</h3>
      <div className="flex gap-[33px]">
        <div
          className="h-[50px] w-[150px] tracking-[-0.05em]
      bg-white text-mainBlack flex justify-center items-center
      text-[40px]"
        >
          SMALL
        </div>
        <div
          className="h-[50px] w-[150px] tracking-[-0.05em]
       text-white flex justify-center items-center 
      text-[40px] border border-white border-solid"
        >
          LARGE
        </div>
      </div>
    </div>
  );
}

function FastForwardSection() {
  return (
    <div className="flex gap-[40px] mt-[50px]">
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
    </div>
  );
}
