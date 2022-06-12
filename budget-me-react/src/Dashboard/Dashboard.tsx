import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../services/AccountContext';

const Dashboard: React.FC = () => {

    const { userAccounts } = useAccountContext();
    const [total, setTotal] = useState<number>();

    useEffect(() => {
        if(userAccounts.length) {
            const userWorth = userAccounts.map(account => Number(account.balance))
                .reduce((prev, curr) => prev + curr)
            
            console.log(userWorth, typeof userWorth);
            setTotal(userWorth);
        }
    }, [userAccounts])

  return (
    <div>
        <section className='w-1/2'>
            <h3 className='text-2xl'>Accounts</h3>
            <div className='shadow-sm mt-2 border p-2'>
                <table className='w-full border-b-2 text-left'>
                    <thead className='border-b-2'>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Balance
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!userAccounts?.length &&
                            userAccounts.map(account => {
                                return (
                                    <tr key={account.id} className='border-b'>
                                        <td className='py-2'>{account.name}</td>
                                        <td className='py-2'>{account.type}</td>
                                        <td className='py-2'>{Number(account.balance)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='pt-2'>
                    <span className='font-bold'>Total: </span>{total}
                </div>
            </div>
        </section>
    </div>
  )
}

export default Dashboard;