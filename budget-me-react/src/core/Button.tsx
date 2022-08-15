import React from 'react'

type ButtonProps = {
    onClick: (val: any) => void;
    children: JSX.Element | string;
}

const Button: React.FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button className='bg-green-600 text-white shadow-md shadow-gray-400 px-2 active:shadow-inner' onClick={onClick}>
        {children}
    </button>
  )
}

export default Button;