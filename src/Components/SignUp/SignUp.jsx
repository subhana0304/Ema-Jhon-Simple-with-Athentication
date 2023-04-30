import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('');
    const {createUser} = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';


    const handleSubmit = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        setError('');

        if(password !== confirm){
            setError('your password did not match');
            return;
        }else if(password.length < 6){
            setError('password must be 6 characters or longer');
            return;
        }

        createUser(email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(error =>{
            console.log(error);
            setError(error.message);
        })
    }

    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input type="email" name='email' required placeholder='your email' />
            </div>
            <div className='form-control'>
                <label htmlFor="">Password</label>
                <input type="password" name='password' required placeholder='your password' />
            </div>
            <div className='form-control'>
                <label htmlFor="">Confirm Password</label>
                <input type="password" name='confirm' required placeholder='your password' />
            </div>
            <input className='btn-submit' type="submit" value="Sign Up"/>
        </form>
        <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
        <p className='text-error'>{error}</p>
    </div>
    );
};

export default SignUp;