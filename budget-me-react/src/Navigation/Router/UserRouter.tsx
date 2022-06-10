import React from 'react'
import { Outlet } from 'react-router-dom';
import Private from '../../services/Private';
import SideNav from '../SideNav';

const UserRouter: React.FC = () => {

  return (
    <div className='main-box'>
        <SideNav />
        <Private>
            <div className='pl-12'>
                <Outlet />
            </div>
        </Private>
    </div>
  )
}

export default UserRouter;