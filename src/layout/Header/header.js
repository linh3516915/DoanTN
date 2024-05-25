
import './Navbar.css';
export default function Header() {
    return (
        <>
            <header class="py-3">
                <div class="container d-flex flex-wrap justify-content-center" style={{ textAlign: 'center' }}>
                    <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 text-dark text-decoration-none">
                        <div className='' style={{fontSize : '3rem'}}>
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
                    <ul class="nav">
                        <li class="nav-item"><a href="/login" class="nav-link link-dark px-2">Login</a></li>
                        <li class="nav-item"><a href="/signup" class="nav-link link-dark px-2">Sign up</a></li>
                    </ul>
                </div>
            </nav>

        </>
    );
}