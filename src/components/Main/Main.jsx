import { useState } from "react";
import StandardMatrix from "./StandardMatrix";
import Result from "./Result";

export default function Main() {
  const [matrix1Pos, setMatrix1Pos] = useState({ row: "3", col: "2" });
  const [matrix2Pos, setMatrix2Pos] = useState({ row: "2", col: "3" });
  const inputMatrixes = {
    matrix1Pos,
    setMatrix1Pos,
    matrix2Pos,
    setMatrix2Pos,
  };
  
  return (
    <main className="flex -translate-x-[100%]">
      <StandardMatrix inputMatrixes={inputMatrixes} />
      <Result row={matrix1Pos.row} col={matrix2Pos.col}/>
    </main>
  );
}
