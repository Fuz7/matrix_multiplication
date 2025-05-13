export function standardMultiplication(A, B) {
  const startTime = performance.now();

  const rowA = Number.parseInt(A.length);
  const colA = Number.parseInt(A[0].length);
  const rowB = Number.parseInt(B.length);
  const colB = Number.parseInt(B[0].length);

  if (colA !== rowB) {
    throw new Error("Matrix dimension do not match");
  }

  const result = Array(rowA)
    .fill()
    .map(() => Array(colB).fill(0));

  const steps = [];

  for (let i = 0; i < rowA; i++) {
    for (let j = 0; j < colB; j++) {
      let sum = 0;
      for (let k = 0; k < colA; k++) {
        const product = A[i][k] * B[k][j];
        steps.push({
          a: { row: i, col: k },
          b: { row: k, col: j },
          type: "multiply",
          value: product,
        });
        sum += product;
      }
      result[i][j] = sum;
      steps.push({ value: sum, type: "add" });
    }
  }
  const endTime = performance.now();
  const rawRuntimeMs = endTime - startTime;
  const runtimeMs = Number(rawRuntimeMs.toFixed(2));
  return { result: result, steps: steps, runtimeMs: runtimeMs };
}
export function largeStandardMultiplication(A, B) {
  const startTime = performance.now();

  const rowA = Number.parseInt(A.length);
  const colA = Number.parseInt(A[0].length);
  const rowB = Number.parseInt(B.length);
  const colB = Number.parseInt(B[0].length);

  if (colA !== rowB) {
    throw new Error("Matrix dimension do not match");
  }

  const result = Array(rowA)
    .fill()
    .map(() => Array(colB).fill(0));

  for (let i = 0; i < rowA; i++) {
    for (let j = 0; j < colB; j++) {
      let sum = 0;
      for (let k = 0; k < colA; k++) {
        const product = A[i][k] * B[k][j];
        sum += product;
      }
      result[i][j] = sum;
    }
  }
  const endTime = performance.now();
  const rawRuntimeMs = endTime - startTime;
  const runtimeMs = Number(rawRuntimeMs.toFixed(2));
  return { result: result, runtimeMs: runtimeMs };
}

export function largeStrassenMultiplication(A, B) {
  const startTime = performance.now();

  const n = A.length;

  if (A[0].length !== n || B.length !== n || B[0].length !== n) {
    throw new Error(
      "Strassen requires square matrices of the same size (power of 2)",
    );
  }

  const result = strassen(A, B);

  const endTime = performance.now();
  const runtimeMs = Number((endTime - startTime).toFixed(2));

  return { result, runtimeMs };
}
function strassen(A, B) {
  const n = A.length;

  // Base case: use standard multiplication for small sizes
  if (n <= 128) {
    return standardMultiply(A, B);
  }

  const mid = n / 2;

  const [A11, A12, A21, A22] = splitMatrix(A, mid);
  const [B11, B12, B21, B22] = splitMatrix(B, mid);

  const M1 = strassen(add(A11, A22), add(B11, B22));
  const M2 = strassen(add(A21, A22), B11);
  const M3 = strassen(A11, subtract(B12, B22));
  const M4 = strassen(A22, subtract(B21, B11));
  const M5 = strassen(add(A11, A12), B22);
  const M6 = strassen(subtract(A21, A11), add(B11, B12));
  const M7 = strassen(subtract(A12, A22), add(B21, B22));

  const C11 = add(subtract(add(M1, M4), M5), M7);
  const C12 = add(M3, M5);
  const C21 = add(M2, M4);
  const C22 = add(subtract(add(M1, M3), M2), M6);

  return combine(C11, C12, C21, C22);
}
function add(A, B) {
  const n = A.length;
  const result = Array(n)
    .fill()
    .map(() => Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }
  return result;
}

function subtract(A, B) {
  const n = A.length;
  const result = Array(n)
    .fill()
    .map(() => Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = A[i][j] - B[i][j];
    }
  }
  return result;
}

function splitMatrix(M, size) {
  const M11 = Array(size);
  const M12 = Array(size);
  const M21 = Array(size);
  const M22 = Array(size);

  for (let i = 0; i < size; i++) {
    M11[i] = Array(size);
    M12[i] = Array(size);
    M21[i] = Array(size);
    M22[i] = Array(size);
    for (let j = 0; j < size; j++) {
      M11[i][j] = M[i][j];
      M12[i][j] = M[i][j + size];
      M21[i][j] = M[i + size][j];
      M22[i][j] = M[i + size][j + size];
    }
  }

  return [M11, M12, M21, M22];
}
function combine(C11, C12, C21, C22) {
  const size = C11.length;
  const result = Array(size * 2);

  for (let i = 0; i < size * 2; i++) {
    result[i] = Array(size * 2);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i][j] = C11[i][j];
      result[i][j + size] = C12[i][j];
      result[i + size][j] = C21[i][j];
      result[i + size][j + size] = C22[i][j];
    }
  }

  return result;
}
function standardMultiply(A, B) {
  const n = A.length;
  const result = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      for (let j = 0; j < n; j++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  return result;
}

export function isValidPowerOfTwo(n) {
  const num = Number(n);
  return num >= 1 && num <= 4096 && (num & (num - 1)) === 0;
}

export function strassenMultiplicationWithSteps(A, B) {
  const startTime = performance.now();

  const n = A.length;
  if (A[0].length !== n || B.length !== n || B[0].length !== n) {
    throw new Error(
      "Strassen requires square matrices of the same size (power of 2)",
    );
  }

  const steps = [];
  const result = strassenRecursive(A, B, steps);

  const endTime = performance.now();
  const runtimeMs = Number((endTime - startTime).toFixed(2));

  return { result, steps, runtimeMs };
}

function strassenRecursive(A, B, steps) {
  const n = A.length;

  const mid = n / 2;

  const [A11, A12, A21, A22] = splitMatrixs(A, mid);
  const [B11, B12, B21, B22] = splitMatrixs(B, mid);

  const m1 = (A11 + A22) * (B11 + B22);
  const m2 = (A21 + A22) * B11;
  const m3 = A11 * (B12 - B22);
  const m4 = A22 * (B21 - B11);
  const m5 = (A11 + A12) * B22;
  const m6 = (A21 - A11) * (B11 + B12);
  const m7 = (A12 - A22) * (B21 + B22);
  console.log(A11);
  steps.push({
    status: "setup",
    type: "add",
    matrix: "a",
    a: { row: 0, col: 0 },
    b: { row: 1, col: 1 },
    value: A11 + A22,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "add",
    matrix: "b",
    a: { row: 1, col: 0 },
    b: { row: 1, col: 1 },
    value: B11 + B22,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m1, order: 1 });
  steps.push({
    status: "setup",
    type: "add",
    matrix: "a",
    a: { row: 1, col: 0 },
    b: { row: 1, col: 1 },
    value: A21 + A22,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "standby",
    matrix: "b",
    a: { row: 0, col: 0 },
    value: B11,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m2, order: 2 });
  steps.push({
    status: "setup",
    type: "standby",
    matrix: "a",
    a: { row: 0, col: 0 },
    value: A11,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "subtract",
    matrix: "b",
    a: { row: 1, col: 0 },
    b: { row: 1, col: 1 },
    value: B12 - B22,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m3, order: 3 });
  steps.push({
    status: "setup",
    type: "standby",
    matrix: "a",
    a: { row: 1, col: 1 },
    value: A22,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "subtract",
    matrix: "b",
    a: { row: 1, col: 0 },
    b: { row: 0, col: 0 },
    value: B21 - B11,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m4, order: 4 });
  steps.push({
    status: "setup",
    type: "add",
    matrix: "a",
    a: { row: 0, col: 0 },
    b: { row: 0, col: 1 },
    value: A11 + A12,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "standby",
    matrix: "b",
    a: { row: 1, col: 1 },
    value: B22,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m5, order: 5 });
  steps.push({
    status: "setup",
    type: "subtract",
    matrix: "a",
    a: { row: 1, col: 0 },
    b: { row: 0, col: 0 },
    value: A21 - A11,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "add",
    matrix: "b",
    a: { row: 0, col: 0 },
    b: { row: 0, col: 1 },
    value: B11 + B12,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m6, order: 6 });
  steps.push({
    status: "setup",
    type: "subtract",
    matrix: "a",
    a: { row: 0, col: 1 },
    b: { row: 1, col: 1 },
    value: A12 - A22,
    order: 1,
  });
  steps.push({
    status: "setup",
    type: "add",
    matrix: "b",
    a: { row: 1, col: 0 },
    b: { row: 1, col: 1 },
    value: B21 + B22,
    order: 2,
  });
  steps.push({ status: "setup", type: "combine", value: m7, order: 7 });
  steps.push({ status: "output", type: "first", a: "1" }); // first step

  steps.push({ status: "output", type: "add", a: "4" });
  steps.push({ status: "output", type: "subtract", a: "5" });
  steps.push({ status: "output", type: "add", a: "7" });
  steps.push({ status: "output", a:{row:0,col:0},type: "combine", value: m1 + m4 - m5 + m7 });

  // Previously: add a=3, b=5 → now split into two add steps
  steps.push({ status: "output", type: "first", a: "3" });
  steps.push({ status: "output", type: "add", a: "5" });
  steps.push({ status: "output", a:{row:0,col:1} ,type: "combine", value: m3 + m5 });

  // Previously: add a=2, b=4
  steps.push({ status: "output", type: "first", a: "2" });
  steps.push({ status: "output", type: "add", a: "4" });
  steps.push({ status: "output", a:{row:1,col:0} , type: "combine", value: m2 + m4 });

  // Previously: subtract a=1, b=2
  steps.push({ status: "output", type: "first", a: "1" });
  steps.push({ status: "output", type: "subtract", a: "2" });

  steps.push({ status: "output", type: "add", a: "3" });
  steps.push({ status: "output", type: "add", a: "6" });
  steps.push({ status: "output", a:{row:1,col:1} ,type: "combine", value: m1 - m2 + m3 + m6 });
  if (n <= 2) {
    return standardMultiplyWithSteps(A, B);
  }

  const M1 = strassenRecursive(adds(A11, A22), adds(B11, B22));
  const M2 = strassenRecursive(adds(A21, A22), B11);
  const M3 = strassenRecursive(A11, subtracts(B12, B22));
  const M4 = strassenRecursive(A22, subtracts(B21, B11));
  const M5 = strassenRecursive(adds(A11, A12), B22);
  const M6 = strassenRecursive(subtracts(A21, A11), adds(B11, B12));
  const M7 = strassenRecursive(subtracts(A12, A22), adds(B21, B22));

  const C11 = adds(subtracts(adds(M1, M4), M5), M7);
  const C12 = adds(M3, M5);
  const C21 = adds(M2, M4);
  const C22 = adds(subtracts(adds(M1, M3), M2), M6);

  return combines(C11, C12, C21, C22);
}

function adds(A, B) {
  const n = A.length;
  const result = Array(n)
    .fill()
    .map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }
  return result;
}

function subtracts(A, B) {
  const n = A.length;
  const result = Array(n)
    .fill()
    .map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = A[i][j] - B[i][j];
    }
  }
  return result;
}

function standardMultiplyWithSteps(A, B) {
  const n = A.length;
  const result = Array(n)
    .fill()
    .map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        const product = A[i][k] * B[k][j];

        sum += product;
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function splitMatrixs(M, size) {
  const M11 = [],
    M12 = [],
    M21 = [],
    M22 = [];
  for (let i = 0; i < size; i++) {
    M11.push(M[i].slice(0, size));
    M12.push(M[i].slice(size));
    M21.push(M[i + size].slice(0, size));
    M22.push(M[i + size].slice(size));
  }
  return [M11[0][0], M12[0][0], M21[0][0], M22[0][0]];
}

function combines(C11, C12, C21, C22) {
  const size = C11.length;
  const result = Array(size * 2)
    .fill()
    .map(() => Array(size * 2).fill(0));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      result[i][j] = C11[i][j];
      result[i][j + size] = C12[i][j];
      result[i + size][j] = C21[i][j];
      result[i + size][j + size] = C22[i][j];
    }
  }
  return result;
}
