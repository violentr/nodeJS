const NumberApp = {
  data: [],
  displayElement: null,

  init: function(displayElement){
    this.displayElement = displayElement;
    this.render()
  },
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
    this.displayElement.innerText = this.data.join(', ');
    document.getElementById("sumDisplay").innerText = this.data.length > 0 ? this.sum(this.data) : 0
    document.getElementById("avgDisplay").innerText = this.data.length > 0 ? this.average(this.data).toFixed(2) : "N/A"
    document.getElementById("maxDisplay").innerText = this.data.length > 0 ? this.max(this.data) : "N/A"
    localStorage.setItem("numbers", JSON.stringify(this.data));
  }
}

export default NumberApp;