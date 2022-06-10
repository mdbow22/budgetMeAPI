import React from 'react'

const SubmitBtn: React.FC<{text?: string}> = ({text}) => {
  return (
    <button type='submit'
            className='shadow-md active:shadow-inner py-1 px-3 bg-violet-600 text-white'>
            {text ?? 'Submit'}
        </button>
  )
}

export default SubmitBtn