import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import LoginPopup from './LoginPopup';

const TopNav: React.FC = () => {

    const { isAuthed, user } = useUser();

  return (
    <nav className={`relative z-10 text-green-700 flex justify-between py-3 pr-6 bg-gradient-to-bl from-green-50 shadow-lg h-16 ${isAuthed ? 'pl-16' : 'pl-6'}`}>
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