import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import "./Order.css";
import { Link, useLoaderData } from 'react-router-dom';
import ReviewContainer from '../ReviewContainer/ReviewContainer';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Order = () => {
    const saveCart = useLoaderData();
    const [cart, setCart] = useState(saveCart);
    // console.log(saveCart);

    const handleRemoveFromCart = (id) =>{
        const remaining = cart.filter(product => product.id !== id);
        console.log(remaining);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewContainer 
                        key={product.id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                        ></ReviewContainer>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceedLink' to="/checkOut">
                    <button className='btn-proceed'>Proceed CheckOut</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;