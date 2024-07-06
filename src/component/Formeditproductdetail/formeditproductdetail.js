import { Link, useNavigate } from "react-router-dom";
import styles from './formeditproductdetail.module.css'
import { useEffect, useState } from "react";
import { gettoken, getuser, isadmin } from "../../redux/slice/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { closepopupeditproductdetail, closepopuplogin } from "../../redux/slice/popupSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useInView } from "react-intersection-observer";
import { loadingmodal } from "../../redux/slice/filterSlice";
import { addCartUser } from "../../redux/slice/cartSlice";
import { setanhctsp, setgiakhuyenmai, setgiatien, setiddungluong, setidmausac, setphantramgiam, setproductdetails, setsoluong } from "../../redux/slice/productSlice";
export default function FormEditproductdetail() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showselectedfile, setShowselectedfile] = useState(true);
    const [requestSelectedFile, setRequestSelectedFile] = useState([]);
    const phantramgiam = useSelector(state => state.product.phantramgiam);
    const giakhuyenmai = useSelector(state => state.product.giakhuyenmai);
    const soluong = useSelector(state => state.product.soluong);
    const gia = useSelector(state => state.product.giatien);
    const nameproduct = useSelector(state => state.product.name);
    const [dsmausac, setDSMauSac] = useState([]);
    const [dsdungluong, setDSDL] = useState([]);
    const iddungluong = useSelector(state => state.product.iddungluong);
    const idmausac = useSelector(state => state.product.idmausac);
    const anhctsp = useSelector(state => state.product.anhctsp);
    const dispatch = useDispatch();
    const { ref: refTopTrendingProduct, inView: inViewPopupLogin } = useInView({
        threshold: 0
    });
    useEffect(() => {
        async function setmausac() {
            var response = await fetch(`http://127.0.0.1:8000/api/mausac/mausac-admin`);
            var json = await response.json();
            setDSMauSac(json.data)
        }
        setmausac();
        async function setdungluong() {
            var response = await fetch(`http://127.0.0.1:8000/api/dungluong/dungluong-admin`);
            var json = await response.json();
            setDSDL(json.data)
        }
        setdungluong()
    }, []);
    let listdungluong = [];
    if (dsdungluong != []) {
        listdungluong = dsdungluong.map(function (item) {
            return (
                <option value={item.id} selected={iddungluong == item.id}>{item.kich_thuoc}</option>
            );
        });
    }
    let listmausac = [];
    if (dsmausac != []) {
        listmausac = dsmausac.map(function (item) {
            return (
                <option value={item.id} selected={idmausac == item.id}>{item.ten_mau_sac}</option>
            );
        });
    }
    useEffect(() => {
        dispatch(setgiakhuyenmai(((100 - phantramgiam) * gia) / 100));
    }, [phantramgiam, gia])
    return (
        <>
            <div ref={refTopTrendingProduct} className={`container w-fit-content bg-light ${styles['sign-in']} ${inViewPopupLogin ? 'animation-from-top' : ''}`}>
                <button className='btn btn-outline-danger' style={{ marginBottom: '1rem' }} onClick={() => {
                    dispatch(setiddungluong(0));
                    dispatch(setidmausac(0));
                    dispatch(setsoluong(0));
                    dispatch(setgiatien(0));
                    dispatch(setphantramgiam(0));
                    dispatch(setgiakhuyenmai(0));
                    dispatch(setanhctsp(''));
                    dispatch(closepopupeditproductdetail())
                }}><FontAwesomeIcon icon={faCircleXmark} /></button>
                <h3 className={`${styles['title']}`}>{nameproduct}</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(soluong, gia, giakhuyenmai, phantramgiam, requestSelectedFile);
                        const formData = new FormData();
                        formData.append('ten', nameproduct);
                        formData.append('so_luong', parseInt(soluong));
                        formData.append('gia', parseInt(gia));
                        formData.append('phan_tram_giam', parseInt(phantramgiam));
                        formData.append('gia_khuyen_mai', parseInt(giakhuyenmai));
                        formData.append('requestSelectedFile', requestSelectedFile);
                        const getAPI = async () => {
                            dispatch(loadingmodal(true));
                            const response = await axios.post('http://127.0.0.1:8000/api/nhaphang/capnhatproductdetail',
                                //      {
                                //     // 'ten': nameproduct,
                                //     // 'so_luong': parseInt(soluong),
                                //     // 'gia': gia,
                                //     // 'phan_tram_giam': phantramgiam,
                                //     // 'gia_khuyen_mai': giakhuyenmai,
                                //     // 'requestSelectedFile': requestSelectedFile
                                // }
                                formData
                                , {
                                    headers: {
                                        'Content-Type': 'multipart/form-data' // Đặt header phù hợp khi gửi FormData
                                    }
                                })
                            if (response.data.success) {
                                
                                alert('done');
                                // dispatch(setproductdetails(response.data.data));
                                window.location.reload();
                            }
                            else {
                                console.log('mesage', response.data.message);
                            }
                        }
                        getAPI();
                    }}
                    className={` d-flex flex-column ${styles['sign-in-form']}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '5rem' }}>
                        <div style={{ width: '60%', display: 'flex', flexWrap: 'wrap', height: 'max-content', justifyContent: 'space-around' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <label for="">Dung Lượng</label>
                                <div style={{}}>
                                    <div className="row" style={{ marginRight: '2%' }}>
                                        <div className="col-md-12">
                                            <select disabled className="form-select" value={iddungluong} onChange={(e) => { dispatch(setiddungluong(e.target.value)) }} required>
                                                <option selected="" className="form-control">Dung Lượng</option>
                                                {listdungluong}
                                            </select>
                                        </div>
                                    </div>

                                    {/* <button className='btn btn-outline-danger' type='button' onClick={openModalDL}>+</button> */}

                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label for="">Màu Sắc</label>
                                <div style={{}}>
                                    <div className="row" style={{ marginRight: '2%' }}>
                                        <div className="col-md-12">
                                            <select disabled className="form-select" value={idmausac} onChange={(e) => { dispatch(setidmausac(e.target.value)) }} required>
                                                <option selected="" className="form-control">Màu Sắc</option>
                                                {listmausac}
                                            </select>
                                        </div>
                                    </div>


                                    {/* <button className='btn btn-outline-danger ' type='button' style={{}} onClick={openModalMS}>+</button> */}

                                </div>
                            </div>


                            <div className="" style={{ marginBottom: '1rem' }}>
                                {/* <div class="col-md-3" > */}
                                <label for="Ten" className=" "> Số lượng </label>
                                <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem' }} type="number" min={0} value={soluong} onChange={(e) => { dispatch(setsoluong(e.target.value)) }} required />
                                {/* </div> */}
                            </div>

                            <div className="" style={{ marginBottom: '1rem', height: '20px' }}>
                                {/* <div class="col-md-3"> */}
                                <label for="Ten" className=""> Giá Tiền </label>
                                <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem' }} type="number" min={0} value={gia} onChange={(e) => { dispatch(setgiatien(e.target.value)) }} required />
                                {/* </div> */}
                            </div>
                            <div className="" style={{ marginBottom: '1rem', height: '20px' }}>
                                {/* <div class="col-md-3"> */}
                                <label for="Ten" className=""> nhập phần trăm giảm </label>
                                <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem' }} type="number" min={0} max={100} value={phantramgiam} onChange={(e) => { dispatch(setphantramgiam(e.target.value)) }} required />
                                {/* </div> */}
                            </div>
                            <div className="" style={{ marginBottom: '1rem', height: '20px' }}>
                                {/* <div class="col-md-3"> */}
                                <label for="Ten" className=""> giá khuyến mãi</label>
                                <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem' }} type="number" value={giakhuyenmai} disabled required />
                                {/* </div> */}
                            </div>
                        </div>
                        <div>

                            <p style={{ marginBottom: '0' }}>chọn ảnh đại diện sản phẩm</p>
                            <input class="form-control" style={{ height: 'max-content', padding: '0.5rem', marginTop: '0' }} type="file" id="formFile" onChange={(e) => {
                                const file = e.target.files[0];
                                setRequestSelectedFile(e.target.files[0]);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setSelectedFile(reader.result); // Lưu đường dẫn của ảnh vào state
                                    };
                                    reader.readAsDataURL(file); // Đọc và chuyển đổi file thành URL dạng base64
                                }
                            }} />
                            {selectedFile && (
                                <div style={{ margin: '3%', height: '140px' }}>
                                    <img src={selectedFile} alt="Ảnh đã chọn" style={{ width: '200px', height: '100%' }} />
                                </div>
                            )}
                            {!selectedFile && (
                                <div style={{ margin: '3%', height: '140px' }}>
                                    <img src={anhctsp} alt="Ảnh đã chọn" style={{ width: '200px', height: '100%' }} />
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" onClick={() => {
                       
                    }} style={{ marginTop: '50px', width: '20%', margin: '0 auto' }} className="btn btn-outline-success">Sửa</button>
                </form>
            </div>
        </>
    )
}