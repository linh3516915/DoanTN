import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { Logout } from "../../redux/slice/authSlice";
import { useEffect, useRef } from 'react';
import styles from './NavBar.module.css';
export default function Header() {
    const auth = useSelector(state => state.auth.authentication);
    console.log('auth', auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(Logout());
    }



    return (
        <>
            <div className="header-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="user-menu">
                                <ul>
                                    <li><a href="#"><i className="fa fa-user"></i> My Account</a></li>
                                    <li><a href="#"><i className="fa fa-heart"></i> Wishlist</a></li>
                                    <li><a href="cart.html"><i className="fa fa-user"></i> My Cart</a></li>
                                    <li><a href="checkout.html"><i className="fa fa-user"></i> Checkout</a></li>
                                    <li><a href="#"><i className="fa fa-user"></i> Login</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="header-right">
                                <ul className="list-unstyled list-inline">
                                    <li className="dropdown dropdown-small">
                                        <a data-toggle="dropdown" data-hover="dropdown" className="dropdown-toggle" href="#"><span className="key">currency :</span><span className="value">USD </span><b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">USD</a></li>
                                            <li><a href="#">INR</a></li>
                                            <li><a href="#">GBP</a></li>
                                        </ul>
                                    </li>

                                    <li className="dropdown dropdown-small">
                                        <a data-toggle="dropdown" data-hover="dropdown" className="dropdown-toggle" href="#"><span className="key">language :</span><span className="value">English </span><b className="caret"></b></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">English</a></li>
                                            <li><a href="#">French</a></li>
                                            <li><a href="#">German</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-branding-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="logo">
                                <h1><a href="index.html">e<span>Electronics</span></a></h1>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="shopping-item">
                                <a href="cart.html">Cart - <span className="cart-amunt">$800</span> <i className="fa fa-shopping-cart"></i> <span className="product-count">5</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mainmenu-area">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className="navbar-collapse collapse">
                                <ul className="nav navbar-nav" style={{display : 'block'}}>
                                    <li className="active"><a href="index.html">Home</a></li>
                                    <li><a href="shop.html">Shop page</a></li>
                                    <li><a href="single-product.html">Single product</a></li>
                                    <li><a href="cart.html">Cart</a></li>
                                    <li><a href="checkout.html">Checkout</a></li>
                                    <li><a href="#">Category</a></li>
                                    <li><a href="#">Others</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                                {auth && (
                                    <>
                                        <ul className="nav">
                                            <div className="dropdown text-end" style={{ lineHeight: '40px' }}>
                                                <a style={{ marginRight: '25px' }} href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                                                </a>
                                                <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                                    <li><a className="dropdown-item" href="/thong-tin">Profile</a></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li className="dropdown-item"><button className="nav-link link-dark px-2" onClick={() => { logout() }}>logout</button></li>
                                                </ul>
                                            </div>

                                        </ul>
                                    </>
                                )}
                                {!auth && (
                                    <>
                                        <ul className="nav" style={{flexWrap:'nowrap'}}>
                                            <li className="nav-item"><a href="/login" className="nav-link link-dark px-2" style={{    lineHeight: '4rem'}}>Login</a></li>
                                            <li className="nav-item" style={{    width:'55px'}}><a href="/signup" className="nav-link link-dark px-2" style={{    lineHeight: '4rem'}}>Sign in</a></li>
                                        </ul>
                                    </>
                                )}
                        </div>


                    </div>
                </div>
            </div>


        </>
    );
}