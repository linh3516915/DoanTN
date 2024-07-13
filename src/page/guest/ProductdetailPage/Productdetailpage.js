import { useLocation, useParams } from "react-router-dom";
import ProductDetail from "../../../component/Productdetail/productdetail";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";
import ImageProductDetail from "../../../component/Productdetail/Imageproductdetail/imageproductdetail";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import InfoProductDetail from "../../../component/Productdetail/Infoproductdetail/infoproductdetail";
import InfoTechnical from "../../../component/Productdetail/Technicalinformation/infotechnical";
import { useDispatch, useSelector } from "react-redux";
import { getcolor, getdungluong, getimgproduct, getimgproductdetail, getinfoproductdetail, getlistvote, getproductdetail } from "../../../redux/slice/itemproductdetail";
import { addRecently } from "../../../redux/slice/recentlyviewedSlice";
import Commentandvote from "../../../component/Productdetail/Commentandvote/commentandvote";
import Relatedproducts from "../../../component/Productdetail/Relatedproducts/relatedproducts";
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";
import styles from "./productdetailpage.module.css";
import { apiUrl } from "../../../api/api";

export default function ProductDetailPage() {
    const productdetailpageSectionRef = useRef(null);
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        if (productdetailpageSectionRef.current) {
            productdetailpageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nameproduct = searchParams.get('name');

    console.log('check ame', nameproduct);
    useEffect(() => {
        // Fetch product detail if it's not available
        //if (productdetail == null) {
        const getAPI = async () => {
            console.log('check amssssse', nameproduct);
            if (nameproduct != '') {
                setIsloading(true);
                try {
                    const response = await axios.post(`${apiUrl}/productdetail/productdetail`, {
                        ten: nameproduct // Assuming props.id is used to fetch product detail
                    });
                    console.log('API Response:', response.data);
                    dispatch(getimgproductdetail(response.data.img));
                    dispatch(getimgproduct(response.data.imgsp));
                    dispatch(getproductdetail(response.data));
                    dispatch(getcolor(response.data.mau_sac));
                    dispatch(getdungluong(response.data.dung_luong));
                    dispatch(getlistvote(response.data));
                    dispatch(getinfoproductdetail(response.data.data_noi_dung));
                    dispatch(addRecently(response.data));
                    
                } catch (error) {
                    console.error('Error fetching product detail:', error);
                    // Handle error as needed
                }
                setIsloading(false);
            }

        };
        getAPI();

        // }

    }, [dispatch, nameproduct]);
    return (
        <>
            <Header />
            {(isloading) && (
                <div style={{ margin: '0 auto' }}>
                    <LoadingSpinnerModal />
                </div>
            )}
            <div ref={productdetailpageSectionRef} className="container d-flex flex-column gap-4" style={{ marginBottom: '30px' }}>
                <div style={{ display: "flex", justifyContent: 'center',marginTop:'3%' }}>
                    <ImageProductDetail />
                    <ProductDetail />
                </div>
                <div className={`${styles['content-2']}`} style={{  }}>
                    <InfoProductDetail />
                    <Relatedproducts />
                    {/* <InfoTechnical /> */}
                </div>
                <div style={{ display: "flex", justifyContent: 'center' }}>
                    <Commentandvote />
                </div>

            </div>
            <Footer />
        </>
    );
}