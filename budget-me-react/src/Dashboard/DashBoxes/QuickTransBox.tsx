import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import FormSelect from '../../FormInputs/FormSelect';
import SubmitBtn from '../../FormInputs/SubmitBtn';
import TextInput from '../../FormInputs/TextInput';
import { UserAccounts } from '../../services/AccountContext';
import API from '../../utils/API';
import { getToken } from '../../utils/Auth';

interface QuickTransType {
    account: string;
    type: string;
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

    const [categories, setCategories] = useState<any>();
    const [filteredCats, setFilteredCats] = useState<any>();

    const options = [{value: '', label: ''}, ...userAccounts.map(account => ({value: account.name, label: account.name}))];

    useEffect(() => {
        const token = getToken();
        if(token) {
            API.get('/transaction/categories', token)
            .then((res: any) => {
                const formatted = res.map((category: any) => ({
                    value: {...category},
                    label: category.category,
                }));

                setCategories(formatted);
            })
        }
        
    }, [setCategories])

    const cats = [
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
        type: '',
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

    useEffect(() => {
        if(formState.type) {
            switch(formState.type) {
                case 'credit': {
                    setFilteredCats(categories.filter((category: any) => category.value.type === 'credit'));
                    break;
                }
                case 'debit': {
                    setFilteredCats(categories.filter((category: any) => category.value.type === 'debit'));
                    break;
                }
                default: {
                    setFilteredCats(undefined);
                }
            }
        } else {
            setFilteredCats(undefined);
        }
    })

    const submit = (e: FormEvent) => {
        e.preventDefault();
    }

  return (
    <section className='w-full h-full'>
        <h3 className='text-2xl'>Quick Transaction</h3>
        <div className='shadow-sm mt-2 border p-2 h-full'>
            <form onSubmit={submit}>
                <div className='flex justify-between gap-6'>
                    <div className='w-3/4'>
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
                    <div className='w-1/4'>
                        <FormSelect
                            name='type'
                            labelText='Credit/Debit'
                            options={[{value: '', label: ''}, {value: 'credit', label: 'Credit'}, {value: 'debit', label: 'Debit'}]}
                            onChange={(e) => {
                                dispatch({type: 'type', payload: e.target.value})
                            }}
                            value={formState.type}
                            required
                        />
                    </div>
                    
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
                        options={filteredCats ?? undefined}
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