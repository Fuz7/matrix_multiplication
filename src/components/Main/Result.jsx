import { createPortal } from "react-dom";
import Matrix from "./Matrix";
import {
  useIsMultiplicationFinished,
  useIsResultButtonVisible,
} from "../../utils/store";

export default function Result({ row, col }) {
  return (
    <div className="flex min-w-[100%] gap-[150px] pt-[120px] pl-[300px]">
      <div className="h-fit">
        <Matrix
          row={row}
          column={col}
          id={"resultMatrix"}
          matrixOutput={true}
        />
      </div>

      <div className="flex flex-col gap-[50px]">
        <h2 className="text-[50px] leading-none tracking-[-0.08em] ">
          RESULTS
        </h2>
        <div className="flex flex-col gap-[30px]">
          <div className="flex gap-[70px]">
            <h3 className="w-[260px] text-[35px] leading-none tracking-[-0.06em]">
              MATRIX SIZE:
            </h3>
            <div className="relative flex w-[190px] justify-end">
              <div className="tracking-tight">3x3</div>
              <span className="absolute bottom-[-1px] h-[2px] w-full bg-white"></span>
            </div>
          </div>
          <div className="flex gap-[70px]">
            <h3 className="max-w-[260px] text-[35px] leading-none tracking-[-0.06em]">
              ALGORITHM EXECUTION TIME:
            </h3>
            <div className="relative flex w-[190px] items-end justify-end">
              <div className="text-right tracking-tight">12.2 ms</div>
              <span className="absolute bottom-[-1px] h-[2px] w-full bg-white"></span>
            </div>
          </div>
        </div>
      </div>
      {createPortal(<ResultButton />, document.body)}
    </div>
  );
}

function ResultButton() {
  const isResultVisible = useIsResultButtonVisible(
    (state) => state.isResultVisible,
  );
  const setIsMultiplicationFinished = useIsMultiplicationFinished(
    (state) => state.setIsMultiplicationFinished,
  );

  return (
    <div
      onClick={()=>setIsMultiplicationFinished(true)}
      className={`h-[74px] w-[250px] text-[64px] font-smt
        ${isResultVisible ? "visible" : "invisible"} fixed bottom-[50px] 
        left-1/2 flex -translate-x-1/2 cursor-pointer items-center justify-center
        self-end border border-solid border-white tracking-[-0.07em]
    text-white`}
    >
      RESULT
    </div>
  );
}
