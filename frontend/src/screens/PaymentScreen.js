import React, { useState, useEffect } from 'react'
import { Form, Button, Col ,ToggleButton, ToggleButtonGroup, Overlay, Tooltip, OverlayTrigger} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)



    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
      };


    //   get total to validate wallet
    
    
    

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        console.log(paymentMethod)
        history.push('/placeorder')
    }
    const walletBal = 5



    return (
        
        
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            
            <h4 className='mb-2'>total price: {cart.totalPrice}<small className='text-warning'>( including tax)</small></h4>
            <Form onSubmit={submitHandler}>
            <Form.Group as={Col} controlId='paymentMethod' >
      <Form.Label as='legend'>Select Method</Form.Label>
      <Col>
        <ToggleButtonGroup
        orientation="vertical"
          type='radio'
          name='paymentMethod'
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        //   vertical 

          className='border rounded p-3 w-300 ' 
          
        >
         <ToggleButton
            
            value='PayPal'
            className={paymentMethod === 'PayPal' ? 'btn btn-info mr-2' : 'mr-2 btn border border-info btn-light'}
          >
            PayPal or Credit Card
          </ToggleButton>
          <ToggleButton
          
            value='wallet'
            className={paymentMethod === 'wallet' ? 'btn btn-info ml-2' : 'ml-2 btn border border-info btn-light'}
          >
            Wallet
          </ToggleButton>
        </ToggleButtonGroup>
          {paymentMethod=== "wallet" && <p className={walletBal < cart.totalPrice ? "text-danger" : "text-success"}>{walletBal<cart.totalPrice ? `insufficient balance of $${walletBal}`  : `your balance is: $${walletBal}` }</p>}
      </Col>
    </Form.Group>
        
    <div
    className='mt-5'
        style={{
          background: 'lightgrey ',
          height: '2px',
        }}
      />
      <div className='mt-4'>

          {paymentMethod==="wallet"&&walletBal<cart.totalPrice ? 
          <OverlayTrigger  placement="auto"  overlay={<p className="ml-1 text-danger "  id="tooltip-disabled">Wallet Can not be used!! </p>}>
          <span className="d-inline-block ">
                <Button  style={{ pointerEvents: 'none' }} disabled={paymentMethod==="wallet"&&walletBal<cart.totalPrice} type='submit'  variant='primary'>
                    Continue
                </Button>
            </span>
        </OverlayTrigger>
        :
                <Button   disabled={paymentMethod==="wallet"&&walletBal<cart.totalPrice} type='submit'  variant='primary'>
                    Continue
                </Button>
}
      </div>
            </Form>
        </FormContainer>

    )
}

export default PaymentScreen
