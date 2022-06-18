import React from 'react'
import { useAccountContext } from '../services/AccountContext';
import AccountBox from './DashBoxes/AccountBox';
import QuickTransBox from './DashBoxes/QuickTransBox';

const Dashboard: React.FC = () => {

    const { userAccounts, fillAccounts } = useAccountContext();

  return (
    <div className='relative flex md:flex-row flex-col-reverse md:justify-between justify-start gap-6'>
        <AccountBox userAccounts={userAccounts} />
        <QuickTransBox userAccounts={userAccounts} fillAccounts={fillAccounts} />
    </div>
  )
}

export default Dashboard;