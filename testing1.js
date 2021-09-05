// Sequential Circuit Binary Multiplier

// Initializations
let M = "0100"; // Multiplicand
let Q = "0101"; // Multiplier
Q1 = "0";

checkLength(); // Check the length of the multiplicand and multiplier.
let A = getA(M); // Pads the zeros.

negM = get2sComplement(M); // Gets the 2's complement of M.
console.log(negM);

// This function checks the length of the multiplicand and multiplier.
// Otherwise, adjust it so that it will have the same length.
function checkLength() {
  let lenM = M.length;
  let lenQ = Q.length;

  if (lenM != lenQ) {
    if (lenM < lenQ) {
      if (M[0] == "0") {
        M = padZero(M, lenQ);
      } else {
        M = padOne(M, lenQ);
      }
    } else {
      if (Q[0] == "0") {
        Q = padZero(Q, lenM);
      } else {
        Q = padOne(Q, lenM);
      }
    }
  }
  return true;
}

function getA(M) {
  return padZero(0, M.length);
}

function padZero(num, digits) {
  let temp = parseInt(num);
  return Array(Math.max(digits - String(temp).length + 1, 0)).join(0) + temp;
}

function padOne(num, digits) {
  return Array(Math.max(digits - String(num).length + 1, 0)).join(1) + num;
}

function replaceAt(index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
}

function get2sComplement(M) {
  let lenM = M.length;
  let isOne = true;

  for (var i = lenM - 1; i > -1; i--) {
    let temp = parseInt(M.charAt(i));

    if (!isOne) {
      console.log((1 - temp).toString());
      M = M.replaceAt(i, (1 - temp).toString()); //TODO: Update the character in a string.
    }

    if (temp == 1) {
      isOne = false;
    }
    console.log("After: " + M);
  }
  return M;
}
