import React, { useContext, useEffect, useState } from 'react';
import './loginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            setShowLogin(false);
            alert("Login Successful!");
        } else {
            alert(response.data.message);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Login' ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === 'Sign Up' ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === 'Login' ? <p>Create New Account? <span onClick={() => setCurrState("Sign Up")} >Sign Up</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>}
            </form>
        </div>
    );
};

export default LoginPopup;
