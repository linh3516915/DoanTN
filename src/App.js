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
import TrangchuAdmin from './page/Admin/TrangChu/Trangchu';
import ChinhanhAdmin from './page/Admin/Chinhanh/ChinhanhAdmin';
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
        <Route path='/admin' element={<TrangchuAdmin/>} />
        <Route path='/chinhanh-admin' element={<ChinhanhAdmin/>}></Route>
        <Route path='/tongdai-admin' element={<TongdaiAdmin/>}></Route>
        <Route path='/sanpham-admin' element={<SanPhamAdmin/>}></Route>
        <Route path='/themmoi-sanpham' element={<AddSanPham/>}></Route>
        <Route path='/capnhat-sanpham/:id' element={<UpdateSanPham/>}></Route>
        <Route path='/nhacungcap-admin' element={<NhaCungCapAdmin/>}></Route>
        <Route path='/themmoi-nhacungcap' element={<AddNhaCungCap/>}></Route>
        <Route path='/capnhat-nhacungcap/:id' element={<UpdateNhaCungCap/>}></Route>
        <Route path='/loaisanpham-admin' element={<LoaisanphamAdmin/>}></Route>
        <Route path='/themmoi-loaisanpham' element={<AddLoaiSanPham/>}></Route>
        <Route path='/capnhat-loaisanpham/:id' element={<UpdateLoaiSanPham/>}></Route>
        <Route path='/chitietsanpham-admin/:id' element={<ChiTietSanPhamAdmin/>}></Route>
        <Route path='/themmoi-chitietsanpham/:id' element={<AddChiTietSanPham/>}></Route>
        <Route path='/capnhat-chitietsanpham/:id' element={<UpdateChiTietSanPham/>}></Route>
        <Route path='/chitietcauhinh-admin/:id' element={<ChiTietCauHinhAdmin/>}></Route>
        <Route path='/themmoi-chitietcauhinh/:id' element={<AddChitietcauhinh/>}></Route>
        <Route path='/capnhat-chitietcauhinh/:id' element={<UpdateChitietcauhinh/>}></Route>
        <Route path='/dungluong-admin' element={<DungLuongAdmin/>}></Route>
        <Route path='/themmoi-dungluong' element={<AddDungLuong/>}></Route>
        <Route path='/capnhat-dungluong/:id' element={<UpdateDungLuong/>}></Route>
        <Route path='/mausac-admin' element={<MauSacAdmin/>}></Route>
        <Route path='/themmoi-mausac' element={<AddMauSac/>}></Route>
        <Route path='/capnhat-mausac/:id' element={<UpdateMauSac/>}></Route>
        <Route path='/hinhanh-admin' element={<HinhAnhAdmin/>}></Route>
        <Route path='/themmoi-hinhanh' element={<AddHinhAnh/>}></Route>
        <Route path='/capnhat-hinhanh' element={<UpdateHinhAnh/>}></Route>
        <Route path='/capnhat-tenshop/:id' element={<UpdateTenShop/>}></Route>
        <Route path='/slideshow-admin' element={<SlideshowAdmin/>}></Route>
        <Route path='/themmoi-slideshow' element={<AddSlideShow/>}></Route>
        <Route path='/capnhat-slideshow/:id' element={<UpdateSlideshow/>}></Route>
        <Route path='/nhaphang' element={<AddNhapHang/>}></Route>
      </Routes>
      
    </>
  );
}

export default App;
