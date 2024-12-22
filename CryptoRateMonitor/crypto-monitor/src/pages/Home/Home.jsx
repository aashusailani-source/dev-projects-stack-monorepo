import React from 'react'

function Home() {
  return (
    <div className='py-10 pb-[100px]'>
      <div className='max-w-[600px] mx-auto my-10 flex flex-col items-center gap-[30px]'>
        <h1 className='text-4xl font-bold flex flex-col items-center justify-center' >Biggest    <span /> Crypto MarketPlace
        </h1>
        <p className='font-thin text-center'>Welcome to the world's largest cryptocurrency marketplace. Sign Up to Explore more cryptos.</p>
        <form className="rounded-2xl w-[80%] bg-transparent text-white flex justify-between items-center gap-5 p-1">
          <input
            className="flex-1 p-3 text-[16px] text-gray-600 placeholder-gray-400 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            type="text"
            id="search"
            name="search"
            placeholder="Search Crypto..."
          />
          <button
            className="py-3 px-6 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div  className='max-w-[800px] m-auto border-none' l>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-white font-semibold bg-gradient-to-r from-indigo-700 via-purple-900 to-pink-800 p-2 rounded-2xl shadow-lg">
            <p className="p-2 text-center bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">#</p>
            <p className="p-2 text-center bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">Coins</p>
            <p className="p-2 text-center bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">Price</p>
            <p className="p-2 text-center bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">24H Change</p>
            <p className="p-2 text-center bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">Market Cap</p>
        </div>
      </div>
    </div>
  )
}

export default Home