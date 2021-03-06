import React from 'react'
import { Outlet } from 'react-router-dom';
import AccountProvider from '../../services/AccountContext';
import Private from '../../services/Private';
import SideNav from '../SideNav';

const UserRouter: React.FC = () => {

  return (
    <div className='main-box'>
        <AccountProvider>
        <SideNav />
        <Private>
            <div className='pl-16 pr-6 pt-4 bg-stone-50 h-full'>
                <Outlet />
            </div>
        </Private>
        </AccountProvider>
    </div>
  )
}

export default UserRouter;