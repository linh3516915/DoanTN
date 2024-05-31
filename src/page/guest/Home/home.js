import { useSelector } from "react-redux";
import Banner from "../../../component/Banner/Banner";
import OtherInfo from "../../../component/Otherinfo/OtherInfo";
import ProductHomePage from "../../../component/Product/producthomepage";
import TopTrendingProduct from "../../../component/TopTrendingProduct/toptrendingproduct";
import Category from "../../../component/category/Category";
import Header from "../../../layout/Header/header";
import Footer from "../../../layout/Footer/Footer";




export default function Home() {
    return (
        <>
        <Header/>
            <div className="container d-flex flex-column gap-5">
                <Banner />
                <Category />
                <TopTrendingProduct />
                <ProductHomePage />
                <OtherInfo />
            </div>
<Footer/>
        </>
    );
}