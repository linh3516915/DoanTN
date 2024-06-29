
import styles from "./inputsearh.module.css"
import { useDispatch, useSelector } from "react-redux";
import OTP from "../../component/OTP/otp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Search from "../../component/SearchProduct/search";
import { checkedall, checkednew, checkedtopseller, filterpriceProductdetail, loadingmodal, searchProductdetail, searchProductdetailInHeader, settrang } from "../../redux/slice/filterSlice";
import { listProductdetail } from "../../redux/slice/productdetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import img from "../../assets/ảnh/14ve.jpg";
import Star from "../../component/Star/star";
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
                dispatch(filterpriceProductdetail(response.data.result));
                dispatch(settrang(1));
                setPopupSearch(true);
                dispatch(checkedall(false));
                dispatch(checkedtopseller(false));
            }
            else {
                dispatch(searchProductdetailInHeader(null));
                dispatch(checkedall(true));
                //dispatch(checkedtopseller(true));
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
                            <Star so_sao={item.so_sao}/>
                            <div class="product-wid-price">
                                <ins style={{ color: '#1abc9c' }}>{item.gia.toLocaleString('en-us')} VNĐ</ins> 
                                {/* <del>$425.00</del> */}
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
                const getAPI = async () => {
                    //setIsloading(true);
                    const response = await axios.post('http://127.0.0.1:8000/api/productdetail/search', {
                        ten: search
                    });
                   // setIsloading(false);
                    dispatch(filterpriceProductdetail(response.data.result));
                    dispatch(listProductdetail(response));
                    dispatch(checkedall(false));
                    dispatch(checkedtopseller(false));
                    dispatch(checkednew(false));
                }
                getAPI();
                navigate(`/shop?q=${encodeURIComponent(search)}`);
                dispatch(loadingmodal(false));
                // Điều hướng đến trang shop với tham số q
                setSearch(''); // Xóa nội dung trong ô tìm kiếm sau khi submit

            }
            else {
                const getAPI = async () => {
                    try {

                        const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                        );

                        dispatch(listProductdetail(data));
                        navigate(`/shop`);
                        dispatch(filterpriceProductdetail(0));
                        dispatch(checkedall(true));
                        // dispatch(checkedtopseller(false));
                        // dispatch(checkednew(false));
                        dispatch(loadingmodal(false));
                    } catch (error) {
                        console.error('Error fetching API:', error);
                    }
                }
                getAPI();

            }
        }, 3000);
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
                                setTimeout(() => {
                                    setSearch(e.target.value);
                                }, 1000);
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

