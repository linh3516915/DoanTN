
import Banner from "../../../component/Banner/Banner";
import OtherInfo from "../../../component/Otherinfo/OtherInfo";
import ProductHomePage from "../../../component/Product/producthomepage";
import TopTrendingProduct from "../../../component/TopTrendingProduct/toptrendingproduct";
import Category from "../../../component/category/Category";
import Header from "../../../layout/Header/header";
import Footer from "../../../layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { gettokentorun, getuser, isadmin } from "../../../redux/slice/authSlice";
import Supplier from "../../../component/Supplier/supplier";
import PopupLogin from "../../../layout/PopupLogin/popuplogin";
import { addCartUser } from "../../../redux/slice/cartSlice";
import Sidebar from "../../../component/Sidebarguest/sidebar";
import Contentprofile from "../../../component/ContentProfile/contentprofile";
import Contentmanagement from "../../../component/Contentordermanagement/Contentordermanagement";
import HeaderAdmin from "../../../layout/Admin/Header/Header";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import Contentmanagementadmin from "../../../component/Quanlydonhangadmin/Contentordermanagement";
export default function Quanlydonhang(props) {
    console.log("check auth:", props.data);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const tokentorun = useSelector(state => state.auth.tokenToRun);
    const user = useSelector(state => state.auth.user);

    return (
        <>
             <HeaderAdmin/>
            <div className="container-fluid">
                <div style={{height: '38rem'}} className="row">
                    <TaskbarAdmin/>
                    <main style={{width:'84%', overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Quản Lý Đơn Hàng</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                <a href="/themmoi-nhacungcap" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>
                            
                            </div>
                        </div>
                       <Contentmanagementadmin/>
                    </main>
                </div>
            </div>
        </>
    );
}