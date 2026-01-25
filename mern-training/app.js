
const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const display = document.getElementById('display');
const removeBtn = document.getElementById("removeBtn");
const clearButton = document.getElementById("clearBtn");

const NumberApp = {
  data: [],
  sum : function (numbers){
    return  numbers.reduce((sum, number) => sum += number,0);
  },
  average : function (numbers){
    return this.sum(numbers)/numbers.length;
  },
  max: function (numbers){
    return Math.max(...numbers);
  },
  add:  function (number){
  // Do not mutate original object create new instead
    this.data = [...this.data, number]
    this.render()
  },
  remove : function (numberToRemove){
    this.data = this.data.filter((e) => e !== numberToRemove);
    this.render()
  },
  clear: function(){
    this.data = [];
    this.render();
  },
  render: function (){
    display.innerText = this.data.join(', ');
    document.getElementById("sumDisplay").innerText = this.data.length > 0 ? this.sum(this.data) : 0
    document.getElementById("avgDisplay").innerText = this.data.length > 0 ? this.average(this.data).toFixed(2) : "N/A"
    document.getElementById("maxDisplay").innerText = this.data.length > 0 ? this.max(this.data) : "N/A"
    localStorage.setItem("numbers", JSON.stringify(this.data));
  }
}

let savedData = localStorage.getItem("numbers");
NumberApp.data = savedData ? JSON.parse(savedData) : [];
NumberApp.render();



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
Summary
✅ Single source of truth — NumberApp.data is the only place storing numbers
✅ Encapsulation — all logic is inside one object
✅ DRY principle — render() is called automatically, no repetition
✅ Validation extracted — getValidNumber() reusable helper
✅ Immutability maintained — still using spread operator
✅ Clear naming — every function does exactly what its name says
*/
