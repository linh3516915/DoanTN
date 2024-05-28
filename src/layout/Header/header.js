
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { Logout } from "../../redux/slice/authSlice";
export default function Header() {
    const auth = useSelector(state => state.auth.authentication);
    console.log('auth',auth);
    const dispatch = useDispatch();
    const logout= () => {
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
                    </ul>
                    {auth && (
                        <>
                            <ul class="nav">
                                <li class="nav-item"><a href="/cart" class="nav-link link-dark px-2">Cart</a></li>
                                <li class="nav-item"><button class="nav-link link-dark px-2" onClick={()=>{logout()}}>logout</button></li>
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