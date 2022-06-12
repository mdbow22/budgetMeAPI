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
            <div className='pl-14 pr-6 pt-4'>
                <Outlet />
            </div>
        </Private>
        </AccountProvider>
    </div>
  )
}

export default UserRouter;