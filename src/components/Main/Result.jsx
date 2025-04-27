import Matrix from "./Matrix";

export default function Result({ row, col }) {
  return (
    <div className="pl-[300px] flex min-w-[100%] gap-[150px] pt-[120px]">
      <div className="h-fit">
      <Matrix row={row} column={col} id={"resultMatrix"} matrixOutput={true} />
      </div>
        
      <div className="flex flex-col gap-[50px]">
        <h2 className="text-[50px] leading-none tracking-[-0.08em] ">RESULTS</h2>
        <div className="flex flex-col gap-[30px]">
          <div className="flex gap-[70px]">
            <h3 className="text-[35px] leading-none tracking-[-0.06em] w-[260px]">MATRIX SIZE:</h3>
            <div className="w-[190px] relative">
            <div className="text-right tracking-tight">3x3</div>
            <span className="w-full absolute h-[2px] bg-white bottom-[-1px]"></span>
            </div>
          </div>
          <div className="flex gap-[70px]">
            <h3 className="text-[35px] leading-none tracking-[-0.06em] max-w-[260px]">ALGORITHM EXECUTION TIME:</h3>
            <div className="w-[190px] relative flex items-end justify-end">
            <div className="text-right tracking-tight">12.2 ms</div>
            <span className="w-full absolute h-[2px] bg-white bottom-[-1px]"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
