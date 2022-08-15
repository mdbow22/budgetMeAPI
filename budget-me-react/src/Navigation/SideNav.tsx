import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DashboardIcon, AccountIcon, Clipboard, GoalsIcon, Toggle } from '../core/Icons';
import { useUser } from '../services/UserContext';
import { useAccountContext } from '../services/AccountContext';

const SideNav: React.FC = () => {
    const { user } = useUser();
    const { fillAccounts } = useAccountContext();

    useEffect(() => {
        const initializeAccounts = async () => {
            if(user?.id) {
                await fillAccounts();
            }
        }

        initializeAccounts();

    }, [user?.id, fillAccounts])

    const [showMenu, setShowMenu] = useState(false);

  return (
        <div className={`absolute top-0 bg-green-700 max-w-xs text-white z-50 ${showMenu ? 'sidebar-open' : 'sidebar'}`}>
            <ul className='flex flex-col gap-2 items-center'>
                    <li className='bg-slate-50 border-r border-green-700 bg-gradient-to-b from-green-50 text-green-700 w-full h-16 flex items-center justify-between p-2 py-2 relative z-50'>
                        <h1 className='text-2xl font-bold pr-2'>BudgetMe</h1>
                        <button type='button' className='relative z-50' onClick={() => setShowMenu(prev => !prev)}>
                            <Toggle showMenu={showMenu} />
                        </button>
                    </li>
                    <li className='border-b border-green-700 w-full hover:bg-white/30 flex items-center p-2'>
                        <Link to={`/user/${user?.id}/dashboard`} onClick={() => setShowMenu(false)} className='w-full'  title='Dashboard'>
                            <div className='flex justify-between'> 
                                <div className='text-xl font-semibold pr-2'>Dashboard</div>
                                <div className='flex justify-center w-7'>
                                    <button title='Dashboard' type='button'>
                                        <DashboardIcon />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='border-b border-green-700 w-full hover:bg-white/30 flex items-center p-2'>
                        <Link to={`/user/${user?.id}/accounts`} onClick={() => setShowMenu(false)} className='w-full' title='Accounts'>
                            <div className='flex justify-between'> 
                                <div className='text-xl font-semibold pr-2'>Accounts</div>
                                <div className='flex justify-center w-7'>
                                    <button title='Accounts' type='button'>
                                        <AccountIcon />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='border-b border-green-700 w-full hover:bg-white/30 flex items-center p-2'>
                    <Link to={`/user/${user?.id}/budgets`} onClick={() => setShowMenu(false)} className='w-full' title='Budgets'>
                            <div className='flex justify-between'> 
                                <div className='text-xl font-semibold pr-2'>Budgets</div>
                                <div className='flex justify-center w-7'>
                                    <button title='Budgets' type='button'>
                                        <Clipboard />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='border-b border-green-700 w-full hover:bg-white/30 flex items-center p-2'>
                        <Link to={`/user/${user?.id}/goals`} onClick={() => setShowMenu(false)} className='w-full' title='Goals'>
                            <div className='flex justify-between'> 
                                <div className='text-xl font-semibold pr-2'>Goals</div>
                                <div className='flex justify-center w-7'>
                                    <button title='Goals' type='button'>
                                        <GoalsIcon />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
        </div>
  )
}

export default SideNav;