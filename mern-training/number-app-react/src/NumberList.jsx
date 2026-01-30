function NumberList({ numbers, onRemove }) {
  if (numbers.length === 0) {
    return <p className="text-center text-gray-500 italic">No numbers added yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {numbers.map((num, index) => (
        <li 
          key={index} 
          className="flex justify-between items-center bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700">{num}</span>
          <button 
            onClick={() => onRemove(index)}
            className="text-red-400 hover:text-red-600 font-bold px-2"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}
export default NumberList;