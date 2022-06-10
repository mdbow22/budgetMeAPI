import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../services/UserContext';
import { removeToken } from '../utils/Auth';

const LoginPopup: React.FC = () => {

    const { isAuthed, setIsAuthed, setUser } = useUser();

    const [showMenu, setShowMenu] = useState(false);

    const logoutUser = () => {
        setIsAuthed(false);
        setUser(undefined);
        removeToken();
        setShowMenu(false);
    }

  return (
    <>
    <div className='relative'>
        <button type='button' className='md:ml-auto text-white bg-green-700 p-1 rounded-full'
            onClick={() => setShowMenu(prev => !prev)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
    <div className={showMenu ? 'login-popup' : 'login-popup hidden'}>
        <ul>
            {isAuthed &&
                <Link to='/' 
                    onClick={() => {
                        logoutUser();
                        }}>
                    <li className='px-4 py-2 border-b-2 hover:bg-green-50'>
                        Logout
                    </li>
                </Link>
            }
            {!isAuthed &&
                <>
                <Link to='/login' onClick={() => setShowMenu(false)}>
                    <li className='px-4 py-2 border-b-2 hover:bg-green-50'>
                        Login
                    </li>
                </Link>
                <Link to='/signup' onClick={() => setShowMenu(false)}> 
                    <li className='px-4 py-2 hover:bg-green-50'>
                        Sign Up
                    </li>
                </Link>
                </>
            }
            
        </ul>
    </div>
    </>
  )
}

export default LoginPopup;