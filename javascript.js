let value = "0", memoryValue=null, showMemory=false, newInputSinceOperator=false;
let mainResult = document.getElementById("result"), memoryDisplay = document.getElementById("memory");


function updateValue() { mainResult.textContent = value; }
function typeN(n) {
    if (value.charAt(0) === "0") 
        value = n;
    else 
    {
        if(n==="."&&value.slice(-1)===".")return;
        value += n;
    }
    updateValue();
    newInputSinceOperator=true;
}
function eraseCharacter()
{
    value=value.slice(0, -1);
    if(value.length===0)value="0";
    updateValue();
}
function assignMemory(string)
{
    memoryValue=string;
    showMemory=true;
    memoryDisplay.textContent=string;
}
function clearMemory()
{
    memoryValue=null;
    showMemory=false;
    memoryDisplay.textContent="";
}
function evaluate()//this function uses the values in value and in memory to evaluate the expression
{
    let operator=memoryValue.slice(-1), memoryNumber=+memoryValue.slice(0, -2), displayNumber=+value;
    switch(operator)
    {
        case "+":
            return memoryNumber+displayNumber;
            break;
        case "-":
            return memoryNumber-displayNumber;
            break;
        case "\u00D7":  //multiply sing
            return memoryNumber*displayNumber;
            break;
        case "\u00F7":  //division sign
            if(displayNumber===0)return null;
            return memoryNumber/displayNumber;
            break;
        default:
            throw new Error("bad switch statement");
    }
}
function useOperator(operator)
{
    if(!showMemory) assignMemory(value+" "+operator), value="0";//if there is nothing in the memory
    else 
    {
        if(!newInputSinceOperator)//if there was no input after adding the operator
            assignMemory(memoryValue.slice(0, -1)+operator);
        else
        {
            if(memoryValue.slice(-1)==="=")//if we currently have a result, then use that one with the operator
                assignMemory(value+" "+operator), value="0";
            else//otherwise, we have to evaluate an expression
            {
                let result=evaluate();
                if(result===null)
                {
                    alert("Bro, I don't know how to divide by 0!");
                    clearAll();
                }
                else
                {
                assignMemory(result+" "+operator);
                value=result;
                updateValue();
                value="0";
                }
            }
        }
    }
    newInputSinceOperator=false;
}

function calcResult()//happens only when = is pressed
{
    if(newInputSinceOperator&&memoryValue.slice(-1)!=="=")
    {
        let result=evaluate();
        assignMemory(memoryValue+" "+value+" "+"=");
        if(result===null) value=0;
        else value=result.toString();
        updateValue();
        if(result===null) mainResult.textContent="LOL!";
    }
}
function clearAll()
{
    clearMemory();
    value="0";
    updateValue();
}
document.querySelectorAll("#numpad > *").forEach(element=>{element.addEventListener("click", (event)=>{typeN(event.target.textContent);});});//all elements on the numpad
document.querySelector("#period").addEventListener("click", (event)=>{typeN(event.target.textContent);});//the .
document.querySelector("#zero").addEventListener("click", (event)=>{typeN(event.target.textContent);});//the 0
document.querySelectorAll("#operators > *").forEach(element=>{element.addEventListener("click", (event)=>{useOperator(event.target.textContent)})});//the + - * /
document.querySelector("#clear").addEventListener("click", clearAll);
document.querySelector("#backspace").addEventListener("click", eraseCharacter);
document.querySelector("#equals").addEventListener("click", calcResult);

document.addEventListener("keydown", (event)=>{
    switch(event.key)
    {
        case "+":
            useOperator("+")
            break;
        case "-":
            useOperator("-")
            break;
        case "*":
            useOperator("\u00D7")
            break;
        case "/":
            useOperator("\u00F7")
            break;
        case "1":
            typeN("1")
            break;
        case "2":
            typeN("2")
            break;
        case "3":
            typeN("3")
            break;
        case "4":
            typeN("4")
            break;
        case "5":
            typeN("5")
            break;
        case "6":
            typeN("6")
            break;
        case "7":
            typeN("7")
            break;
        case "8":
            typeN("8")
            break;
        case "9":
            typeN("9")
            break;
        case "0":
            typeN("0")
            break;
        case ".":
            typeN(".")
            break;
        case "Escape":
            clearAll();
            break;        
        case "Backspace":
            eraseCharacter();
            break; 
        case "Enter":
            calcResult();
            break;
    }
})