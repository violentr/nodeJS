function Practice() {
  //const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    // <div className="min-h-screen bg-gray-50 p-8">
    //   <div className="max-w-4xl mx-auto">
    //     <h1 className="text-3xl font-bold text-gray-800 mb-6">Number Grid Practice</h1>

    //     {/* Your grid container goes here */}
    //     <div className="grid grid-cols-3 gap-4 grid-cols-1 md:grid-cols-3">
    //       {numbers.map((num) => (
    //         <div key={num} className="p-6 bg-blue-100 rounded-lg text-center text-xl font-semibold text-blue-800">
    //           {num}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div class="grid grid-cols-1 sm:grid-cols-3">
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center"> 
            <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
                <img src="https://placehold.co/600x400" alt="PostCard" className="w-full h-48 object-cover"/>
                <div className="p-5">
                    <h1 className="text-2xl font-bold text-gray-800">Greetings from Tokyo!</h1>
                    <p className="text-gray-600 mt-2"> It was very nice and comfortable trip to Tokyo .. </p>
                    <div className="flex mt-6 justify-between items-center">
                        <span className="text-sm text-gray-400">23.07.2023</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Read more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
  );
}

export default Practice;