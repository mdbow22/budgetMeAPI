import React from 'react'
import { Outlet } from 'react-router-dom';
import Private from '../../services/Private';

const UserRouter: React.FC = () => {
  return (
    <>
        <div>HELLO!</div>
        <Private>
            <Outlet />
        </Private>
    </>
  )
}

export default UserRouter;