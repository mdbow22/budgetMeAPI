import React from 'react';
import { DateTime } from 'luxon';

export interface Transaction {
    "id": number,
        "category": string,
        "description": string,
        "amount": string,
        "date": string,
        "account_id": number,
        "category_id": number,
        "createdAt": string,
        "updatedAt": string,
        "Account": {
            "id": number,
            "name": string,
            "type": string,
            "balance": string,
            "starting_balance": string,
            "user_id": number,
            "createdAt": string,
            "updatedAt": string
        }
}

interface TransTableProps {
    transactions: Transaction[] | undefined;
}

const TransactionTable: React.FC<TransTableProps> = ({ transactions }) => {
  return (
    <table className='w-full mt-4'>
        <thead className='text-left'>
            <tr className='trans-table__header'>
                <th className='w-1/6'>Date</th>
                <th>Description</th>
                <th className='w-1/6>'>Category</th>
                <th className='w-1/6'>Account</th>
                <th className='w-1/6'>Amount</th>
            </tr>
        </thead>
        <tbody>
            {transactions?.map(transaction => {
                return (
                    <tr key={transaction.id}>
                        <td>{DateTime.fromISO(transaction.date).toFormat('MM/dd/yyyy')}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.Account.name}</td>
                        <td>{transaction.amount}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default TransactionTable;