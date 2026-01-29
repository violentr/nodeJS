import { useState, useEffect } from 'react'
import Stats from './Stats';
import NumberList from './NumberList';


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
      <Stats numbers={numbers}/>
      <NumberList numbers={numbers} onRemove={handleRemove}/>
    </div>
  )

}

export default App
