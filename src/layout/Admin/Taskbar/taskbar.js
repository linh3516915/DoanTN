import { NavLink, useNavigate } from "react-router-dom";
import { Logout, isadmin } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
export default function TaskbarAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(Logout());
        dispatch(isadmin(false));
        alert('hahah');
        navigate('/');
        
    }
    return (
        <>
            {/* <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                        <li>  <NavLink to="/sanpham-admin" className="nav-link  text-secondary" >Sản Phẩm</NavLink></li>
                        <li>  <NavLink to="/nhacungcap-admin" className="nav-link  text-secondary" >Nhà cung cấp</NavLink></li>
                        <li>  <NavLink to="/loaisanpham-admin" className="nav-link  text-secondary" >Loại sản phẩm</NavLink></li>
                        <li>  <NavLink to="/hinhanh-admin" className="nav-link  text-secondary" >Hình Ảnh</NavLink></li>
                        <li>  <NavLink to="/slideshow-admin" className="nav-link  text-secondary" >SlideShow</NavLink></li>
                        <li>  <NavLink to="/chinhanh-admin" className="nav-link  text-secondary" >Chi Nhánh</NavLink></li>
                        <li>  <NavLink to="/tongdai-admin" className="nav-link  text-secondary" >Tổng Đài</NavLink></li>
                    </ul>
                </div>
            </nav> */}
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '20%', height: '45rem' }} >
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"></svg>
                    <span class="fs-4">Sidebar</span>
                </a>
                {/* <hr> */}
                <ul class="nav nav-pills flex-column mb-auto">
                    <li>  <NavLink to="/sanpham-admin" className="nav-link  text-white" >Sản Phẩm</NavLink></li>
                    <li>  <NavLink to="/nhacungcap-admin" className="nav-link  text-white" >Nhà cung cấp</NavLink></li>
                    <li>  <NavLink to="/loaisanpham-admin" className="nav-link  text-white" >Loại sản phẩm</NavLink></li>
                    <li>  <NavLink to="/hinhanh-admin" className="nav-link  text-white" >Hình Ảnh</NavLink></li>
                    <li>  <NavLink to="/slideshow-admin" className="nav-link  text-white" >SlideShow</NavLink></li>
                    <li>  <NavLink to="/chinhanh-admin" className="nav-link  text-white" >Chi Nhánh</NavLink></li>
                    <li>  <NavLink to="/tongdai-admin" className="nav-link  text-white" >Tổng Đài</NavLink></li>
                </ul>
                {/* <hr> */}
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="/">Back to home</a></li>
                        {/* <li><hr class="dropdown-divider"></li> */}
                        <li className="dropdown-item"><button className="nav-link link-white px-2" onClick={() => { logout() }}>logout</button></li>
                    </ul>
                </div>
            </div>

        </>
    );
}