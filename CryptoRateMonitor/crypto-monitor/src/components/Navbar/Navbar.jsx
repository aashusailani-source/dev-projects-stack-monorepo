import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex items-center justify-between py-2.5 px-[10%] border-b-2'>
        {/* <img src="" alt="" /> */}
        <Link to="/" className="w-[max(12vw,120px)]">LOGO</Link>
        <ul className='flex gap-40 list-none'>
            <li>Home</li>
            <li>Features</li>
        </ul>
        <div className='flex items-center gap-[max(2vw,12px)]'>
            <select className='text-white px-4 cursor-pointer py-2 border-2 rounded-xl border-white bg-transparent' name="" id="">
                <option className='bg-black text-white cursor-pointer' value="usd">USD</option>
                <option className='bg-black text-white cursor-pointer' value="eur">EUR</option>
                <option className='bg-black text-white cursor-pointer' value="inr">INR</option>
            </select>
            <button className='flex items-center gap-10 px-5 py-2 font-sans bg-slate-800 rounded-3xl border-none cursor-pointer transition-all duration-200 hover:scale-105' >Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar