
const addNumber = (myNumbers, number) => {
  // Do not mutate original object create new instead
  return [...myNumbers, number]
}

const removeNumber = (myNumbers, numberToRemove) => {
  return myNumbers.filter((e) => e !== numberToRemove);
}

const sum = (numbers) =>{
  return  numbers.reduce((sum, number) => sum += number,0);
}
const average = (numbers) =>{
  return (sum(numbers)/numbers.length).toFixed(2);
}

const max = (numbers) => {
  return Math.max(...numbers);
}

let savedData = localStorage.getItem("numbers");
let numbers = savedData ? JSON.parse(savedData) : [];

const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const display = document.getElementById('display');
const removeBtn = document.getElementById("removeBtn");
const clearButton = document.getElementById("clearBtn");

const render = () => {
  display.innerText = numbers.join(', ');
  document.getElementById("sumDisplay").innerText = numbers.length > 0 ? sum(numbers) : 0
  document.getElementById("avgDisplay").innerText = numbers.length > 0 ? average(numbers) : "N/A"
  document.getElementById("maxDisplay").innerText = numbers.length > 0 ? max(numbers) : "N/A"
  localStorage.setItem("numbers", JSON.stringify(numbers));
};

render();

const getValidNumber = () => {
  const inputNumber = Number(numberInput.value);
  return (!isNaN(inputNumber) && numberInput.value !== '') ? inputNumber : null;
};

addBtn.addEventListener('click', () => {
  const inputNumber= getValidNumber();

  if (inputNumber !== null) {
    numbers = addNumber(numbers, inputNumber);
    render();
    numberInput.value = '';
  }
});

removeBtn.addEventListener('click', () => {
  const inputNumber = getValidNumber();

  if (inputNumber !== null) {
    numbers = removeNumber(numbers, inputNumber);
    render();
    numberInput.value = '';
  }
});

clearButton.addEventListener('click', () =>{
  numbers = [];
  render();
})