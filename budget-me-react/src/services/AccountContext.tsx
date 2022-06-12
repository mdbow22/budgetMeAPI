import React, { createContext, useContext, useState } from 'react'
import API from '../utils/API';
import { getToken } from '../utils/Auth';

interface AcctContextType {
    userAccounts: undefined,
    fillAccounts: () => Promise<any>;
}

const AccountContext = createContext<AcctContextType | null>(null);

const AccountProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [userAccounts, setUserAccounts] = useState<any>();

    const getAccountInfo = async () => {

            const token = getToken();
            if(token) {
                const data = await API.get('/accounts', token);
                return data;
            }
    }

    const fillAccounts = async () => {
        const accountInfo = await getAccountInfo();

        if(accountInfo) {
            setUserAccounts(accountInfo);
            return;
        }

        setUserAccounts(null);
    }

    const Accounts = {
        userAccounts,
        fillAccounts,
    }

  return (
    <AccountContext.Provider value={Accounts}>
        {children}
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => useContext(AccountContext)!;

export default AccountProvider;