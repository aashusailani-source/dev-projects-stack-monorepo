import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";

function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState(allCoin);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="py-10 pb-[100px]">
      {/* Hero Section */}
      <div className="max-w-[600px] mx-auto my-10 flex flex-col items-center gap-[30px]">
        <h1 className="text-4xl font-bold text-center">
          Biggest <span className="block">Crypto Marketplace</span>
        </h1>
        <p className="font-thin text-center">
          Welcome to the worlds largest cryptocurrency marketplace. Sign Up to Explore more cryptos.
        </p>

        {/* Search Form */}
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

      {/* Coin Display */}
      <div className="max-w-[800px] m-auto border-2 rounded-2xl">
        {/* Header for Coin Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-white border-b   gap-2 text-white font-semibold bg-gradient-to-r from-indigo-700 via-purple-900 to-pink-800 p-2 rounded-t-2xl shadow-lg">
          <p className="p-2 text-center cursor-pointer bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">#</p>
          <p className="p-2 text-center cursor-pointer bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">Coins</p>
          <p className="p-2 text-center cursor-pointer bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">Price</p>
          <p className="p-2 text-center cursor-pointer bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">24H Change</p>
          <p className="p-2 text-center cursor-pointer bg-gray-800 rounded-2xl hover:bg-gray-700 transition-colors">Market Cap</p>
        </div>

        {/* Coin Listings */}
        {displayCoin.slice(0, 12).map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 text-white font-semibold bg-black shadow-lg hover:bg-gray-800 hover:shadow-2xl border-b ${index === 11 ? "rounded-b-xl border-none" : ""} transition-all duration-300`}
          >
            {/* Market Cap Rank */}
            <div className="flex justify-center items-center space-x-2">
              <p className="text-md font-medium">{item.market_cap_rank}</p>
            </div>

            {/* Coin Image and Name */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-center rounded-full border-white border-2"
              />
              <p className="text-center text-xs text-gray-400">{item.name} - {item.symbol}</p>
            </div>

            {/* Current Price */}
            <div className="flex justify-center items-center">
              <p className="text-md font-semibold text-gray-300">
                {currency.symbol}{item.current_price.toLocaleString()}
              </p>
            </div>

            {/* Price Change Percentage */}
            <div className="flex justify-center items-center">
              <p
                className={`text-sm font-semibold ${
                  item.price_change_percentage_24h < 0
                    ? 'bg-red-800 text-white'
                    : 'bg-green-500 text-white'
                } px-2 py-1 rounded-full`}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
            </div>

            {/* Market Cap */}
            <div className="flex justify-center items-center">
              <p className="text-md font-semibold text-gray-300">
                {currency.symbol}{item.market_cap.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
