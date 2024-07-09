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
//admin

import TongdaiAdmin from './page/Admin/Tongdai/Tongdai_Admin';
import SanPhamAdmin from './page/Admin/Sanpham/Sanpham_Admin';
import AddSanPham from './page/Admin/Sanpham/Add_sanpham';
import UpdateSanPham from './page/Admin/Sanpham/Update_sanpham';
import NhaCungCapAdmin from './page/Admin/NhaCungCap/NhacungcapAdmin';
import AddNhaCungCap from './page/Admin/NhaCungCap/Add_nhacungcap';
import UpdateNhaCungCap from './page/Admin/NhaCungCap/Update_nhacungcap';
import LoaisanphamAdmin from './page/Admin/LoaiSanPham/LoaisanphamAdmin';
import AddLoaiSanPham from './page/Admin/LoaiSanPham/Add_loaisanpham';
import UpdateLoaiSanPham from './page/Admin/LoaiSanPham/Update_loaisanpham';
import ChiTietSanPhamAdmin from './page/Admin/ChiTietSanPham/ChitietsanphamAdmin';
import AddChiTietSanPham from './page/Admin/ChiTietSanPham/Add_chitietsanpham';
import UpdateChiTietSanPham from './page/Admin/ChiTietSanPham/Update_chitietsanpham';
import ChiTietCauHinhAdmin from './page/Admin/ChiTietCauHinh/ChitietcauhinhAdmin';
import AddChitietcauhinh from './page/Admin/ChiTietCauHinh/Add_chitietcauhinh';
import UpdateChitietcauhinh from './page/Admin/ChiTietCauHinh/Update_chitietcauhinh';
import DungLuongAdmin from './page/Admin/DungLuong/DungLuongAdmin';
import AddDungLuong from './page/Admin/DungLuong/Add_Dungluong';
import UpdateDungLuong from './page/Admin/DungLuong/Update_Dungluong';
import MauSacAdmin from './page/Admin/MauSac/MausacAdmin';
import HinhAnhAdmin from './page/Admin/HinhAnhCTSP/HinhanhAdmin';
import AddHinhAnh from './page/Admin/HinhAnhCTSP/Add_hinhanh';
import UpdateTenShop from './page/Admin/TenShopAdmin/Update_Tenshop';
import SlideshowAdmin from './page/Admin/SlideshowAdmin/SlideshowAdmin';
import UpdateHinhAnh from './page/Admin/HinhAnhCTSP/Update_HinhAnh';
import AddSlideShow from './page/Admin/SlideshowAdmin/Add_Slideshow';
import UpdateSlideshow from './page/Admin/SlideshowAdmin/Update_Slidwshow';
import AddMauSac from './page/Admin/MauSac/Add_mausac';
import UpdateMauSac from './page/Admin/MauSac/Update_mausac';
import AddNhapHang from './page/Admin/NhapHangAdmin/Add_NhapHang';
import ChiNhanhAdmin from './page/Admin/Chinhanh/ChinhanhAdmin';
import TrangchuAdmin from './page/Admin/TrangChu/Trangchu';
import AddTongDai from './page/Admin/Tongdai/Add_Tongdai';
import UpdateTongDai from './page/Admin/Tongdai/Update_Tongdai';

function App() {
  const auth = useSelector(state => state.auth.authentication);
  const isadmin = useSelector(state => state.auth.isAdmin);
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
        {/* <Route path='/productdetail/:id' element={<ProductDetailPage />} /> */}
        
        {/* Admin */}
        <Route path='/admin' element={<TrangchuAdmin/>} />
        <Route path='/chinhanh-admin' element={(isadmin && auth) ? <ChiNhanhAdmin/> : <Navigate to='/'/>}></Route>
        <Route path='/tongdai-admin' element={(isadmin && auth) ?<TongdaiAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-tongdai' element={(isadmin && auth) ?<AddTongDai/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-tongdai/:id' element={(isadmin && auth) ?<UpdateTongDai/>: <Navigate to='/'/>}></Route>
        <Route path='/sanpham-admin' element={(isadmin && auth) ?<SanPhamAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-sanpham' element={(isadmin && auth) ?<AddSanPham/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-sanpham/:id' element={(isadmin && auth) ?<UpdateSanPham/>: <Navigate to='/'/>}></Route>
        <Route path='/nhacungcap-admin' element={(isadmin && auth) ?<NhaCungCapAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-nhacungcap' element={(isadmin && auth) ?<AddNhaCungCap/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-nhacungcap/:id' element={(isadmin && auth) ?<UpdateNhaCungCap/>: <Navigate to='/'/>}></Route>
        <Route path='/loaisanpham-admin' element={(isadmin && auth) ?<LoaisanphamAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-loaisanpham' element={(isadmin && auth) ?<AddLoaiSanPham/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-loaisanpham/:id' element={(isadmin && auth) ?<UpdateLoaiSanPham/>: <Navigate to='/'/>}></Route>
        <Route path='/chitietsanpham-admin/:id' element={(isadmin && auth) ?<ChiTietSanPhamAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-chitietsanpham/:id' element={(isadmin && auth) ?<AddChiTietSanPham/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-chitietsanpham/:id' element={(isadmin && auth) ?<UpdateChiTietSanPham/>: <Navigate to='/'/>}></Route>
        <Route path='/chitietcauhinh-admin/:id' element={(isadmin && auth) ?<ChiTietCauHinhAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-chitietcauhinh/:id' element={<AddChitietcauhinh/>}></Route>
        <Route path='/capnhat-chitietcauhinh/:id' element={(isadmin && auth) ?<UpdateChitietcauhinh/>: <Navigate to='/'/>}></Route>
        <Route path='/dungluong-admin' element={<DungLuongAdmin/>}></Route>
        <Route path='/themmoi-dungluong' element={(isadmin && auth) ?<AddDungLuong/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-dungluong/:id' element={(isadmin && auth) ?<UpdateDungLuong/>: <Navigate to='/'/>}></Route>
        <Route path='/mausac-admin' element={(isadmin && auth) ?<MauSacAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-mausac' element={(isadmin && auth) ?<AddMauSac/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-mausac/:id' element={(isadmin && auth) ?<UpdateMauSac/>: <Navigate to='/'/>}></Route>
        <Route path='/hinhanh-admin/:id' element={(isadmin && auth) ?<HinhAnhAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-hinhanh' element={(isadmin && auth) ?<AddHinhAnh/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-hinhanh' element={(isadmin && auth) ?<UpdateHinhAnh/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-tenshop/:id' element={(isadmin && auth) ?<UpdateTenShop/>: <Navigate to='/'/>}></Route>
        <Route path='/slideshow-admin' element={(isadmin && auth) ?<SlideshowAdmin/>: <Navigate to='/'/>}></Route>
        <Route path='/themmoi-slideshow' element={(isadmin && auth) ?<AddSlideShow/>: <Navigate to='/'/>}></Route>
        <Route path='/capnhat-slideshow/:id' element={(isadmin && auth) ?<UpdateSlideshow/>: <Navigate to='/'/>}></Route>
        <Route path='/nhaphang' element={(isadmin && auth) ?<AddNhapHang/> : <Navigate to='/'/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
