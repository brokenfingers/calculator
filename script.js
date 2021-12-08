
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;   
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;




let userOutput;
let numbers;
let operators;
let opWasReset = true;
let currentResult = '';
let opList = [];



window.addEventListener("load", onPageLoad);


function onPageLoad() {
    userOutput = document.querySelector('#userOutput');
    userOutput.textContent = '';
    
    numbers = [...document.querySelectorAll('div .number')];
    operators = [...document.querySelectorAll('div .funct')];

    document.addEventListener('keydown', kbdPressed)


    numbers.forEach(itm => {
        itm.addEventListener('click', numberClicked);
    });


    operators.forEach(itm => {
        itm.addEventListener('click', operatorClicked );
    });

}

function kbdPressed(e) {
    
    if( opWasReset == true) {
        userOutput.textContent = '';
        opWasReset = false;
    }
    if(Number.isInteger(Number.parseInt(e['key']))) {
        passNumber(e['key']);
        return;
    }
    switch(e['key']) {
        case '/':
            pushToArray(e['key']);
            break;
        case '*':
            pushToArray('X');
            break;
        case 'Backspace':
            backspacePressed();
            break;
        case '-':
            pushToArray(e['key']);
            break;
        case '+':
            pushToArray(e['key']);
            break;
        case 'Enter':
            if(opList.length<2) {
                return;
            }
            equalPressed();
            break;
    }
}

function backspacePressed() {
    let tempOutputArray = Array.from(userOutput.textContent);
    tempOutputArray.pop();
    userOutput.textContent = tempOutputArray.join('');
}

function equalPressed() {
    opList.push(userOutput.textContent);
    operate(opList[0], opList[2], opList[1]);
}

function operatorClicked() {
    switch(this.textContent) {
        case '←':
            backspacePressed();
            return;
            break;
        case 'C':
            clearAll();
            return;
            break;
        case 'CE':
            userOutput.textContent = '0';
            return;
            break;
        case '=':
            if(opList.length<2) {
                return;
            }
            equalPressed();
            return;
            break;
    }
    pushToArray(this.textContent)
}

function pushToArray(oprtr) {
    if(opList.length == 2) {
        opList.push(userOutput.textContent);
        currentResult = userOutput.textContent;
        operate(opList[0], opList[2], opList[1]);

        
        opList.push(userOutput.textContent);
        opList.push(oprtr);
        opWasReset = true;
        return;
    }

    opList.push(userOutput.textContent);
    opList.push(oprtr);
    opWasReset = true;
}

function operate(a, b, c) {
    clearAll();
    a = parseFloat(a);
    b = parseFloat(b);
    
        switch(c) {
            case '/':
                userOutput.textContent = (a==0 || b == 0) ? "Oh no! Error" : divide(a, b);
                break;
            case '+':
                userOutput.textContent = add(a, b);
                opWasReset = true;
                break;
            case '-':
                userOutput.textContent = subtract(a, b);
                break;
            case 'X':
                userOutput.textContent = multiply(a, b);
                break;
                
        }               
}


function clearAll()
{
    opWasReset = true;
    userOutput.textContent = 0;
    opList = [];
}


function numberClicked(){
    
    passNumber(this.textContent);
}

function passNumber(nbrm) {
     
    if( opWasReset == true) {
        userOutput.textContent = 0;
        opWasReset = false;
    }
    if(userOutput.textContent == '0') {
        userOutput.textContent = (nbrm == '.') ? '0.' : nbrm;
        return;
    } 
    if(nbrm == '.' && userOutput.textContent.includes('.')) {
        return;
    }
    userOutput.textContent += nbrm;
}
