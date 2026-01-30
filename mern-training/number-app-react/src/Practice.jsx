function Practice() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Number Grid Practice</h1>

        {/* Your grid container goes here */}
        <div className="grid grid-cols-3 gap-4 grid-cols-1 md:grid-cols-3">
          {numbers.map((num) => (
            <div key={num} className="p-6 bg-blue-100 rounded-lg text-center text-xl font-semibold text-blue-800">
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Practice;