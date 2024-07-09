import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setbtnctdh } from "../../../redux/slice/ordermanagement";
import { useDispatch, useSelector } from "react-redux";


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
                        <div class="card shadow-0 border mb-4">
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
            <div style={{  }}>
                {listctdh}
            </div>
        </>
    )
}