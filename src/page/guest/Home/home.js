import { useSelector } from "react-redux";
import Banner from "../../../component/Banner/Banner";
import OtherInfo from "../../../component/Otherinfo/OtherInfo";
import ProductHomePage from "../../../component/Product/producthomepage";
import TopTrendingProduct from "../../../component/TopTrendingProduct/toptrendingproduct";
import Category from "../../../component/category/Category";




export default function Home() {
    return (
        <>
            <div className="container d-flex flex-column gap-5">
                <Banner />
                <Category />
                <TopTrendingProduct />
                <ProductHomePage />
                <OtherInfo />
            </div>

        </>
    );
}