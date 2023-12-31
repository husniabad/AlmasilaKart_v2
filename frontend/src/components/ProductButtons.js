import React, { useState } from 'react';
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart, minusCart, removeFromCart } from '../actions/cartActions';




const ProductButtons = ({ itemInCart, product, inputGroupClass, addToCartClass, plusClass, minusClass, countClass, trashIcon }) => {

    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, Number(qty)));
    };

    const minusCartHandler = () => {
        dispatch(minusCart(product._id));
    };

    const removeItemHandler = () => {
        dispatch(removeFromCart(product._id));
    };


    return (
        <>
            {!itemInCart || itemInCart.qty <= 0 ? (
                <Button
                    onClick={addToCartHandler}
                    className={addToCartClass? addToCartClass : 'btn-block'}
                    disabled={product.countInStock === 0}
                    type='button'
                >
                    Add to Cart
                </Button>
            ) : (
                <InputGroup className={
                    inputGroupClass ? inputGroupClass : 
                    'd-flex flex-nowrap align-items-center justify-content-between text-center'}>
                    <Button
                        onClick={itemInCart.qty > 1 ? minusCartHandler : removeItemHandler}
                        className={minusClass? minusClass : "btn"}
                        disabled={product.countInStock === 0}
                        type='button'
                    >
                        <i className={`fas fa-${itemInCart.qty > 1 ? 'minus' : trashIcon? trashIcon: 'trash'}`}></i>
                    </Button>
                    <span className='bg-transparent w-auto '>{itemInCart.qty}</span>
                    <Button
                        onClick={addToCartHandler}
                        className={plusClass? plusClass : "btn"}
                        disabled={product.countInStock <= itemInCart.qty}
                        type='button'
                    >
                        <i className='fas fa-plus'></i>
                    </Button>
                </InputGroup>
            )}
        </>
    );
};

export default ProductButtons;
