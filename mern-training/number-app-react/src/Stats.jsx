function Stats ({numbers}){
  const sum = numbers.reduce((acc, n) => acc += n, 0)
  const average = numbers.length > 0 ? (sum/numbers.length).toFixed(2) : 'N/A';
  const max = numbers.length > 0 ? Math.max(...numbers) : 'N/A';
  return (
    <div className="grid grid-cols-3 mt-2 gap-4 mb-2">
      <div className="bg-blue-50 p-3 rounded-lg text-center">
        <p className="text-xs text-blue-600 uppercase font-bold">Sum</p>
        <p className="text-xl font-bold text-blue-900">{sum}</p>
      </div>
      <div className="bg-green-50 p-3 rounded-lg text-center">
        <p className="text-xs text-green-600 uppercase font-bold">Avg</p>
        <p className="text-xl font-bold text-green-900">{average}</p>
      </div>
      <div className="bg-purple-50 p-3 rounded-lg text-center">
        <p className="text-xs text-purple-600 uppercase font-bold">Max</p>
        <p className="text-xl font-bold text-purple-900">{max}</p>
      </div>
    </div>
  )
}

export default Stats;