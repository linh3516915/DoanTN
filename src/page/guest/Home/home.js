
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
import { getuser, isadmin } from "../../../redux/slice/authSlice";
import Supplier from "../../../component/Supplier/supplier";
import PopupLogin from "../../../layout/PopupLogin/popuplogin";
import { addCartUser } from "../../../redux/slice/cartSlice";
export default function Home(props) {
    console.log("check auth:", props.data);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        try {
            if (token !== '') {
                const getAPI = async () => {
                    const user = await axios.get('http://127.0.0.1:8000/api/auth/profile', {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `bearer ${token}`
                        }
                    })
                    console.log(user.data);
                    if(user.data.data_user.isAdmin == 0){
                        dispatch(getuser(user.data.data_user));
                        dispatch(addCartUser(user.data.data_gio_hang));
                        dispatch(isadmin(false));
                    }
                    else{
                        dispatch(getuser(user.data.data_user));
                        dispatch(isadmin(true))
                    }
                    dispatch(getuser(user.data));
                    console.log(user.data);
                }
                getAPI();
            }

        } catch (error) {
            alert('loi');
        }

    }, [token, dispatch])

    return (
        <>
            <Header />
            <Banner />
            <Category />
            <Supplier />
            <TopTrendingProduct />
            <ProductHomePage />
            <OtherInfo />
            <Footer />
        </>
    );
}