import React from 'react';
import { DateTime } from 'luxon';

export interface Transaction {
    "id": number,
        "category": string,
        "description": string,
        "amount": string,
        "date": string,
        "third_party": string | null,
        "account_id": number,
        "category_id": number,
        "createdAt": string,
        "updatedAt": string,
        "Account": {
            "id": number,
            "name": string,
        }
}

interface TransTableProps {
    transactions: Transaction[] | undefined;
}

const TransactionTable: React.FC<TransTableProps> = ({ transactions }) => {
  return (
    <table className='w-full mt-4 border border-gray-400'>
        <thead className='text-left'>
            <tr className='trans-table__header border-b-2 border-gray-400 bg-gray-200'>
                <th className='w-1/8 px-2 py-3 '>Date</th>
                <th className='w-1/4 px-2 py-3'>Description</th>
                <th className='w-1/6 px-2 py-3'>Payer/Payee</th>
                <th className='w-1/6 px-2 py-3'>Category</th>
                <th className='w-1/6 px-2 py-3'>Account</th>
                <th className='w-1/8 px-2 py-3'>Amount</th>
            </tr>
        </thead>
        <tbody>
            {transactions?.map(transaction => {
                return (
                    <tr key={transaction.id} className='text-sm   even:bg-gray-200'>
                        <td className='px-2 py-1 '>{DateTime.fromISO(transaction.date).toFormat('MM/dd/yyyy')}</td>
                        <td className='px-2 py-1 '>{transaction.description}</td>
                        <td className='px-2 py-1 '>{transaction.third_party}</td>
                        <td className='px-2 py-1 '>{transaction.category}</td>
                        <td className='px-2 py-1 '>{transaction.Account.name}</td>
                        <td className='px-2 py-1 flex justify-between'>
                            <div>
                                $
                            </div>
                            <div>
                                {transaction.amount}
                            </div>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default TransactionTable;