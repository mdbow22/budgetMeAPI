import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '../core/Button';
import Modal from '../core/Modal/Modal';
import ModalBod from '../core/Modal/ModalBod';
import ModalHead from '../core/Modal/ModalHead';
import API from '../utils/API';
import { getToken } from '../utils/Auth';
import NewTransactionModal from './NewTransactionModal';
import TransactionTable, { Transaction } from './TransactionTable';

interface LocationState {
    account: number | undefined;
}

const Accounts: React.FC = () => {

    const location = useLocation();

    const [account, setAccount] = useState<number | undefined>();
    const [transactions, setTransactions] = useState<Transaction[]>();
    const [show, setShow] = useState(false);

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
        <div className='flex gap-4'>
            <h2 className='text-2xl font-bold'>Account Info</h2>
            <Button onClick={() => setShow(!show)}>
                + Transaction
            </Button>
        </div>
        <TransactionTable transactions={transactions} />
        <NewTransactionModal
            show={show}
            setShow={setShow}
        />
    </div>
  )
}

export default Accounts;