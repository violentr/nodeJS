
const addNumber = (myNumbers, number) => {
  // Do not mutate original object create new instead
  return [...myNumbers, number]
}

const removeNumber = (myNumbers, numberToRemove) => {
  return myNumbers.filter((e) => e !== numberToRemove);
}

let numbers = []

const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const display = document.getElementById('display');
const removeBtn = document.getElementById("removeBtn");

const render = () => {
  display.innerText = numbers.join(', ');
};

addBtn.addEventListener('click', () => {
  const inputNumber= Number(numberInput.value);
  if (!isNaN(inputNumber) && numberInput.value !== '') {
    numbers = addNumber(numbers, inputNumber);
    render();
    numberInput.value = '';
  }
});

removeBtn.addEventListener('click', () => {
  const inputNumber = Number(numberInput.value);
  if (!isNaN(inputNumber) && numberInput.value !== '') {
    numbers = removeNumber(numbers, inputNumber);
    render();
    numberInput.value = '';
  }
});
