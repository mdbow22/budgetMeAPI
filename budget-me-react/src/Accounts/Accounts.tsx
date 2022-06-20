import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import API from '../utils/API';
import { getToken } from '../utils/Auth';

interface LocationState {
    account: number | undefined;
}

const Accounts: React.FC = () => {

    const location = useLocation();

    const [account, setAccount] = useState<number | undefined>();

    useEffect(() => {

        let state = location.state as LocationState;
        let token = getToken();

        const getTransaction = async () => {
            if(!state?.account) {
                //setAccount(state.account);
                const res = await API.get('/transaction/retrieveAll', token);
            }
        }

        getTransaction();
    }, [location.state, setAccount]);

  return (
    <div>Accounts</div>
  )
}

export default Accounts;