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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Number Utility</h1>
          <input type="number"
            value={inputValue}
            onChange ={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            className="w-full mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button onClick={handleAdd}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >Add</button>
            <button onClick={handleClearAll}
            className="px-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >Clear</button>
          </div>
          
          <Stats numbers={numbers}/>
          <NumberList numbers={numbers} onRemove={handleRemove}/>
      </div>
      </div>
  )

}

export default App
