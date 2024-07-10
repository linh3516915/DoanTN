import { faBackspace, faBackward, faLeftLong, faTrash,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgsale from "../../../assets/images/banner1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Chitietdonhang from "../chitietdonhang/chitietdonhang";
import { setbtnctdh, setxacnhandon } from "../../../redux/slice/ordermanagement";
import Chitietdonhangadmin from "../chitietdonhang/chitietdonhang";
import { loadingmodal } from "../../../redux/slice/filterSlice";
import axios from "axios";
export default function Danggiaoadmin() {
    const donhang = useSelector(state => state.ordermanagement.donhang);
    let listdonhang = [];
    const btnctdh = useSelector(state => state.ordermanagement.btnctdh);
    const dispatch = useDispatch();
    const chitietdonhang = useSelector(state => state.ordermanagement.chitietdonhang);
    const [ctdh, setCtdh] = useState(0);
    const xacnhangiao=(id)=>{
        const getAPI = async () => {
            console.log(id);
            dispatch(loadingmodal(true));
            const response = await axios.get(`http://127.0.0.1:8000/api/donhang/xacnhangiao/${id}`);
            if (response.data.success) {
                dispatch(setxacnhandon(id));
                alert('done')
            }
            dispatch(loadingmodal(false));
        }
        getAPI();
    }
    if (donhang != null) {
        listdonhang = donhang.map((item) => {
            if (item.trang_thai == 2) {
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
                                    
                                    <div style={{width:'25%'}} class="col-md-2 text-center d-flex justify-content-center align-items-center">
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
                                    <div style={{width:'25%'}} class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <button onClick={() => { dispatch(setbtnctdh(!btnctdh)); setCtdh(item.id); }} className="btn btn-success" style={{ marginRight: '2%' }}>xem chi tiết</button>
                                        <button onClick={()=>{xacnhangiao(item.id)}} className="btn btn-primary"><FontAwesomeIcon icon={faCheck} /></button>
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
            <div style={{ height: '84%', overflow: 'scroll', padding: '1rem' }}>
                {!btnctdh && listdonhang!= [] && (
                    listdonhang
                )}
                {!btnctdh &&listdonhang== [] && (
                    <p>không có đơn hàng nào đang giao</p>
                )}
                {btnctdh && (

                    <Chitietdonhangadmin id={ctdh} />
                )}
                {listdonhang == [] &&(
                    <>
                        không có đơn hàng nào đang giao
                    </>
                )}
            </div>
        </>
    )
}