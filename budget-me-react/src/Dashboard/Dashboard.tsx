import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../services/AccountContext';
import AccountBox from './DashBoxes/AccountBox';
import QuickTransBox from './DashBoxes/QuickTransBox';

const Dashboard: React.FC = () => {

    const { userAccounts } = useAccountContext();

  return (
    <div className='relative flex md:flex-row flex-col items-stretch justify-between md:gap-6 gap-14 h-72'>
        <AccountBox userAccounts={userAccounts} />
        <QuickTransBox userAccounts={userAccounts} />
    </div>
  )
}

export default Dashboard;