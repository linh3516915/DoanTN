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
  const a = 1;
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home data={a}/>} />
        <Route path='/login' element={auth ? <Navigate to ='/' />:<Login/>} />
        <Route path='/signup' element={auth ?  <Navigate to ='/' />:<SignUp/>} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={ <CartPage />} />
        <Route path='/productdetail' element={<ProductDetailPage />} />
      </Routes>
      
    </>
  );
}

export default App;
