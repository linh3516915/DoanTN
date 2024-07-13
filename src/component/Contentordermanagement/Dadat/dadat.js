import { faBackspace, faBackward, faLeftLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgsale from "../../../assets/images/banner1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Chitietdonhang from "../chitietdonhang/chitietdonhang";
import { setbtnctdh, sethuydon } from "../../../redux/slice/ordermanagement";
import { loadingmodal } from "../../../redux/slice/filterSlice";
import styles from './dadat.module.css'
import axios from "axios";
import { setsuccess } from "../../../redux/slice/popupSlice";
import { apiUrl } from "../../../api/api";
export default function Dadat() {
    const donhang = useSelector(state => state.ordermanagement.donhang);
    let listdonhang = [];
    const btnctdh = useSelector(state => state.ordermanagement.btnctdh);
    const dispatch = useDispatch();
    const chitietdonhang = useSelector(state => state.ordermanagement.chitietdonhang);
    const [ctdh, setCtdh] = useState(0);
    const [dh, setdh] = useState([]);
    const huydon = (id) => {
        const getAPI = async () => {
            console.log(id);
            dispatch(loadingmodal(true));
            const response = await axios.get(`${apiUrl}/donhang/chohuy/${id}`);
            if (response.data.success) {
                dispatch(sethuydon(id));
                dispatch(setsuccess(true));
            }
            dispatch(loadingmodal(false));
        }
        getAPI();
    }
    if (donhang != null) {
        listdonhang = donhang.map((item) => {
            if (item.trang_thai == 1) {
                return (
                    <>
                        <div class="card shadow-0 border mb-4">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-2">
                                        {/* <img src={imgsale} class="img-fluid" alt="Phone"/> */}
                                        <h5 style={{ marginBottom: '0px' }}>Đơn hàng ngày</h5>
                                        <p>{item.ngay_dat}</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0"></p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small"></p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">Tổng Tiền: {item.gia_khuyen_mai.toLocaleString()} VNĐ</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        {item.payment_methods == 0 && (
                                            <p style={{ color: 'red' }} class="mb-0 small">chưa thanh toán</p>
                                        )}
                                        {item.payment_methods == 1 && (
                                            <p style={{ color: 'green' }} class="mb-0 small ">đã thanh toán</p>
                                        )}

                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <button onClick={() => { dispatch(setbtnctdh(!btnctdh));setdh({
                                            'email' :item.email,
                                            'so_dien_thoai' : item.so_dien_thoai,
                                            'ho_ten' : item.ho_ten,
                                            'adress': item.dia_chi,
                                            'thoi_gian_giao' : item.thoi_gian_giao,
                                            'ngay_dat' : item.ngay_dat,
                                            'payment_methods' : item.payment_methods,
                                            'giam_gia' : item.giam_gia,
                                            'gia_khuyen_mai' :  item.gia_khuyen_mai,
                                            'tong_tien': item.tong_tien,
                                            'trang_thai' : item.trang_thai
                                        }) ; setCtdh(item.id); }} className="btn btn-success" style={{ marginRight: '2%' }}>chi tiết</button>
                                        <button onClick={()=>{huydon(item.id)}} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        })
    }
    return (
        <>
            <div className={`${styles['content']}`} style={{ overflow: 'scroll', padding: '1rem' }}>
                {!btnctdh && (
                    listdonhang
                )}
                {btnctdh && (

                    <Chitietdonhang id={ctdh} donhang={dh} />
                )}
            </div>
        </>
    )
}