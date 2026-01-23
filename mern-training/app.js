
const addNumber = (myNumbers, number) => {
  // Do not mutate original object create new instead
  return [...myNumbers, number]
}

const removeNumber = (myNumbers, numberToRemove) => {
  return myNumbers.filter((e) => e !== numberToRemove);
}

let savedData = localStorage.getItem("numbers");
let numbers = savedData ? JSON.parse(savedData) : [];

const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const display = document.getElementById('display');
const removeBtn = document.getElementById("removeBtn");

const render = () => {
  display.innerText = numbers.join(', ');
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
