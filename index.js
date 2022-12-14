const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const snail = (arr) => {
  const originalDestructured = [...arr]
    .map((a) => {
      return a.join(',');
    })
    .join(',')
    .split(',');

  const len = arr.length;
  const matrixSize = len ** 2;
  const firstRow = arr[0].map((n) => n).join(',');
  let right = [];
  let bottom = arr[len - 1]
    .filter((n) => (n !== arr[len - 1][len - 1]) & (n !== arr[len - 1][0]))
    .join(',');
  let left = [];
  for (let i = 1; i < len; i++) {
    right.push(arr[i][len - 1]);
  }
  for (let j = len - 1; j > 0; j--) {
    left.push(arr[j][0]);
  }
  const outerShell = [firstRow, right.join(','), bottom, left.join(',')]
    .join(',')
    .split(',');
  if (matrixSize === 4) {
    return outerShell;
  } else {
    const remainingBlocks = matrixSize - outerShell.length;
    const startBlock =
      parseInt(
        originalDestructured
          .filter((n) => n === outerShell[outerShell.length - 1])
          .join(''),
      ) + 1;
    const startBlockIndex = originalDestructured.indexOf(`${startBlock}`);
    const topArr = firstRow.split(',').map((n) => parseInt(n));
    const rightArr = right;
    const bottomArr = bottom.split(',').map((n) => parseInt(n));
    const leftArr = left;
    let centerBlocks = [];
    let fullBlock = [];
    for (let k = 0; k < remainingBlocks; k++) {
      if (
        topArr[k] !== startBlockIndex + k &&
        rightArr[k] !== startBlockIndex + k &&
        bottomArr[k] !== startBlockIndex + k &&
        leftArr[k] !== startBlockIndex + k
      ) {
        centerBlocks.push(startBlockIndex + k + 1);
      }
    }

    fullBlock = [topArr, rightArr, bottomArr, leftArr, centerBlocks].join(',');
    return fullBlock;
  }
};

console.log(snail(array));
