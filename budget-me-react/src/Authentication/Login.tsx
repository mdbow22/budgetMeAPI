import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SubmitBtn from '../FormInputs/SubmitBtn';
import TextInput from '../FormInputs/TextInput';
import { useUser } from '../services/UserContext';
import API from '../utils/API';
import { decode, setToken } from '../utils/Auth';

interface ActionType {
    type: string;
    payload: string | null | undefined;
}

interface LoginFormType {
    username: string;
    password: string;
}

const Login: React.FC = () => {

    const navigate = useNavigate();
    const {setUser, setIsAuthed} = useUser();

    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>();

    const initForm: LoginFormType = {
        username: '',
        password: '',
    }

    const reducer = (state: LoginFormType, action: ActionType) => {
        return {
            ...state,
            [action.type]: action.payload,
        }
    }

    const [form, dispatch] = useReducer(reducer, initForm);

    const loginUser = async (e: any) => {
        e.preventDefault();
        try {
            //don't do anything if a field is empty
            if(form.username.length === 0 || form.password.length === 0) {
                return;
            }

            const data = await API.post('/user/login', form);

            setUser(decode(data.token));
            setToken(data.token);
            setIsAuthed(true);
            navigate(`/user/${data.signedUser.id}/dashboard`);

        } catch (err: any) {
            if(err.message === 'invalid username/password') {
                setErrorMsg('Invalid username or password');
            } else {
                setErrorMsg('Unable to login');
            }

            setLoginFailed(true);
        }
    }

  return (
    <div className='mx-auto border max-w-lg mt-20 p-4 bg-gradient-to-bl from-green-50 shadow-lg'>
            <form onSubmit={loginUser}>
                <h2 className="text-3xl text-green-600 font-bold">Login</h2>
                {loginFailed &&
                    <p className='text-sm mt-2 -mb-3 text-red-500'>{errorMsg}</p>
                }
                <div className='mt-3'>
                    <TextInput
                        required
                        onChange={(e) => dispatch({type: 'username', payload: e.target.value})}
                        value={form.username}
                        placeholder='username'
                        name='newUserUsername'
                        labelText='Username'
                        type='text'
                        />
                    <TextInput
                        required
                        onChange={(e) => dispatch({type: 'password', payload: e.target.value})}
                        value={form.password}
                        placeholder='password'
                        name='newUserPassword'
                        labelText='Password'
                        type='password'
                        />
                    
                    <div className='flex justify-between items-center mt-5'>
                        <SubmitBtn text="Login" />
                        <p className='text-sm'>Not a user yet? 
                            <Link to='/signup'>
                                <span className='text-violet-600'> Sign up!</span>
                            </Link>
                        </p>
                    </div>
                    
                </div>
                
            </form>
        </div>
  )
}

export default Login;