import axios from 'axios';
import React, { useState } from 'react';
import Header from './Header';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {
    
      const response = await axios.post('YOUR_API_ENDPOINT/login', {
        email,
        password,
      });

     
      console.log('Login successful', response.data);
    } catch (error) {
     
      console.error('Login failed', error);
    }
  };

  return (
    <>
    <Header/>
     <div className="flex flex-col">
        <div className="mt-[100px] justify-center items-center p-[10px] md:p-[20px]">
            <form onSubmit={handleLogin} className='flex flex-col gap-[20px] justify-center'>
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
    </>
   
   
  );
};

export default LoginForm;
