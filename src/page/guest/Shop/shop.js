import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filtersuppliers from "../../../component/Filtersuppliers/filtersuppliers";
import TopTrendingProduct from "../../../component/TopTrendingProduct/toptrendingproduct";
import styles from './shop.module.css'
import { faAngleDoubleLeft, faAngleDoubleRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BannerOfPage from "../../../component/BannerOfPage/BannerOfPage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProductDetail from "../../../component/CardProductdetail/cardproductdetail";
import Header from "../../../layout/Header/header";
import Footer from "../../../layout/Footer/Footer";
import OtherInfo from "../../../component/Otherinfo/OtherInfo";
import axios from "axios";
import { checkedall, checkednew, checkedtopseller, filterpriceProductdetail, searchProductdetail, settrang } from "../../../redux/slice/filterSlice";
import Search from "../../../component/SearchProduct/search";
import { Redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
import { listProductdetail } from "../../../redux/slice/productdetail";
import LoadingSpinner from "../../../component/loading/loadingspinner";
import FilterPrice from "../../../component/Filterprice/filterprice";
import InputSearch from "../../../layout/Search/inputsearch";
import LoadingSpinnerModal from "../../../component/LoadingSpinnerModal/LoadingSpinnerModal";

export default function Shop() {
    const listproductdetail = useSelector(state => state.productdetail.productdetails);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    const giatu = searchParams.get('giatu');
    const giaden = searchParams.get('giaden');
    const [isloading, setIsloading] = useState(false);
    //const [trangDau, setTrangDau] = useState(16);
    const checkedAll = useSelector(state => state.filter.checkedAll);
    const checkedNew = useSelector(state => state.filter.checkedNew);
    const checkedTopseller = useSelector(state => state.filter.checkedTopseller);
    const trangDau = useSelector(state => state.filter.trangdau);
    //const [trangCuoi, setTrangCuoi] = useState(1);
    const trangCuoi = useSelector(state => state.filter.trangcuoi)
    const [search, setSearch] = useState('');
    const [btnshowlist, setBtnshowlist] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [query, setQuery] = useState('');
    const [popupsearch, setPopupSearch] = useState(true);
    //const history = useHistory(
    const navigate = useNavigate();
    const loadingcomponent = useSelector(state => state.filter.loadingcomponent)
    const result = useSelector(state => state.filter.result);
    const searchs = useSelector(state => state.filter.search);
    const top16hottrending = useSelector(state => state.hottrending.top16hottrend);
    const dispatch = useDispatch();

    const dauTrang = trangCuoi * trangDau;
    const cuoiTrang = dauTrang - trangDau;
    console.log(listproductdetail);
    let hientaiTrang = null;
    let showlistproduct = null;
    let pageNumbers = [];
    if (listproductdetail !== null) {
        // Tạo mảng hientaiTrang từ listproductdetail
        hientaiTrang = listproductdetail.slice(cuoiTrang, dauTrang);

        // Khởi tạo mảng pageNumbers với số trang
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(listproductdetail.length / trangDau); i++) {
            pageNumbers.push(i);
        }

        // Sử dụng map để tạo danh sách sản phẩm để hiển thị
        showlistproduct = hientaiTrang.map((item, index) => {
            // Kiểm tra xem item có trong danh sách top16hottrending không
            const isHotTrending = top16hottrending.some(element => element.id === item.id);

            // Render CardProductDetail dựa trên kết quả kiểm tra isHotTrending
            return (
                <CardProductDetail
                    ishottrending={isHotTrending}
                    key={index}
                    animation={btnshowlist}
                    data={item}
                />
            );
        });
    }
    useEffect(() => {
        if (giatu != null && giaden != null) {
            dispatch(listProductdetail(null));
            setIsloading(true);
            const getAPI = async () => {
                const response = await axios.post('http://127.0.0.1:8000/api/productdetail/filterprice', {
                    giatu: giatu,
                    giaden: giaden
                })
                if (shoppageSectionRef.current) {
                    shoppageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
                console.log(response.data)
                if (giatu < 1000000) {
                    //setGiatu(1000000);
                    dispatch(filterpriceProductdetail(0));
                    alert('giá từ không được nhỏ hơn 1000000');
                    dispatch(checkedall(true));
                }
                else if (giatu >= giaden) {
                    dispatch(filterpriceProductdetail(0));
                    alert('giá bắt đầu không được lớn hơn giá kết thúc');
                    dispatch(checkedall(true));
                }
                else if (giaden < giatu) {
                    //setGiaden(50000000);
                    dispatch(filterpriceProductdetail(0));

                    alert('giá kết thúc không được nhỏ hơn giá bắt đầu');
                    dispatch(checkedall(true));
                }
                else if (giaden > 50000000) {
                    dispatch(filterpriceProductdetail(0));
                    //setGiaden(50000000);
                    if (shoppageSectionRef.current) {
                        shoppageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                    alert('giá đến không được lớn hơn 50000000');
                    dispatch(checkedall(true));
                }

                else {
                    if (response.data.success === true) {
                        setIsloading(false);
                        dispatch(settrang(1));
                        dispatch(filterpriceProductdetail(response.data.result));
                        dispatch(listProductdetail(response));
                        dispatch(checkedall(false));
                        dispatch(checkedtopseller(false));
                        dispatch(checkednew(false));
                    }
                    else {
                        alert('giá bắt đầu không được lớn hơn giá kết thúc');
                    }
                }
            }
            getAPI();
        }

    }, [giatu, giaden])
    // useEffect(() => {
    //     const getAPI = async () => {
    //         try {
    //             if (giatu == null && giaden == null ) {
    //                 if (listproductdetail === null) {
    //                     setIsloading(true);
    //                     const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
    //                     );
    //                     dispatch(listProductdetail(data));
    //                     dispatch(settrang(1));
    //                     setIsloading(false);
    //                 }
    //             }
    //             else{
    //                 const getAPI = async () => {
    //                     const response = await axios.post('http://127.0.0.1:8000/api/productdetail/filterprice', {
    //                         giatu: giatu,
    //                         giaden: giaden
    //                     })

    //                     console.log(response.data)
    //                     if (giatu < 1000000) {
    //                         //setGiatu(1000000);
    //                         alert('giá từ không được nhỏ hơn 1000000');
    //                     }
    //                     else if (giatu >= giaden) {
    //                         alert('giá bắt đầu không được lớn hơn giá kết thúc');
    //                     }
    //                     else if (giaden < giatu) {
    //                         //setGiaden(50000000);
    //                         alert('giá kết thúc không được nhỏ hơn giá bắt đầu');
    //                     }
    //                     else if (giaden > 50000000) {
    //                         //setGiaden(50000000);
    //                         alert('giá đến không được lớn hơn 50000000');
    //                     }

    //                     else {
    //                         if (response.data.success === true) {
    //                             dispatch(settrang(1));
    //                             dispatch(filterpriceProductdetail(response.data.result));
    //                             dispatch(listProductdetail(response));
    //                         }
    //                         else {
    //                             alert('giá bắt đầu không được lớn hơn giá kết thúc');
    //                         }
    //                     }
    //                 }
    //                 getAPI();
    //             }
    //         } catch (error) {
    //             console.error('Error fetching API:', error);
    //         }
    //     }
    //     getAPI();
    // }, [dispatch])
    useEffect(() => {

        if (q === null) {
            console.log('check tópel: ', checkedTopseller);
            if (checkedTopseller !== true) {
                dispatch(listProductdetail(null));
                setIsloading(true);
                // if (giatu == null && giaden == null) {
                //     setIsloading(true);
                // }
                const getAPI = async () => {
                    try {


                        const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                        );

                        dispatch(listProductdetail(data));
                        dispatch(filterpriceProductdetail(0));
                        dispatch(settrang(1));
                        setIsloading(false);
                    } catch (error) {
                        console.error('Error fetching API:', error);
                    }
                }
                getAPI();
            }
        }
        else {
            const getAPI = async () => {
                setIsloading(true);
                const response = await axios.post('http://127.0.0.1:8000/api/productdetail/search', {
                    ten: q
                });
                setIsloading(false);
                dispatch(filterpriceProductdetail(response.data.result));
                dispatch(listProductdetail(response));
            }
            getAPI();
        }
    }, [q])

    console.log(listproductdetail);
    const shoppageSectionRef = useRef(null);

    useEffect(() => {
        if (shoppageSectionRef.current) {
            shoppageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    const timkiem = (search, result) => {
        dispatch(listProductdetail(null));
        setIsloading(true);
        if (search === '') {
            const getAPI = async () => {
                try {
                    if (giatu == null && giaden == null) {
                        const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                        );
                        dispatch(listProductdetail(data));
                        setIsloading(false);
                    }
                } catch (error) {
                    console.error('Error fetching API:', error);
                }
            }
            getAPI();
        }
        else {
            const getAPI = async () => {
                setIsloading(true);
                const response = await axios.post(`http://127.0.0.1:8000/api/productdetail/search`, {
                    ten: search
                })
                dispatch(settrang(1));
                console.log(response.data);
                //dispatch(searchProductdetail(response.data));
                if (result !== 0) {
                    dispatch(searchProductdetail(response.data));
                    dispatch(listProductdetail(response));
                    setIsloading(false);
                }
                else {
                    const getAPI = async () => {

                        try {
                            if (giatu == null && giaden == 0) {
                                const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
                                );

                                dispatch(listProductdetail(data));
                                setIsloading(false);
                            }
                            else {
                                const getAPI = async () => {
                                    const response = await axios.post('http://127.0.0.1:8000/api/productdetail/filterprice', {
                                        giatu: giatu,
                                        giaden: giaden
                                    })
                                    console.log(response.data)
                                    if (giatu < 1000000) {
                                        //setGiatu(1000000);
                                        alert('giá từ không được nhỏ hơn 1000000');
                                    }
                                    else if (giatu >= giaden) {
                                        alert('giá bắt đầu không được lớn hơn giá kết thúc');
                                    }
                                    else if (giaden < giatu) {
                                        //setGiaden(50000000);
                                        alert('giá kết thúc không được nhỏ hơn giá bắt đầu');
                                    }
                                    else if (giaden > 50000000) {
                                        //setGiaden(50000000);
                                        alert('giá đến không được lớn hơn 50000000');
                                    }

                                    else {
                                        if (response.data.success === true) {
                                            dispatch(settrang(1));
                                            dispatch(filterpriceProductdetail(response.data.result));
                                            dispatch(listProductdetail(response));
                                        }
                                        else {
                                            alert('giá bắt đầu không được lớn hơn giá kết thúc');
                                        }
                                    }
                                }
                                getAPI();
                            }

                        } catch (error) {
                            console.error('Error fetching API:', error);
                        }
                    }
                    getAPI();
                }
            }
            getAPI();
            setPopupSearch(false);
        }
    }
    console.log(listproductdetail);
    return (
        <>
            <Header ishowsearch={true} />
            {(isloading) && (
                <div style={{ margin: '0 auto' }}>
                    <LoadingSpinnerModal />
                </div>
            )}
            <BannerOfPage
                bigTitle="Shop"
                subtitle="shop"
            />
            <div >
                <div ref={shoppageSectionRef} style={{ position: 'relative' }} className="container d-flex flex-column gap-5">
                    <div className="d-flex justify-content-between" >
                        <Filtersuppliers />

                    </div>
                    {/* <div className={`${styles['search-input']} px-3 py-2`}>
                    <form style={{ margin: '0' }} onSubmit={(e) => { e.preventDefault() }}>
                        <div style={{ display: 'flex' }}>
                            <button onClick={() => { timkiem(search, result); }} className="btn btn-secondary" style={{ borderRadius: '22px', marginRight: '3%' }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            <input name="query" style={{ width: '100%', margin: '0', border: 'solid 1px' }} placeholder="Enter Search Here!"
                                className={` px-3 py-2`} onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </div>
                    </form>

                    {popupsearch && (
                        <div style={{ width: '100%', position: 'relative' }}>
                            <Search />
                        </div>
                    )}
                </div> */}
                    <div className={`${styles['search']}`} >
                        <InputSearch resetsearch={checkedTopseller} />
                    </div>

                    <div>
                        <div className="d-flex">
                            <div className={`${styles['product-filter']}`}>
                                <div className={`${styles['filter']} d-flex justify-content-around`}>
                                    <div style={{ lineHeight: '38px' }}>kết quả tìm kiếm : {result}</div>
                                    <div style={{ width: '20%', lineHeight: '38px' }}>
                                        <label style={{ marginRight: '2%' }}>All</label>
                                        <input onChange={() => { dispatch(checkedall(!checkedAll)); navigate('/shop'); window.location.reload(); }} name="filter" checked={checkedAll} style={{ marginRight: '8%' }} type="radio" />
                                        <label style={{ marginRight: '2%' }}>top seller</label>
                                        <input onChange={() => {
                                            //window.location.reload();
                                            const getAPI = async () => {
                                                const response = await axios.get('http://127.0.0.1:8000/api/productdetail/topseller');
                                                dispatch(settrang(1));
                                                dispatch(listProductdetail(response));
                                                dispatch(filterpriceProductdetail(response.data.result));
                                            }
                                            getAPI();

                                            dispatch(checkedtopseller(!checkedTopseller));
                                            navigate(`/shop?ext=${encodeURIComponent('topseller')}`)


                                        }} checked={checkedTopseller} name="filter" style={{ marginRight: '8%' }} type="radio" />
                                        <label style={{ marginRight: '2%' }}>new</label>
                                        <input onChange={() => {
                                            dispatch(checkednew(!checkedNew));
                                            const getAPI = async () => {
                                                const response = await axios.get('http://127.0.0.1:8000/api/productdetail/latesproduct');
                                                dispatch(settrang(1));
                                                dispatch(listProductdetail(response));
                                                dispatch(filterpriceProductdetail(response.data.result));
                                            }
                                            getAPI()
                                        }} name="filter" checked={checkedNew} type="radio" />
                                    </div>

                                    <FilterPrice />
                                </div>
                                <div>
                                    <div className={`${styles['product-list']}  mt-3 mb-5`}>
                                        {/* {(isloading) && (
                                            <div style={{ margin: '0 auto' }}>
                                                <LoadingSpinnerModal />
                                            </div>
                                        )} */}
                                        {(loadingcomponent) && (
                                            <div style={{ margin: '0 auto' }}>
                                                <LoadingSpinner />
                                            </div>
                                        )}
                                        {showlistproduct}
                                        {showlistproduct == [] && (
                                            <>
                                                <p>không có sản phẩm</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-100 d-flex flex-column align-items-end">
                                    <div className="d-flex">
                                        <button onClick={() => {
                                            if (shoppageSectionRef.current) {
                                                shoppageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                                            }
                                            dispatch(settrang(trangCuoi - 1)); setBtnshowlist(false);

                                        }} disabled={trangCuoi === 1} className={`p-3 ${styles['pre-btn']}`}>
                                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                        </button>
                                        {/* {pageNumbers.map((item) => {
                                        return (
                                            <span className={`bg-dark p-3 ${styles['number-page']}`}> {item} </span>
                                        )
                                    })} */}

                                        {(listproductdetail !== null) && (
                                            <button disabled={trangCuoi === Math.ceil(listproductdetail.length / trangDau)} onClick={() => {
                                                if (shoppageSectionRef.current) {
                                                    shoppageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                                                }
                                                dispatch(settrang(trangCuoi + 1)); setBtnshowlist(true);

                                            }} className={`p-3 ${styles['next-btn']}`} >
                                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        Page
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OtherInfo />
            <Footer />
        </>
    );
}