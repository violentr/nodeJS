function Stats ({numbers}){
  const sum = numbers.reduce((acc, n) => acc += n, 0)
  const average = numbers.length > 0 ? (sum/numbers.length).toFixed(2) : 'N/A';
  const max = numbers.length > 0 ? Math.max(...numbers) : 'N/A';
  return (
    <div className="stats">
      <p>Sum: {sum}</p>
      <p>Average: {average}</p>
      <p>Max: {max}</p>
    </div>
  )
}

export default Stats;