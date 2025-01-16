import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <div className='flex justify-between items-center p-4 bg-gray-200'>
        <h1 className='text-2xl font-bold'>Navbar</h1>
        <ul className='flex gap-4'>
            <li>Home</li>
            <li>Signup</li>
            <li>Login</li>
        </ul>
    </div>
  )
}

export default Navbar