import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import API from '../utils/API';
import { getToken } from '../utils/Auth';
import TransactionTable, { Transaction } from './TransactionTable';

interface LocationState {
    account: number | undefined;
}

const Accounts: React.FC = () => {

    const location = useLocation();

    const [account, setAccount] = useState<number | undefined>();
    const [transactions, setTransactions] = useState<Transaction[]>();

    useEffect(() => {

        let state = location.state as LocationState;
        let token = getToken();

        const getTransaction = async () => {
            if(!state?.account) {
                //setAccount(state.account);
                const res = await API.get('/transaction/retrieveAll', token);
                
                setTransactions(res);
            }
        }

        getTransaction();
    }, [location.state, setAccount]);

  return (
    <div className='h-full'>
        <h2 className='text-2xl font-bold'>Account Info</h2>
        <TransactionTable transactions={transactions} />
    </div>
  )
}

export default Accounts;