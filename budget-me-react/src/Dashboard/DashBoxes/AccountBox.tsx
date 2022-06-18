import React, { useEffect, useState } from 'react'
import { UserAccounts } from '../../services/AccountContext'


const AccountBox: React.FC<{userAccounts: UserAccounts[]}> = ({userAccounts}) => {

    const [total, setTotal] = useState<number>();

    useEffect(() => {
        if(userAccounts.length) {
            const userWorth = userAccounts.map(account => Number(account.balance))
                .reduce((prev, curr) => prev + curr)
            
            setTotal(userWorth);
        }
    }, [userAccounts])

  return (
    <section className='w-full flex flex-col justify-between'>
            <h3 className='text-xl'>Account Summary</h3>
            <div className='shadow mt-2 border p-2 flex flex-col justify-between bg-white h-full'>
                <table className='w-full text-left'>
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
                                    <tr key={account.id} className='border-b last:border-0'>
                                        <td className='py-2 hover:text-purple-600 hover:cursor-pointer w-1/2'>{account.name}</td>
                                        <td className='py-2 w-1/4'>{account.type}</td>
                                        <td className='py-2 w-1/4'>{Number(account.balance)}</td>
                                    </tr>
                                )
                            })
                        }
                        {!userAccounts?.length &&
                            <tr>
                                <td colSpan={3} className='text-center'>
                                    <p className='pt-4 text-md'>You have no accounts yet</p>
                                    <p className='text-md text-purple-600'>Add one &#8594;</p>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className='pt-2 border-t-2'>
                    <span className='font-bold'>Net Worth: </span>{total ?? 0}
                </div>
            </div>
        </section>
  )
}

export default AccountBox;