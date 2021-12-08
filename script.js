
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;   
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;



let miniOutput;
let userOutput;
let numbers;
let operators;
let opWasReset = true;
let currentResult = '';

let opList = [];



window.addEventListener("load", onPageLoad);


function onPageLoad() {
    miniOutput = document.querySelector('#miniOutput') ;
    userOutput = document.querySelector('#userOutput');
    userOutput.value = 0;
    userOutput.focus();
    numbers = [...document.querySelectorAll('div .number')];
    operators = [...document.querySelectorAll('div .funct')];


    numbers.forEach(itm => {
        itm.addEventListener('click', numberClicked );
    });


    operators.forEach(itm => {
        itm.addEventListener('click', operatorClicked );
    });

    userOutput.addEventListener('propertychange', (event) => {console.log("hahaha")});
}

function operatorClicked() {
    userOutput.focus();
    if(this.textContent == '←') {
        // userOutput.value =  Array.from(userOutput.value).slice(0, userOutput.value.length-1).join(''); //dirty line :D
        let tempOutputArray = Array.from(userOutput.value);
        tempOutputArray.pop();
        userOutput.value = tempOutputArray.join('');
        return;
    }


    if(this.textContent == 'C') {
        clearAll();
        miniOutput.textContent = '';
        return;
    }
    
    if(this.textContent == 'CE') {
        if(miniOutput.textContent.length >= userOutput.value.length) {
            miniOutput.textContent = miniOutput.textContent.substring(0, miniOutput.textContent.length-userOutput.value.length);
        }
        userOutput.value = '0';
        return;
    }

    

    if(this.textContent == '=') {
        if(opList.length<2) {
            return;
        }
        opList.push(userOutput.value);
        operate(opList[0], opList[2], opList[1]);
        miniOutput.textContent = '';
        return;
    }

//    if(opList[opList.length-1] == this.textContent && opList[opList.length-2] == userOutput.value) {
//     return;
//    }
    
    if(opList.length == 2) {
            opList.push(userOutput.value);
        currentResult = userOutput.value;

        operate(opList[0], opList[2], opList[1]);

        
        opList.push(userOutput.value);
        opList.push(this.textContent);
        miniOutput.textContent += this.textContent;
        // console.table(opList);
        opWasReset = true;
        return;
    }

    opList.push(userOutput.value);
    opList.push(this.textContent);
    miniOutputDisplay();
    
    
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
    // miniOutput.textContent = "";
    opList = [];
}

function miniOutputDisplay() {
    miniOutput.textContent = '';
    opList.forEach(itm => {
        miniOutput.textContent +=  itm;
    })
}





function numberClicked(){
    
    let tempNumber = this.textContent;
    userOutput.focus();
    
    if(opList.length >1 ) {
        if(opList[opList.length-2] == userOutput.value) {
            userOutput.value = 0;
        }
    }

    // opList.length == 0 &&
    if( opWasReset == true) {
        userOutput.value = 0;
        opWasReset = false;
        
    }

    if(userOutput.value == '0') {
        
        let a = (tempNumber == '.') ? '0.' : tempNumber; 
        userOutput.value = a;
        miniOutput.textContent += a;
    } 
    else if(userOutput.value.length <= 15 ) {
                if(this.textContent == '.' && userOutput.value.includes('.')) {
                return;
                }
            userOutput.value += tempNumber;
            miniOutput.textContent += tempNumber;
        
        }
    
}
