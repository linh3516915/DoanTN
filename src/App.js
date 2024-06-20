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
import Trangchu_Admin from './page/Admin/Home/Trangchu/Trangchu';
import Chinhanh_Admin from './page/Admin/Chinhanh/Chinhanh_Admin';
import Tongdai_Admin from './page/Admin/Tongdai/Tongdai_Admin';

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
        <Route path='/productdetail/:id' element={<ProductDetailPage />} />
        
        {/* Admin */}
        <Route path='/admin' element={<Trangchu_Admin/>} />
        <Route path='/chinhanh-admin' element={<Chinhanh_Admin/>}></Route>
        <Route path='/tongdai-admin' element={<Tongdai_Admin/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
