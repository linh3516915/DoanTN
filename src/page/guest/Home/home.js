
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
export default function Home(props) {
    console.log("check auth:", props.data);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const tokentorun = useSelector(state => state.auth.tokenToRun);
    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Header />
            <Banner />
            <Category />
            <Supplier />
            <TopTrendingProduct />
            {/* <ProductHomePage /> */}
            {/* <OtherInfo /> */}
            <Footer />
        </>
    );
}