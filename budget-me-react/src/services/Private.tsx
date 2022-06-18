import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Private: React.FC<{ children: ReactNode}> = ({ children }) => {

    const navigate = useNavigate();
    const { isAuthed } = useUser();

    if(!isAuthed) {
        navigate(`/login`); 
    }

  return (
    <>
    {children}
    </>)
}

export default Private;