import { useState, useEffect } from 'react'


function App() {
  const initialValues = [5,10,15]
  const [numbers, setNumbers] = useState(() => {
    const saved = localStorage.getItem("numbers");
    return saved ? JSON.parse(saved) : initialValues;
  });
  const [inputValue, setInputValue] = useState('');
  // save to Localstorage whenever numbers change
  useEffect(()=>{
    localStorage.setItem("numbers", JSON.stringify(numbers))
  },[numbers]) // Dependency array
  const sum = numbers.reduce((acc, n) => acc += n)
  const average = numbers.length > 0 ? (sum/numbers.length).toFixed(2) : 'N/A';
  const max = numbers.length > 0 ? Math.max(...numbers) : 'N/A';

  const handleAdd = () =>{
    const num = Number(inputValue);
    if (!isNaN(num) && inputValue !== ''){
      setNumbers([...numbers, num]);
      setInputValue('');
    }
  }
  const handleRemove = (index) =>{
    setNumbers(numbers.filter((_, i) => i !== index))
  }
  const handleClearAll = () =>{
    setNumbers([]);
  }

  return (
    <div>
      <h1> React Number App</h1>
      <div className="stats">
        <p>Sum: {sum}</p>
        <p>Average: {average}</p>
        <p>Max: {max}</p>
      </div>
      <input type="number"
        value={inputValue}
        onChange ={(e) => setInputValue(e.target.value)}
        placeholder="Enter a number"
      />
      <button onClick={handleAdd}>Add</button>
      
      <button onClick={handleClearAll}>Clear</button>

      <ul>
        {numbers.map((num, index) => (
          <li key={index}> {num} 
          <button onClick={()=>handleRemove(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App
