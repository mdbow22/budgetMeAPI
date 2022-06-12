import React, { createContext, useCallback, useContext, useState } from 'react'
import API from '../utils/API';
import { getToken } from '../utils/Auth';

export interface UserAccounts {
    id: number,
    name: string,
    type: string,
    balance: string,
    starting_balance: string,
    user_id: number,
    createdAt: string,
    updatedAt: string,
}

interface AcctContextType {
    userAccounts: UserAccounts[],
    fillAccounts: () => Promise<any>;
}



const AccountContext = createContext<AcctContextType | null>(null);

const AccountProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [userAccounts, setUserAccounts] = useState<UserAccounts[]>([]);

    const getAccountInfo = async () => {

            const token = getToken();
            if(token) {
                const data = await API.get('/accounts', token);
                return data;
            }
    }

    const fillAccounts = useCallback(async () => {
        const accountInfo = await getAccountInfo();

        if(accountInfo) {
            setUserAccounts(accountInfo);
            return;
        }

        setUserAccounts([]);
    }, []);

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