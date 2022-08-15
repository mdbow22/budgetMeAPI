import React from 'react';

const Modal: React.FC<{
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, show, setShow }) => {
  return (
    <>
      <div
        className={`absolute backdrop-blur-sm top-0 left-0 bg-gray-600/40 h-screen w-screen ${
          !show ? 'hidden' : 'pointer-events-all'
        }`}
        style={{ zIndex: 960 }}
        onClick={() => setShow(false)}
      ></div>
      <div
        className={`fixed top-24 left-0 w-screen pointer-events-none ${
          !show ? 'modal' : 'modal-active'
        }`}
        style={{ zIndex: 970 }}
      >
        <div
          className='border w-1/2 bg-gray-50 p-4 mx-auto'
          style={{ zIndex: 980 }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
