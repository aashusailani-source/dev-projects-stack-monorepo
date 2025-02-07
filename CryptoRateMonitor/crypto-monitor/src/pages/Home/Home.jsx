import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Filtering without debounce
  const inputHandler = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setDisplayCoin(allCoin);
    } else {
      const filteredCoin = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayCoin(filteredCoin);
    }
  };

  // ✅ Ensure Data Loads Initially
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
          Welcome to the world's largest cryptocurrency marketplace. Sign Up to explore more cryptos.
        </p>

        {/* Search Form */}
        <form
          onSubmit={(e) => e.preventDefault()} // ✅ Prevent form reload
          className="rounded-2xl w-[80%] bg-transparent text-white flex justify-between items-center gap-5 p-1"
        >
          <input
            className="flex-1 p-3 text-[16px] text-gray-300 placeholder-gray-400 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black"
            type="text"
            id="search"
            name="search"
            value={input}
            onChange={inputHandler}
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
      <div className="max-w-[1000px] m-auto border-2 rounded-2xl">
        {/* Header for Coin Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-white border-b gap-2 text-white font-semibold bg-gradient-to-r from-indigo-700 via-purple-900 to-pink-800 p-2 rounded-t-2xl shadow-lg">
          <p className="p-2 text-center bg-gray-800 rounded-2xl">#</p>
          <p className="p-2 text-center bg-gray-800 rounded-2xl">Coins</p>
          <p className="p-2 text-center bg-gray-800 rounded-2xl">Price</p>
          <p className="p-2 text-center bg-gray-800 rounded-2xl">24H Change</p>
          <p className="p-2 text-center bg-gray-800 rounded-2xl">Market Cap</p>
        </div>

        {/* Coin Listings */}
        {displayCoin?.length > 0 ? (
          displayCoin.slice(0, 12).map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              key={index}
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 text-white font-semibold bg-black shadow-lg hover:bg-gray-800 hover:shadow-2xl border-b ${
                index === 11 ? "rounded-b-xl border-none" : ""
              } transition-all duration-300`}
            >
              {/* Market Cap Rank */}
              <div className="flex justify-center items-center">
                <p className="text-md font-medium">{item.market_cap_rank}</p>
              </div>

              {/* Coin Image and Name */}
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-center rounded-full border-white border-2"
                />
                <p className="text-center text-xs text-gray-400">
                  {item.name} - {item.symbol.toUpperCase()}
                </p>
              </div>

              {/* Current Price */}
              <div className="flex justify-center items-center">
                <p className="text-md font-semibold text-gray-300">
                  {currency.symbol}
                  {item.current_price.toLocaleString()}
                </p>
              </div>

              {/* Price Change Percentage */}
              <div className="flex justify-center items-center">
                <p
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    item.price_change_percentage_24h < 0 ? "bg-red-800" : "bg-green-500"
                  }`}
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                </p>
              </div>

              {/* Market Cap */}
              <div className="flex justify-center items-center">
                <p className="text-md font-semibold text-gray-300">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 py-5">No coins data found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
