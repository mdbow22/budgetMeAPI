import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoginPopup from './LoginPopup';

const TopNav: React.FC = () => {

  return (
    <nav className='text-green-700 flex justify-between py-3 px-5 bg-gradient-to-bl from-green-50 shadow-lg'>
        <div className='pr-5 flex items-center'>
            <Link to='/'>
                <h1 className='text-4xl pr-5 text-center font-bold'>BudgetMe</h1>
            </Link>
        </div>
        <LoginPopup />
    </nav>
  )
}

export default TopNav;