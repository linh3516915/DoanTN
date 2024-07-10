
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
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";
import styles from './ordermanagement.module.css'
export default function Ordermanagement(props) {
    console.log("check auth:", props.data);
    const dispatch = useDispatch();
    const isloadingmodal = useSelector(state => state.filter.loading);
    const token = useSelector(state => state.auth.token);
    const tokentorun = useSelector(state => state.auth.tokenToRun);
    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Header />

            {isloadingmodal && (<LoadingSpinnerModal />)}
            <div className={`${styles['content']}`}>
                <div className={`${styles['sidebar']}`} >
                    <Sidebar />
                </div>

                <div  className={`${styles['main-content']}`} >
                    <Contentmanagement />
                </div>

            </div>

            <Footer />
        </>
    );
}