import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { Logout, isadmin } from "../../redux/slice/authSlice";
import { useEffect, useRef, useState } from 'react';
import styles from './NavBar.module.css';
import PopupLogin from '../PopupLogin/popuplogin';
import { openpopup, openpopuplogin, openpopupsignup } from '../../redux/slice/popupSlice';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/ảnh/tải xuống (1).jpg';
import PopupOTP from '../PopupOTP/popupOTP';
import Search from '../../component/SearchProduct/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputSearch from '../Search/inputsearch';
import LoadingSpinnerModal from '../../component/LoadingSpinnerModal/LoadingSpinnerModal';

export default function Header(props) {
    const auth = useSelector(state => state.auth.authentication);
    const [activeShop, setActiveShop] = useState(false);
    console.log('auth', auth);
    const isloadingmodal = useSelector(state => state.filter.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(Logout());
        dispatch(isadmin(false))
        navigate('/')
    }
    return (
        <>
            <PopupOTP />
            <PopupLogin />
            {isloadingmodal && (<LoadingSpinnerModal />)}
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
                        <div className="col">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div className="container-fluid">
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'space-between' }}>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="/">Home</a>
                                            </li>
                                            <li className={`nav-item`}>
                                                <a className={`nav-link`} href="/shop">Shop page</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/cart">Cart</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Category</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Others</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Contact</a>
                                            </li>
                                            {!props.ishowsearch && (
                                                <li className="nav-item">
                                                 <div>
                                                    <InputSearch />
                                                </div>
                                                   
                                                </li>
                                            )}

                                        </ul>
                                        <div className="text-end">

                                            {auth && (
                                                <>

                                                    <ul className="nav">
                                                        <div className="dropdown text-end" style={{ lineHeight: '40px' }}>
                                                            <a style={{ marginRight: '25px' }} href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <img src={img} alt="mdo" width="32" height="32" className="rounded-circle" />
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
                                                    <div className="text-end">
                                                        <button type="button" onClick={() => { dispatch(openpopuplogin()) }} className="btn btn-outline-light me-2">Login</button>
                                                        <button type="button" onClick={() => { navigate('/signup') }} className="btn btn-outline-light ">Sign-up</button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* <header className="p-3 text-white" style={{backgroundColor : '#1abc9c'}}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/home" className="nav-link px-2 text-secondary">Home</a></li>
                            <li><a href="/shop" className="nav-link px-2 text-white">Shop</a></li>
                            <li><a href="/cart" className="nav-link px-2 text-white">Cart</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                        </ul>
                        <div className="text-end">
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
                                    <div className="text-end">
                                        <button type="button" className="btn btn-outline-light me-2">Login</button>
                                        <button type="button" className="btn btn-outline-light ">Sign-up</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header> */}

        </>
    );
}