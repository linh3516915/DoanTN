
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
import { getuser } from "../../../redux/slice/authSlice";
import Supplier from "../../../component/Supplier/supplier";
export default function Home(props) {
    console.log("check auth:",props.data);
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
                    dispatch(getuser(user.data));
                    console.log(user.data);
                }
                getAPI();
            }

        } catch (error) {
            alert('loi');
        }

    }, [token,dispatch])

    return (
        <>
            <Header />
            <Banner />
            
            <div className="container d-flex flex-column gap-5">

                <Category />
                <TopTrendingProduct />
                <ProductHomePage />
                <Supplier/>
                <OtherInfo />
            </div>
            <Footer />
        </>
    );
}