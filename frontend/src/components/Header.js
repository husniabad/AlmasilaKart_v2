import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown,Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar /*bg="dark"*/ className='jungle-color' variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer className='mr-5' to='/'>
                        <Navbar.Brand>
                            <img src='https://almasila-kart.s3.eu-north-1.amazonaws.com/icons/Almasila_Kart_logo.png'   width="200px" height="50px" fluid />
                            </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link >
                                    <i className="fas fa-shopping-cart position-relative">
                                        
                                {/* <span class="position-absolute top-50 start-100 translate-middle text-danger badge badge-sm rounded-pill bg-secondary">9 </span> */}
                                        </i>Cart
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown  title={userInfo.name} id='username'>
                                    
                                    <LinkContainer style={{border: 'none'}} className='bg-light text-dark' to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer style={{border: 'none'}} className='bg-light text-dark' to='/wallet'>
                                        <NavDropdown.Item >My Wallet</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer onClick={logoutHandler} style={{border: 'none'}} className='bg-light text-dark' to="/login">
                                        <NavDropdown.Item >Logout</NavDropdown.Item>
                                    </LinkContainer>
                                    

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
