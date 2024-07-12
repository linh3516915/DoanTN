import { NavLink, useNavigate } from "react-router-dom";
import { Logout, isadmin } from "../../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function TaskbarAdmin() {
    const nameshop = useSelector(state=>state.auth.nameshop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    return (
        <>
            
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '16%', position: 'fixed', minHeight: '100%', height: '100vh', overflowY: 'auto' }}>
                <a href="/admin" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"></svg>
                    {nameshop != '' && (
                        <span style={{ paddingBottom: '10px', textAlign: 'center' }} class="fs-4">{nameshop[0].ten_shop}</span>
                    )}
                    
                </a>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li>  <NavLink to="/sanpham-admin" className="nav-link  text-white" >Sản Phẩm</NavLink></li>
                    <li>  <NavLink to="/nhacungcap-admin" className="nav-link  text-white" >Nhà cung cấp</NavLink></li>
                    <li>  <NavLink to="/loaisanpham-admin" className="nav-link  text-white" >Loại sản phẩm</NavLink></li>
                    <li>  <NavLink to="/hinhanh-admin" className="nav-link  text-white" >Hình Ảnh</NavLink></li>
                    <li>  <NavLink to="/slideshow-admin" className="nav-link  text-white" >SlideShow</NavLink></li>
                    <li>  <NavLink to="/chinhanh-admin" className="nav-link  text-white" >Chi Nhánh</NavLink></li>
                    <li>  <NavLink to="/tongdai-admin" className="nav-link  text-white" >Tổng Đài</NavLink></li>
                    <li>  <NavLink to="/quanlydonhangadmin" className="nav-link  text-white" >Quản lý đơn hàng </NavLink></li>
                    
                </ul>
                
            </div>

        </>
    );
}