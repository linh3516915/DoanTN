
import { faBackspace, faBackward, faLeftLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgsale from "../../../assets/images/banner1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Chitietdonhang from "../chitietdonhang/chitietdonhang";
import { setbtnctdh } from "../../../redux/slice/ordermanagement";
export default function Chohuy() {
    const donhang = useSelector(state => state.ordermanagement.donhang);
    let listdonhang = [];
    const btnctdh = useSelector(state => state.ordermanagement.btnctdh);
    const dispatch = useDispatch();
    const chitietdonhang = useSelector(state => state.ordermanagement.chitietdonhang);
    const [ctdh, setCtdh] = useState(0);
    const [dh, setdh] = useState([]);
    if (donhang != null) {
        listdonhang = donhang.map((item) => {
            if (item.trang_thai == 4) {
                return (
                    <>
                        <div style={{opacity:'0.75'}} class="card shadow-0 border mb-4">
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
                                        }) ; setCtdh(item.id); }} className="btn btn-success" style={{ marginRight: '2%' }}>xem chi tiết</button>
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
            <div style={{ height: '71%', overflow: 'scroll', padding: '1rem' }}>
                {!btnctdh && listdonhang != [] && (
                    listdonhang
                )}
                {!btnctdh && listdonhang == [] && (
                    <p>không có đơn hàng nào đang giao</p>
                )}
                {btnctdh && (

                    <Chitietdonhang id={ctdh} donhang={dh}/>
                )}
                {listdonhang == [] && (
                    <>
                        không có đơn hàng nào đang giao
                    </>
                )}
            </div>
        </>
    )
}