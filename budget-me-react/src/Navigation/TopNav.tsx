import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import LoginPopup from './LoginPopup';

const TopNav: React.FC = () => {

    const { isAuthed, user } = useUser();

  return (
    <nav className='text-green-700 flex justify-between py-3 pr-5 pl-12 bg-gradient-to-bl from-green-50 shadow-lg h-16'>
        <div className='flex items-center'>
            <Link to={isAuthed ? `/user/${user?.id}/dashboard` : '/'}>
                <h1 className='text-4xl text-center font-bold'>BudgetMe</h1>
            </Link>
        </div>
        <LoginPopup />
    </nav>
  )
}

export default TopNav;