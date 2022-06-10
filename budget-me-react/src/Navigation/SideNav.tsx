import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { DashboardIcon, AccountIcon, Clipboard, GoalsIcon, Toggle } from '../core/Icons';
import { useUser } from '../services/UserContext';

const SideNav: React.FC = () => {
    const { user } = useUser();
    const [showMenu, setShowMenu] = useState(false);

  return (
        <div className={`absolute top-0 bg-green-700 max-w-xs text-white ${showMenu ? 'sidebar-open' : 'sidebar'}`}>
            <ul className='flex flex-col gap-2 items-center'>
                    <li className='border-b border-white w-full flex items-center justify-between pr-1 py-2 relative z-50'>
                        <div> </div>
                        <button type='button' className='relative z-50' onClick={() => setShowMenu(prev => !prev)}>
                            <Toggle showMenu={showMenu} />
                        </button>
                    </li>
                    <li className='border-b border-green-700 w-full '>
                        <Link to={`/user/${user?.id}/dashboard`} onClick={() => setShowMenu(false)} className='flex justify-between pl-2 pb-2' title='Dashboard'>
                            <div className='text-xl font-semibold'>Dashboard</div>
                            <div className='flex justify-center w-7 px-5'>
                                <button title='Dashboard' type='button'>
                                    <DashboardIcon />
                                </button>
                            </div>
                        </Link>
                    </li>
                    <li className='border-b border-green-700 w-full'>
                        <Link to={`/user/${user?.id}/dashboard`} onClick={() => setShowMenu(false)} className='flex justify-between pl-2 pb-2' title='Accounts'>
                            <div className='text-xl font-semibold'>Accounts</div>
                            <div className='flex justify-center w-7 px-5'>
                                <button title='Accounts' type='button'>
                                    <AccountIcon />
                                </button>
                            </div>
                        </Link>
                    </li>
                    <li className='border-b border-green-700 w-full flex justify-between pl-2 pb-2'>
                        <div className='text-xl font-semibold'>Budgets</div>
                        <div className='flex justify-center w-7 px-5'>
                            <button title='Budgets' type='button'>
                                <Clipboard />
                            </button>
                        </div>
                    </li>
                    <li className='border-b border-green-700 w-full flex justify-between pl-2 pb-2'>
                        <div className='text-xl font-semibold'>Goals</div>
                        <div className='flex justify-center w-7 px-5'>
                            <button title='Goals' type='button'>
                                <GoalsIcon />
                            </button>
                        </div>
                    </li>
                </ul>
        </div>
  )
}

export default SideNav;