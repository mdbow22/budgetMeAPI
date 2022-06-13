import React, { FormEvent, useReducer } from 'react'
import FormSelect from '../../FormInputs/FormSelect';
import SubmitBtn from '../../FormInputs/SubmitBtn';
import TextInput from '../../FormInputs/TextInput';
import { UserAccounts } from '../../services/AccountContext';

interface QuickTransType {
    account: string;
    amount: number | string;
    category: string;
    description: string;
    date?: string;
}

interface ReducerAction {
    type: string;
    payload: string | number;
}

const QuickTransBox: React.FC<{ userAccounts: UserAccounts[] }> = ({ userAccounts }) => {

    const options = [{value: '', label: ''}, ...userAccounts.map(account => ({value: account.name, label: account.name}))];

    const categories = [
        {
            value: 'Home',
            label: 'Home',
        },
        {
            value: 'Health',
            label: 'Health',
        },
        {
            value: 'Restaurants',
            label: 'Restaurants',
        }
    ]

    const initState: QuickTransType = {
        account: '',
        amount: '',
        category: '',
        description: '',
    }

    const reducer = (state: QuickTransType, action: ReducerAction) => {
        if(action.type) {
            const newState = {
                ...state,
                [action.type]: action.payload,
            }
            return newState;
        } else {
            return state;
        }
    }

    const [formState, dispatch] = useReducer(reducer, initState);

    const submit = (e: FormEvent) => {
        e.preventDefault();
    }

  return (
    <section className='w-full h-full'>
        <h3 className='text-2xl'>Quick Transaction</h3>
        <div className='shadow-sm mt-2 border p-2 h-full'>
            <form onSubmit={submit}>
                <div>
                    <FormSelect
                        name='account'
                        labelText='Account'
                        options={options}
                        onChange={(e) => {
                            dispatch({type: 'account', payload: e.target.value})
                        }}
                        value={formState.account}
                        required
                    />
                </div>
                <div className='flex justify-between gap-6'>
                    <TextInput
                        name='amount'
                        labelText='Amount'
                        onChange={(e) => {
                            dispatch({type: 'amount', payload: e.target.value})
                        }}
                        value={formState.amount}
                        type='number'
                        required
                    />
                    <FormSelect
                        name='category'
                        labelText='Category'
                        options={categories}
                        onChange={(e) => {
                            dispatch({type: 'category', payload: e.target.value})
                        }}
                        value={formState.category}
                        required
                    />
                </div>
                <div>
                    <TextInput
                        name='description'
                        labelText='Description'
                        onChange={(e) => {
                            dispatch({type: 'description', payload: e.target.value})
                        }}
                        value={formState.description}
                        required
                    />
                </div>
                <div>
                    <SubmitBtn />
                </div>
            </form>
        </div>
    </section>
  )
}

export default QuickTransBox;