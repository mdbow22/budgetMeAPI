import React from 'react'

const ModalBod: React.FC<{children: React.ReactNode | string}> = ({children}) => {
  return (
    <div className='mt-3'>{children}</div>
  )
}

export default ModalBod;