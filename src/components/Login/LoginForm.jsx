/*import React from 'react';
import Login from '@react-login-page/page3';
import defaultBannerImage from '@react-login-page/page3/bg.jpeg';

const LoginForm = () => (
    <Login style={{ height: 580 }} className='container-fluid form_container'>
        <Login.Banner style={{ backgroundImage: `url(${defaultBannerImage})` }} />
        <Login.Password>
            <div>xx</div>
        </Login.Password>
    </Login>
);

export default LoginForm;*/
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa"
import './LoginForm.css'

const LoginForm = () => (
    <div className='container wrapper_container'>
        <div className='wrapper'>
            <form action="" className='form-container'>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type="email" placeholder='Email' required />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Password' required />
                    <FaLock className='icon' />
                </div>
                <div className="remember-forgot">
                    <Link className="btn_restore" to="/restore"> Forgot your password?</Link>
                </div>
                <button type="submit" className="w-100 btn btn-dark">Login</button>
                <div className="register-link">
                    <p>{"Don't have an account? "}<Link to="/register" className='btn_restore'>Register</Link></p>
                </div>
            </form>
        </div>
    </div >
);

export default LoginForm;
