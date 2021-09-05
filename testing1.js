// Sequential Circuit Binary Multiplier

// Initializations
let M = "0100"; // Multiplicand
let Q = "0101"; // Multiplier
Q1 = "0";

len = checkLength(); // Check the length of the multiplicand and multiplier.
let A = getA(M); // Pads the zeros.
negM = get2sComplement(M); // Gets the 2's complement of M.

print(negM, M, A, Q, Q1); // TODO: remove this afterwards
console.log(); // TODO: remove this afterwards

let tempString = A.concat(Q, Q1); // Concatinate

program(len, tempString);

function program(len, tempString) {
  for (let i = 0; i < len; i++) {
    tempString = compare(tempString);
    console.log(tempString);
  }
}

// TODO: For checking -- remove afterwards
function print(negM, M, A, Q, Q1) {
  console.log("-M: " + negM);
  console.log("M: " + M);
  console.log("A: " + A + "  Q: " + Q + " Q-1: " + Q1);
  return true;
}

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
  return lenM > lenQ ? lenM : lenQ;
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

function replaceAtIndex(str, index, char) {
  console.log("String: " + str + "  Index: " + index + " Char:" + char);
  if (index > str.length - 1) {
    return str;
  } else {
    return str.substring(0, index) + char + str.substring(index + 1);
  }
}

function get2sComplement(M) {
  let lenM = M.length;
  let isOne = true;

  for (var i = lenM - 1; i > -1; i--) {
    let temp = parseInt(M.charAt(i));

    if (!isOne) {
      M = replaceAtIndex(M, i, (1 - temp).toString());
    }

    if (temp == 1) {
      isOne = false;
    }
  }
  return M;
}

// TODO: Fix the values when adding the binaries.
function compare(tempString) {
  let _len = tempString.length;

  if (tempString[_len - 2] == "1") {
    // if 1 & 1
    if (tempString[_len - 1] == "1") {
      console.log("Do nothing.");
    }
    // if 1 & 0
    else {
      for (let i = 0; i < A.length; i++) {
        tempString = replaceAtIndex(
          tempString,
          i,
          (parseInt(tempString[i]) + parseInt(negM[i])).toString()
        );
      }
    }
  } else {
    // if 0 & 0
    if (tempString[_len - 1] == "0") {
      console.log("Do nothing.");
    }
    // if 0 & 1
    else {
      for (let i = 0; i < A.length; i++) {
        tempString = replaceAtIndex(
          tempString,
          i,
          (parseInt(tempString[i]) + parseInt(M[i])).toString()
        );
      }
    }
  }
  let SARstring = SAR(tempString);
  return SARstring;
}

function SAR(tempString) {
  tempString = tempString[0].concat(tempString);
  tempString = tempString.slice(0, -1);

  return tempString;
}
