import React ,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import ProductButtons from './ProductButtons'
import { listProductDetails } from '../actions/productActions'

function Product({ match,product }) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
  
    const itemInCart = cartItems.find(item => item.product === Number(product._id));
    const dispatch = useDispatch()

    console.log("product",product._id)
    console.log("itemInCart ",itemInCart?.product ?? "empty")



    return (
        <Card className="text-dark my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
                <div className='wishlist-heart '
                style={{backgroundColor:'rgba(255, 255, 255, 0.5)'}}
                >
                    <i className='far fa-heart'></i>
                </div>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong className='text-dark'>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </div>
                </Card.Text>


                <Card.Text as="h3"  style={{ marginBottom: '0' , paddingBottom:'0'}}>
                    ${product.price}
                </Card.Text>
                <Card.Text  as='small'  style={{ marginTop: '0' }}>
                    available: {product.countInStock}
                </Card.Text>
                <ProductButtons 
                itemInCart={itemInCart} 
                product={product}
                 />

            </Card.Body>
        </Card>
    )
}

export default Product
