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
            <header class="py-3">
                <div class="container d-flex flex-wrap justify-content-center" style={{ textAlign: 'center' }}>
                    <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 text-dark text-decoration-none">
                        <div className='' style={{ fontSize: '3rem' }}>
                            <svg class="bi me-2" width="40" height="32"></svg>
                            <span class="" style={{ fontFamily: 'fantasy' }}>FUTURE SKY</span>
                        </div>
                    </a>
                </div>
            </header>
            <nav class="py-2 bg-light border-bottom">
                <div class="container d-flex flex-wrap">
                    <ul class="nav me-auto">
                        <li class="nav-item"><a href="/" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
                        <li class="nav-item"><a href="/shop" class="nav-link link-dark px-2">Shop</a></li>
                        <li class="nav-item"><a href="/cart" class="nav-link link-dark px-2">Cart</a></li>
                    </ul>

                    {auth && (
                        <>
                            <ul class="nav">
                                <div class="dropdown text-end" style={{    lineHeight: '40px'}}>
                                    <a style={{marginRight:'25px'}} href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" />
                                    </a>
                                    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="/thong-tin">Profile</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li class="dropdown-item"><button class="nav-link link-dark px-2" onClick={() => { logout() }}>logout</button></li>
                                    </ul>
                                </div>
                               
                            </ul>
                        </>
                    )}
                    {!auth && (
                        <>
                            <ul class="nav">
                                <li class="nav-item"><a href="/login" class="nav-link link-dark px-2">Login</a></li>
                                <li class="nav-item"><a href="/signup" class="nav-link link-dark px-2">Sign in</a></li>
                            </ul>
                        </>
                    )}

                </div>
            </nav>

        </>
    );
}