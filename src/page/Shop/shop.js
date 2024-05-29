import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filtersuppliers from "../../component/Filtersuppliers/filtersuppliers";
import TopTrendingProduct from "../../component/TopTrendingProduct/toptrendingproduct";
import styles from './shop.module.css'
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import BannerOfPage from "../../component/BannerOfPage/BannerOfPage";
import { useState } from "react";
import { useSelector } from "react-redux";
import CardProductDetail from "../../component/CardProductdetail/cardproductdetail";

export default function Shop() {
    const listproductdetail = useSelector(state => state.productdetail.productdetail);
    console.log('test', listproductdetail);

    const [trangDau, setTrangDau] = useState(20);
    const [trangCuoi, setTrangCuoi] = useState(1);
    const dauTrang = trangCuoi * trangDau;
    const cuoiTrang = dauTrang - trangDau;
    const hientaiTrang = listproductdetail.data.slice(cuoiTrang, dauTrang);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listproductdetail.data.length / trangDau); i++) {
        pageNumbers.push(i);
    }
    console.log(hientaiTrang);
    return (
        <>
            <div className="container d-flex flex-column gap-5">
                <BannerOfPage
                    bigTitle="Shop"
                    subtitle="shop"
                />
                <div className="d-flex justify-content-between">
                    <Filtersuppliers />
                </div>
                <div className="container">
                    <div className="d-flex">
                        <div className={`${styles['navbar-product']}  me-2`}>
                            <h3 className="text-uppercase font-italic mb-4">categories</h3>
                            <h5 className={`${styles['brand-title']} text-uppercase bg-dark px-3 py-2 font-weight-400 font-italic`}>apple</h5>
                            <div className="px-3 py-3 font-family-Ubuntu">
                                <div
                                    className={`font-family-Ubuntu font-italic text-decoration-none ${styles['product-title-name']}`}
                                // onClick={() => {
                                //     setCategoryId('')
                                // }}
                                >All</div>
                            </div>
                            {/* {isLoadingCategories ? <LoadingSpinner /> : renderProductTitleName(categories)} */}
                        </div>
                        <div className={`${styles['product-filter']}`}>
                            <div className={`${styles['filter']} d-flex justify-content-between`}>
                                <input placeholder="Enter Search Here!"
                                    className={`${styles['search-input']} px-3 py-2`}
                                // value={name}
                                // onChange={(e) => {
                                //     setName(e.target.value)
                                // }}
                                />
                                {/* <select className="pe-4 h-fit-content" onChange={(e) => {
                                console.log(e.target.value)
                            }}>
                                <option>Default sorting</option>
                                <option>Des sorting</option>
                                <option>dssa sorting</option>
                            </select> */}
                                <div className="bo-loc-gia">
                                    <div className="dropdown">
                                        <button className="btn btn-outline-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" >Name of manufacturer</button>
                                        <ul className="dropdown-menu">
                                            {/* {listNCC} */}
                                        </ul>
                                        <button className="btn btn-outline-secondary dropdown-toggle custom-margin" type="button" data-bs-toggle="dropdown" >Filter by price</button>
                                        <ul className="dropdown-menu">
                                            <div className="d-flex  justify-content-between">
                                                <li><button className="btn btn-outline-success">dưới 12,000,000</button></li>
                                                <li style={{ width: "max-content" }}><button className="btn btn-outline-success" >12000000 đến 15,000,000</button></li>
                                                <li><button className="btn btn-outline-success mb-4" >trên 15,000,000</button></li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className={`${styles['product-list']}  mt-3 mb-5`}>
                                    {hientaiTrang.map((item, index) => (
                                        <CardProductDetail key={index} data={item} />
                                    ))}
                                </div>
                            </div>
                            <div className="w-100 d-flex flex-column align-items-end">
                                <div className="d-flex">
                                    <button onClick={() => setTrangCuoi(trangCuoi - 1)} disabled={trangCuoi === 1} className={`p-3 ${styles['pre-btn']}`}>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                                    </button>
                                    <span className={`bg-dark p-3 ${styles['number-page']}`}></span>
                                    <button onClick={() => setTrangCuoi(trangCuoi + 1)} disabled={trangCuoi === Math.ceil(listproductdetail.data.length / trangDau)} className={`p-3 ${styles['next-btn']}`} >
                                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                                    </button>

                                </div>
                                <div>
                                    Page
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <TopTrendingProduct />
            </div>

        </>
    );
}