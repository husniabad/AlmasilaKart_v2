import axios from 'axios'
import {
    // CART_LIST_REQUEST,
    // CART_LIST_SUCCESS,
    // CART_LIST_FAIL,

    CART_ADD_ITEM,
    CART_MINUS_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'



// // fetch cart from db
// export const listCartItems = () => async (dispatch,getState) => {
//     try {
//         dispatch({ type: CART_LIST_REQUEST })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//               Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const { data: cartItemsData } = await axios.get(`/api/cart/`, config);
//         console.log("data", cartItemsData)

//         // Fetch product details for each cart item and merge them
//         const updatedCartItems = await Promise.all(cartItemsData.map(async cartItem => {
//             console.log('cartitem', cartItem)
//             const { data: productData } = await axios.get(`/api/products/4`);
//             console.log("product", productData)

//             // return {
//             //     ...cartItem,
//             //     product: productData,
//             // };
//         }));

//         console.log("cartItemsData",updatedCartItems)

//         dispatch({
//             type: CART_LIST_SUCCESS,
//             payload: updatedCartItems
//         });


//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         dispatch({
//             type: CART_LIST_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)


    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


// export const minusCart = (productId) => {
//     return {
//       type: CART_MINUS_ITEM,
//       payload: productId,
//     };
//   };

export const minusCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_MINUS_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}