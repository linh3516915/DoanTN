import { NavLink } from "react-router-dom";
export default function TaskbarAdmin() {
    return (
        <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                        <li>  <NavLink to="/sanpham-admin" className="nav-link  text-secondary" >Sản Phẩm</NavLink></li>
                        <li>  <NavLink to="/nhacungcap-admin" className="nav-link  text-secondary" >Nhà cung cấp</NavLink></li>
                        <li>  <NavLink to="/loaisanpham-admin" className="nav-link  text-secondary" >Loại sản phẩm</NavLink></li>
                        <li>  <NavLink to="/chinhanh-admin" className="nav-link  text-secondary" >Chi Nhánh</NavLink></li>
                        <li>  <NavLink to="/tongdai-admin" className="nav-link  text-secondary" >Tổng Đài</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}