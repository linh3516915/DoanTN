import Banner from "../../component/Banner/Banner";
import OtherInfo from "../../component/Otherinfo/OtherInfo";
import ProductHomePage from "../../component/Product/producthomepage";
import ProductDetail from "../../component/Productdetail/productdetail";
import TopTrendingProduct from "../../component/TopTrendingProduct/toptrendingproduct";
import Category from "../../component/category/Category";




export default function ProductDetailPage() {
    return (
        <>
            <div className="container d-flex flex-column gap-5">
                <ProductDetail/>
            </div>

        </>
    );
}