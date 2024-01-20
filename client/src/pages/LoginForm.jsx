import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { API_URL } from './TruckTypes';
const LoginForm = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
    
      const response = await axios.post(`${API_URL}/loginAdmin`, {
        email,
        password,
      });
      if(response.data.success) {
        navigate('/dashboard');
      }else {
        alert(response.data.message);
      }
    } catch (error) {
     
      console.error('Login failed', error);
    }
  };

  return (
    <>
    <Header/>
     <div className="flex flex-col">
        <div className="mt-[100px]  p-[10px] md:p-[20px]">
            <div className="flex justify-center">
                <form onSubmit={handleLogin} className='flex flex-col gap-[20px]  w-[auto] lg:w-[500px]'>
                <label className='flex flex-col gap-[10px]'>
                    Email:
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                </label>
                <label className='flex flex-col gap-[10px]'>
                    Password:
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border-[1px] border-lightBlue outline-none rounded-[3px] text-[17px] py-[4px] px-[3px]'
                    />
                </label>
                <div className="flex justify-center items-center">
                    <button type="submit"
                    className='bg-lightBlue px-[25px] py-[8px] rounded-[4px]'
                    >Login
                    </button>
                </div>
                
                </form>
            </div>
            
        </div>
    </div>
    </>
   
   
  );
};

export default LoginForm;
