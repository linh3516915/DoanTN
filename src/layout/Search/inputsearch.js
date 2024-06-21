
import styles from "./inputsearh.module.css"
import { useDispatch, useSelector } from "react-redux";
import OTP from "../../component/OTP/otp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Search from "../../component/SearchProduct/search";
import { filterpriceProductdetail, loadingmodal, searchProductdetail, searchProductdetailInHeader, settrang } from "../../redux/slice/filterSlice";
import { listProductdetail } from "../../redux/slice/productdetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import img from "../../assets/ảnh/14ve.jpg";
export default function InputSearch() {
    const popupsignup = useSelector(state => state.popup.btnPopupOTP);
    const [search, setSearch] = useState('');
    const [popupsearch, setPopupSearch] = useState(true);
    const listproductdetail = useSelector(state => state.productdetail.productdetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchs = useSelector(state => state.filter.filterproduct);
    const searchinheader = useSelector(state => state.filter.filterproductinheader);
    //const searchs = useSelector(state => state.productdetail.productdetails);
    const result = useSelector(state => state.filter.result);
    console.log(search)
    let popupfiltersearch = [];
    useEffect(() => {
            const getAPI = async () => {
                if (search !== '') {
                    const response = await axios.post(`http://127.0.0.1:8000/api/productdetail/search`, {
                        ten: search
                    })
                    console.log(response.data);
                    dispatch(searchProductdetailInHeader(response.data));
                    //dispatch(listProductdetail(response));
                    dispatch(settrang(1));
                    setPopupSearch(true);
                    // if (response.data.result === 0) {
                    //     dispatch(searchProductdetailInHeader(response.data));
                    //     const getAPI = async () => {

                    //         try {

                    //             const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                    //             );
                    //             dispatch(listProductdetail(data));

                    //         } catch (error) {
                    //             console.error('Error fetching API:', error);
                    //         }
                    //     }
                    //     getAPI();
                    // }
                }
                else {
                    dispatch(searchProductdetailInHeader(null));
                    setPopupSearch(false);
                }
            }
            getAPI();


    }, [search])
    if (searchinheader !== null) {
        popupfiltersearch = searchinheader.map((item, index) => {
            if (index > 0 && index <= 3) {
                return (
                    <>
                        <div className={`${styles['item']}`} onClick={() => { navigate(`/productdetail/${item.id}`) }} style={{ border: 'solid 1px #ccc', padding: '0.5rem', marginBottom: '3%', cursor: 'pointer' }}>
                            <img src={img} alt="" class="product-thumb" height='60px' />
                            <p style={{ height: "10%", textDecoration: 'none' }}><p style={{ color: 'black' }}>{item.ten}</p></p>
                            <div class="product-wid-rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div class="product-wid-price">
                                <ins style={{ color: 'black' }}>$400.00</ins> <del>$425.00</del>
                            </div>
                        </div>
                    </>
                )
            }

        })
    }
    // else {
    //     return null;
    // }

    const timkiem = (e) => {
        e.preventDefault(); // Ngăn chặn reload trang khi submit form
        setTimeout(() => {
            
            if (search.trim()) { // Kiểm tra xem có từ khóa tìm kiếm không trống
                
                navigate(`/shop?q=${encodeURIComponent(search)}`);
                dispatch(loadingmodal(false));
                 // Điều hướng đến trang shop với tham số q
                setSearch(''); // Xóa nội dung trong ô tìm kiếm sau khi submit
                
            }
        }, 1500);
        dispatch(loadingmodal(true));
    }
    return (
        <>
            <div className={`${styles['search-input']} px-3 py-2`}>
                <form style={{ margin: '0' }} onSubmit={timkiem}>
                    <div style={{ display: 'flex' }}>
                        <button type="submit" onClick={() => { }} className="btn btn-secondary" style={{ borderRadius: '22px', marginRight: '3%' }}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input name="query" style={{ width: '100%', margin: '0', border: 'solid 1px' }} placeholder="Enter Search Here!"
                            className={` px-3 py-2`} onChange={(e) => {
                                setSearch(e.target.value);
                             }}
                            
                        />
                    </div>
                </form>
                <div style={{ width: '100%', position: 'relative' }}>
                    {popupsearch && (

                        <div style={{ width: '100%', backgroundColor: 'white', position: 'absolute' }}>
                            {popupfiltersearch}
                        </div>

                    )}
                </div>
            </div>
        </>
    );
}

