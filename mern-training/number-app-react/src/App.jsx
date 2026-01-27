import { useState } from 'react'


function App() {
  const initialValues = [5,10,15]
  const [numbers, setNumbers] = useState(initialValues);
  const [inputValue, setInputValue] = useState('');

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
