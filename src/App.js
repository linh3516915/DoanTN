import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, NavLink, Navigate } from 'react-router-dom'
import Home from './page/guest/Home/home';
import Header from './layout/Header/header';
import Footer from './layout/Footer/Footer';
import Login from './page/guest/Login/login';
import SignUp from './page/guest/Signup/signup';
import Shop from './page/guest/Shop/shop';
import CartPage from './page/guest/Cart/Cartpage';
import ProductDetailPage from './page/guest/ProductdetailPage/Productdetailpage';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector(state => state.auth.authentication);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={auth ? <Navigate to ='/' />:<Login/>} />
        <Route path='/signup' element={auth ?  <Navigate to ='/' />:<SignUp/>} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={auth ? <CartPage />: <Navigate to ='/login' />} />
        <Route path='/productdetail' element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
