let equation = [];
let x = 0;
let decimalUsed = false;

let button = document.getElementsByClassName('button');
for (let i = 0; i < button.length; i++) {
  //add a click event listener for each button
  button[i].addEventListener('click', function() {
    makeCalc(button[i]);
  })
}

const makeCalc = (key) => {
  //retreive content of button
  let keyStr = key.innerHTML;
  let keyType;
  
  //if AC button is pressed then clear screen
  if (keyStr === 'AC') {
    clearScreen();
    return;
  }
  //if CE button is pressed then just clear the last entered number
  //else clear screen
  if (keyStr === 'CE') {
    if (equation.length >= 1 && checkPreviousType() === "number") {
      updateScreen().innerHTML = "";
      while (equation.length >= 1 && (checkPreviousType() === "number" || checkPreviousType() === "decimal")) {
        if (checkPreviousType() === "decimal") {
          decimalUsed = false;
        }
        equation.splice(-1,1);
      }
    } else {
      clearScreen();
    }    
    return;
  }

  switch (keyStr) {
    case '%':
      keyType = "operator";
      key = '%';
      break;
    case '÷':
      keyType = "operator";
      key = '/';
      break;
    case 'x':
      keyType = "operator";
      key = '*';
      break;
    case '-':
      keyType = "operator";
      key = '-';
      break;
    case '+':
      keyType = "operator";
      key = '+';
      break;
    case '=':
      keyType = "equals";
      key = '=';
      break;
    case '.':
      keyType = "decimal";
      key = '.';
      break;
    case '0':
      keyType = "number";
      key = '0';
      break;
    default:
      keyType = "number";
      key = parseInt(keyStr);
      break;
  }

  //if equals button is pressed
  if (key === '=') {
    //check than last digit is a number and delete it if it is not
    if (checkPreviousType() !== "number") {
      equation.splice(-1,1);
    }
    //join array
    equation = equation.join('');
    //evaluate equation to get the result
    x = eval(equation);
    //if the answer is undefined (no inputs)
    if (x === undefined) {
      //answer is 0
      x = 0;
    } else {
      x = x.toString();
      //if answer has a decimal
      if (x.indexOf('.') > -1) {
        //trim it down to 3 decimal places
        x = x.slice(0, x.indexOf('.') + 4);
      }
      //if answer is greater than 10 chars, trim down to 10
      if (x.length > 10) {
        x = x.slice(0, 10);
      }
    }
    updateScreen().innerHTML = x;
    console.log(equation + " = " + x);
    equation = [];
    return;
  }
  
  
  //when button is pressed. Take in to account different combinations
  if (equation.length === 0 && keyType === "number") {
    //if no button has been pressed yet and a number is pressed
    updateScreen().innerHTML = keyStr;
    decimalUsed = false;
  } else if (equation.length === 0 && keyType === "decimal") {
    //if no button has been pressed yet and decimal is pressed
    decimalUsed = true;
    equation.push("0");
    updateScreen().innerHTML = "0" + keyStr;
  } else if (equation.length === 0 && keyType === "operator") {
    //if no button has been pressed yet and an operator is pressed
    equation.push(x);
    updateScreen().innerHTML = keyStr;
    decimalUsed = false;
  } else if (equation.length > 0 && keyType === "number") {
    //if a number is pressed
    if (updateScreen().innerHTML.length >= 10) {
      return;
    }
    if (checkPreviousType() === "number" || checkPreviousType() === "decimal") {
      updateScreen().innerHTML += keyStr;
    } else {
      updateScreen().innerHTML = keyStr;
    }
  } else if (equation.length > 0 && keyType === "decimal") {
    //if decimal is pressed
    if (decimalUsed) {
      return;
    } else {
      if (checkPreviousType() === "number") {
        updateScreen().innerHTML += keyStr;
      } else {
        equation.push("0");
        updateScreen().innerHTML = "0" + keyStr;
      }      
      decimalUsed = true;
    }
  } else if (equation.length > 0 && keyType === "operator") {
    //if an operator is pressed
    if (checkPreviousType() === "operator") {
      equation.splice(-1,1);
    }
      updateScreen().innerHTML = keyStr;
      decimalUsed = false;
  } else {
    updateScreen().innerHTML = keyStr;
  }
  
  //for button that is pressed add it to the equation array
  equation.push(key);
};

//function to update screen
const updateScreen = () => {
  return document.getElementById('screen');
};

//function to check the type of the last key in the equation
const checkPreviousType = () => {
  let prevKeyType;
  switch(equation[equation.length-1]) {
    case '%':
      prevKeyType = "operator";
      break;
    case '/':
      prevKeyType = "operator";
      break;
    case '*':
      prevKeyType = "operator";
      break;
    case '-':
      prevKeyType = "operator";
      break;
    case '+':
      prevKeyType = "operator";
      break;
    case '.':
      prevKeyType = "decimal";
      break;
    default:
      prevKeyType = "number";
      break;
  }
  return prevKeyType;
};

//function to clear the screen and reset values
function clearScreen() {
  updateScreen().innerHTML = "0";
  equation = [];
  x = 0;
}