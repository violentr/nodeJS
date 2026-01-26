import NumberApp  from "./NumberApp.js";

const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const display = document.getElementById('display');
const removeBtn = document.getElementById("removeBtn");
const clearButton = document.getElementById("clearBtn");



let savedData = localStorage.getItem("numbers");
NumberApp.data = savedData ? JSON.parse(savedData) : [];
NumberApp.init(display);



const getValidNumber = () => {
  const inputNumber = Number(numberInput.value);
  return (!isNaN(inputNumber) && numberInput.value !== '') ? inputNumber : null;
};

addBtn.addEventListener('click', () => {
  const inputNumber= getValidNumber();

  if (inputNumber !== null) {
    NumberApp.add(inputNumber);
    numberInput.value = '';
  }
});

removeBtn.addEventListener('click', () => {
  const inputNumber = getValidNumber();

  if (inputNumber !== null) {
    NumberApp.remove(inputNumber);
    numberInput.value = '';
  }
});

clearButton.addEventListener('click', () =>{
  NumberApp.clear();
})


/*
NumberApp.data → State
render() → Component Rendering
add/remove → State Actions
*/
