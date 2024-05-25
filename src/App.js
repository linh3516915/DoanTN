import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home/home';
import Header from './layout/Header/header';
import Footer from './layout/Footer/Footer';
import Login from './page/Login/login';
import SignUp from './page/Signup/signup';
import Shop from './page/Shop/shop';
import CartPage from './page/Cart/Cartpage';
import ProductDetailPage from './page/ProductdetailPage/Productdetailpage';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/productdetail' element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
