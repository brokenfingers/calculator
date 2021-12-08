
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
    userOutput.value = '';
    userOutput.focus();
    numbers = [...document.querySelectorAll('div .number')];
    operators = [...document.querySelectorAll('div .funct')];

    document.addEventListener('keydown', kbdPressed)


    numbers.forEach(itm => {
        itm.addEventListener('click', numberClicked );
    });


    operators.forEach(itm => {
        itm.addEventListener('click', operatorClicked );
    });

}

function kbdPressed(e) {
    console.log(e['key']);
    if( opWasReset == true) {
        userOutput.value = '';
        opWasReset = false;
    }
}

function operatorClicked() {
    userOutput.focus();
    if(this.textContent == '←') {
        let tempOutputArray = Array.from(userOutput.value);
        tempOutputArray.pop();
        userOutput.value = tempOutputArray.join('');
        return;
    }


    if(this.textContent == 'C') {
        clearAll();
        return;
    }
    
    if(this.textContent == 'CE') {
       userOutput.value = '0';
        return;
    }

    

    if(this.textContent == '=') {
        if(opList.length<2) {
            return;
        }
        opList.push(userOutput.value);
        operate(opList[0], opList[2], opList[1]);
        return;
    }

    if(opList.length == 2) {
        opList.push(userOutput.value);
        currentResult = userOutput.value;
        operate(opList[0], opList[2], opList[1]);

        
        opList.push(userOutput.value);
        opList.push(this.textContent);
        opWasReset = true;
        return;
    }

    opList.push(userOutput.value);
    opList.push(this.textContent);
    opWasReset = true;
}

function operate(a, b, c) {
    clearAll();
    a = parseFloat(a);
    b = parseFloat(b);
    
        switch(c) {
            case '/':
                userOutput.value = (a==0 || b == 0) ? "Oh no! Error" : divide(a, b);
                break;
            case '+':
                userOutput.value = add(a, b);
                opWasReset = true;
                break;
            case '-':
                userOutput.value = subtract(a, b);
                break;
            case 'X':
                userOutput.value = multiply(a, b);
                break;
                
        }               
}


function clearAll()
{
    opWasReset = true;
    userOutput.value = 0;
    opList = [];
}


function numberClicked(){
    userOutput.focus();
    if( opWasReset == true) {
        userOutput.value = 0;
        opWasReset = false;
    }
    if(userOutput.value == '0') {
        userOutput.value = (this.textContent == '.') ? '0.' : this.textContent;
        return;
    } 
    if(this.textContent == '.' && userOutput.value.includes('.')) {
        return;
    }
    userOutput.value += this.textContent;
}
