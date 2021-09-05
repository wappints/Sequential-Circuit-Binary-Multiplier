// Sequential Circuit Binary Multiplier
// TODO: Fix the compare() na, pag inadd hindi siya add lang since binary.
// TODO: Add validator for MAX of 16-bit length yung multiplier and multiplicand.
// TODO: Input: binary (use minimum number of bits; max up to 16-bit)
// TODO: Output: Option to show either step-by-step or “all” mode of the A and Q output after every step with option to output result in TEXT FILE.

// Initializations
let M = "0100"; // Multiplicand // TODO: update this.
let Q = "0101"; // Multiplier // TODO: update this.
let Q1 = "0";
let len = checkLength(); // Check the length of the multiplicand and multiplier.
let A = getA(M); // Pads the zeros.
let negM = get2sComplement(M); // Gets the 2's complement of M.

// TODO: For checking -- remove afterwards
// ---------------------------------------------------------------------------------------
console.log("XX-------------------------------------XX");
print(negM, M, A, Q, Q1); // TODO: remove this afterwards
console.log("XX-------------------------------------XX"); // TODO: remove this afterwards
console.log(); // TODO: remove this afterwards
// ---------------------------------------------------------------------------------------

let tempString = A.concat(Q, Q1); // Concatinate

program(len, tempString);

// This function is used to compute for the sequential binary circuit.
// Parameter: len, the length of the binaries; tempString, concatinated string.
function program(len, tempString) {
  for (let i = 0; i < len; i++) {
    console.log(i + 1 + ".)");
    tempString = compare(tempString);
    console.log("= " + tempString);
    console.log("---------------------------------------");
  }
}

// TODO: For checking -- remove afterwards
// ---------------------------------------------------------------------------------------
function print(negM, M, A, Q, Q1) {
  console.log("  -M: " + negM);
  console.log("  M: " + M);
  console.log("  A: " + A + "  Q: " + Q + " Q-1: " + Q1);
  return true;
}
// ---------------------------------------------------------------------------------------

// This function checks the length of the multiplicand and multiplier.
// Otherwise, adjust it so that it will have the same length.
// Returns: length of the binary.
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

// This function is used to get A (zeros)
// Parameter: M, the multiplicand.
// Returns: The padded zeros with the same length as M & Q.
function getA(M) {
  return padZero(0, M.length);
}

// This function is used to pad zeros.
// Parameter: num, the number to be padded; length to be padded.
// Returns: padded zeros.
function padZero(num, digits) {
  let temp = parseInt(num);
  return Array(Math.max(digits - String(temp).length + 1, 0)).join(0) + temp;
}

// This function is used to pad ones.
// Parameter: num, the number to be padded; length to be padded.
// Returns: padded ones.
function padOne(num, digits) {
  return Array(Math.max(digits - String(num).length + 1, 0)).join(1) + num;
}

// This function is used to replace a certain character in the string.
// Parameter: str, string; index to be replaced, character to be replaced.
// Returns: updated string.
function replaceAtIndex(str, index, char) {

    
  console.log("String: " + str + "  Index: " + index + " Char:" + char);

  if (index > str.length - 1) {
    return str;
  } else {

    
    cnt = 0;
    flag = 0;

    x = str.substring(0, index) + char + str.substring(index + 1);
    
    for (i = 0; i < x.length; i++)
    {
      if (x[i] == '2')
      {
        x = x.substring(0, i) + '0' + x.substring(i + 1);
        i = x.length
        flag = 1;
      }
        
      else
        cnt++;
    }
    
    if (flag == 1)
    {
    for (i = cnt-1; i >= 0; i--)
    {
      
      if (x[i] == '1')
        x = x.substring(0, i) + '0' + x.substring(i + 1);
      else if (x[i] == '0')
      {
        x = x.substring(0, i) + '1' + x.substring(i + 1);
        i = 0;
      }
    }
  }
    return x;
  }
}

// This function is used to get the 2's complement of M.
// Parameter: M, the multiplicand.
// Returns: M.
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
// This function checks the last digit of Q and Q-1
// Parameter: tempString, the concatinated string.
// Returns: tempString.
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
        console.log("A-M");
        tempString = replaceAtIndex(tempString,i,(parseInt(tempString[i]) + parseInt(negM[i])).toString());
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
        console.log("A+M");
        tempString = replaceAtIndex(tempString,i,(parseInt(tempString[i]) + parseInt(M[i])).toString());
      }
    }
  }
  return SAR(tempString);
}

// This function pertains to shift arithmetic right.
// Parameter: tempString, the concatinated string.
// Returns: tempString.
function SAR(tempString) {
  tempString = tempString[0].concat(tempString);
  tempString = tempString.slice(0, -1);

  return tempString;
}
