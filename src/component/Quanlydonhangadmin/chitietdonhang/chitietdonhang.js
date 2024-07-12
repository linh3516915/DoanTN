import { faCalendarCheck, faCalendarDays, faEnvelope, faLeftLong, faLocationDot, faMoneyBillWave, faPhone, faTruckFast, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setbtnctdh } from "../../../redux/slice/ordermanagement";
import { useDispatch, useSelector } from "react-redux";
import styles from './chitietdonhang.module.css'

export default function Chitietdonhangadmin(props) {
    const btnctdh = useSelector(state => state.ordermanagement.btnctdh);
    const dispatch = useDispatch();
    const chitietdonhang = useSelector(state => state.ordermanagement.chitietdonhang);
    let listctdh = []
    if (chitietdonhang != null) {
        listctdh = chitietdonhang.map((item) => {
            if (item.datactdh.don_hang_id == props.id) {
                return (
                    <>
                        <div style={{boxShadow:'5px 5px 5px #ccc'}} class="card shadow-0 border mb-4">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-2">
                                        <img width='60' height='60' src={item.img} class="img-fluid" alt="Phone" />
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0">{item.data.ten}</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small"></p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small"></p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">số lượng: {item.datactdh.so_luong_mua}</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">{item.data.gia_khuyen_mai.toLocaleString()} VNĐ</p>
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
             <button onClick={() => { dispatch(setbtnctdh(!btnctdh)) }} className="btn btn-danger" style={{ marginBottom: '2%' }}>
                <FontAwesomeIcon icon={faLeftLong} />
            </button>
            <div className={`${styles['main-content']}`}>
                <div className={`${styles['info-guestandctdh']}`}>
                    <div className={`${styles['info-guest']}`}>
                        <h5 style={{ textAlign: 'center' }}><FontAwesomeIcon icon={faUser} /> Thông tin khách hàng</h5>
                        <div className={`${styles['main-info-guest']}`}>
                            <p>tên: {props.donhang.ho_ten}</p>
                            <p><FontAwesomeIcon icon={faEnvelope} /> email :{props.donhang.email} </p>
                            <p><FontAwesomeIcon icon={faPhone} /> số điện thoại : {props.donhang.so_dien_thoai}</p>
                        </div>

                    </div>
                    {listctdh}
                </div>
                <div  className={`${styles['info-bill-giaohang']}`}>
                    <div className={`${styles['info-bill']}`}>
                        <h5 style={{ textAlign: 'center' }}><FontAwesomeIcon icon={faTruckFast} /> Thông tin giao hàng</h5>
                        <div className={`${styles['main-info-guest']}`}>
                            <p> <FontAwesomeIcon icon={faCalendarCheck} /> Ngày đặt: {props.donhang.ngay_dat}</p>
                            <p><FontAwesomeIcon icon={faCalendarDays} /> Ngày giao :{props.donhang.thoi_gian_giao} </p>
                            <p><FontAwesomeIcon icon={faLocationDot} /> Địa chỉ giao : {props.donhang.adress}</p>
                            {props.donhang.payment_methods == 0 && (
                                <p style={{ color: 'red' }}>chưa thanh toán</p>
                            )}
                            {props.donhang.payment_methods == 1 && (
                                <p style={{ color: 'green' }}>đã thanh toán</p>
                            )}
                            {props.donhang.trang_thai == 1 && (
                                <p style={{ color: 'green' }}>đang chờ duyệt</p>
                            )}
                            {props.donhang.trang_thai == 2 && (
                                <p style={{ color: 'green' }}>đang giao</p>
                            )}
                            {props.donhang.trang_thai == 3 && (
                                <p style={{ color: 'green' }}>đã giao</p>
                            )}
                            {props.donhang.trang_thai == 4 && (
                                <p style={{ color: 'green' }}>đang chờ hủy</p>
                            )}
                            {props.donhang.trang_thai == 5 && (
                                <p style={{ color: 'green' }}>đã hủy</p>
                            )}
                        </div>
                    </div>
                    <div className={`${styles['info-bill']}`}>
                        <h5 style={{ textAlign: 'center' }}><FontAwesomeIcon icon={faMoneyBillWave} /> Thông tin thanh toán</h5>
                        <div style={{ textAlign: 'end' }} className={`${styles['main-info-guest']}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p>tổng tiền</p>
                                    <p style={{color:'red'}}> giảm giá</p>
                                </div>
                                <div>
                                    <p > {props.donhang.tong_tien.toLocaleString('en-us')} VNĐ</p>
                                    <p style={{color:'red'}}> {props.donhang.giam_gia.toLocaleString('en-us')} VNĐ</p>
                                </div>
                            </div>
                            <hr />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{color:'green',fontSize:'20px',fontWeight:'700'}}>Thành Tiền</p>
                                <p style={{color:'green',fontSize:'20px',fontWeight:'700'}}>{props.donhang.gia_khuyen_mai.toLocaleString('en-us')} VNĐ</p>
                            </div>

                          

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}