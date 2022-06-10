import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Private: React.FC<{ children: ReactNode}> = ({ children }) => {

    const { isAuthed } = useUser();

    if(isAuthed) {
        return (
            <>
            {children}
            </>)
    }

  return (
    <Navigate to='/login' />
  )
}

export default Private;