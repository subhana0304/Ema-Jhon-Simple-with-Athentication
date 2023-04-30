import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {

    const {user, logOut} = useContext(AuthContext);
    const handleLogOut = () =>{
        logOut()
        .then(result => {})
        .catch(error => console.error(error));
    }

    return (
        <nav className='header'>
            <Link to="/"><img src={logo} alt=""/></Link>
            <div>
                <Link to="/order">Order</Link>
                <Link to="/orderReview">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signUp">Sign Up</Link>
                {user && <span className='text-white'>{user.email} <button onClick={handleLogOut}>Log Out</button> </span>}
            </div>
        </nav>
    );
};

export default Header;