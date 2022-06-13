import React, { FormEvent, useEffect, useReducer, useState } from 'react'
import FormSelect from '../../FormInputs/FormSelect';
import SubmitBtn from '../../FormInputs/SubmitBtn';
import TextInput from '../../FormInputs/TextInput';
import { UserAccounts } from '../../services/AccountContext';
import API from '../../utils/API';
import { getToken } from '../../utils/Auth';
import useAccountContext from '../../services/AccountContext';

interface QuickTransType {
    account: number | undefined;
    type: string;
    amount: number | string;
    category: any;
    description: string;
    date?: string;
}

interface ReducerAction {
    type: string;
    payload: string;
}

const QuickTransBox: React.FC<{ userAccounts: UserAccounts[], fillAccounts: () => Promise<any> }> = ({ userAccounts, fillAccounts }) => {

    const [categories, setCategories] = useState<any>();
    const [filteredCats, setFilteredCats] = useState<any>();

    const options = [{value: '', label: ''}, ...userAccounts.map(account => ({value: account.id, label: account.name}))];

    useEffect(() => {
        const token = getToken();
        if(token) {
            API.get('/transaction/categories', token)
            .then((res: any) => {
                const formatted = res.map((category: any) => ({
                    value: { ...category },
                    label: category.category,
                }));

                setCategories(formatted);
            })
        }
        
    }, [setCategories])

    const initState: QuickTransType = {
        account: undefined,
        type: '',
        amount: '',
        category: undefined,
        description: '',
    }

    const reducer = (state: QuickTransType, action: ReducerAction) => {
        if(action.type) {
            console.log(action.payload);
            const newState = {
                ...state,
                [action.type]: action.type === 'category' ? JSON.parse(action.payload) : action.payload,
            }
            console.log(newState.category);
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
                    setFilteredCats(categories.filter((category: any) => category.value.type === 'credit')
                        .map((category: any) => ({value: JSON.stringify(category.value), label: category.label})));
                    break;
                }
                case 'debit': {
                    setFilteredCats(categories.filter((category: any) => category.value.type === 'debit')
                        .map((category: any) => ({value: JSON.stringify(category.value), label: category.label})));
                    break;
                }
                default: {
                    setFilteredCats(undefined);
                }
            }
        } else {
            setFilteredCats(undefined);
        }
    }, [categories, setFilteredCats, formState.type])

    const submit = (e: FormEvent) => {
        e.preventDefault();

        let transAmount = Number(formState.amount);

        const body = {
            account: formState.account,
            transaction: {
                category: formState.category.category,
                category_id: formState.category.id,
                description: formState.description,
                amount: formState.type === 'debit' ? transAmount * -1 : transAmount,
                date: new Date(),
            }
        }

        API.post('/transaction/newTransaction', body, true)
            .then((res: any) => {
                console.log(res);
                fillAccounts();
            });
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
                            console.log('e:', e);
                            dispatch({type: 'category', payload: e.target.value})
                        }}
                        value={formState.category?.category}
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