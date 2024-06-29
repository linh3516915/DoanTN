import styles from './formcomment.module.css'
import img from "../../../../assets/ảnh/14ve.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { closepopupcomment } from '../../../../redux/slice/popupSlice';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
export default function FormComment(props) {
    const dispatch = useDispatch();
    const [hoverIndex, setHoverIndex] = useState(null);
    const [disabled, setDisavled] = useState(false);
    const [ten, setTen] = useState('');
    const [sodienthoai, setSoDienThoai] = useState('');
    const [noidung, setNoiDung] = useState('');
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    const id = useSelector(state => state.auth.user.id);
    const navigate = useNavigate();
    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };
    const handleMouseLeave = () => {
        if (disabled === false) {
            setHoverIndex(-1);
        }

    };
    console.log(hoverIndex);
    const handlesubmit = (e) => {
        e.preventDefault();


    }
    const buttonSubmit = (sodienthoai, ten, noidung,san_pham_id,mau_sac_id,dung_luong_id, so_sao, user_id) => {
        if (user_id === undefined) {
            const getAPI = async () => {
                const response = await axios.post('http://127.0.0.1:8000/api/binhluandanhgia/writecomment', {
                    ten: ten,
                    so_dien_thoai: sodienthoai,
                    noi_dung_binh_luan: noidung,
                    san_pham_id : san_pham_id,
                    mau_sac_id : mau_sac_id,
                    dung_luong_id : dung_luong_id,
                    so_sao: so_sao,
                    // user_id : 0,
                })
                if (response.data.success) {
                    alert('thanh cong');
                    window.location.reload();
                }
            }
            getAPI();
        }
        else {
            const getAPI = async () => {
                const response = await axios.post('http://127.0.0.1:8000/api/binhluandanhgia/writecomment', {
                    
                    noi_dung_binh_luan: noidung,
                    san_pham_id : san_pham_id,
                    mau_sac_id : mau_sac_id,
                    dung_luong_id : dung_luong_id,
                    so_sao: so_sao,
                    user_id: user_id,
                })
                if (response.data.success) {
                    window.location.reload();
                }
            }
            getAPI();
        }

    }
    console.log(id);
    console.log(sodienthoai);
    console.log(noidung);
    console.log('id san pham:', productdetail.id);
    console.log(ten);
    return (
        <>
            <div className={`${styles['main']}`}>
                <div className={`${styles['otp-input']}`} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => { dispatch(closepopupcomment()) }} className='btn btn-outline-danger' >x</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={img} />
                    </div>
                    <h5>Tên Sản Phâmr</h5>
                    {!disabled && (
                        <p>hãy chọn sao</p>
                    )}

                    <div className={`${styles['icon']}`} >
                        {[1, 2, 3, 4, 5].map((number, index) => (
                            <div
                                key={index}
                                className={` ${styles['icon-star']} ${hoverIndex !== null && index <= hoverIndex ? styles['active'] : ''}`}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => { setHoverIndex(index); setDisavled(true); }}
                            >
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                        ))}

                    </div>
                    {disabled && (
                        <>
                            <textarea style={{ border: 'solid 1px #ccc', width: '85%' }} value={noidung} onChange={(e) => { setNoiDung(e.target.value) }} placeholder='Nhập Tiêu Đề' rows="4" cols="50" />
                            {id == undefined && (
                                <>
                                    <form onSubmit={handlesubmit}>
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" style={{ margin: '0' }} value={ten} onChange={(e) => { setTen(e.target.value) }} className="form-control" placeholder="Họ tên" required />
                                            </div>
                                            <div className="col">
                                                <input type="text" style={{ margin: '0' }} value={sodienthoai} onChange={(e) => { setSoDienThoai(e.target.value) }} className="form-control" placeholder="số điện thoại" required />
                                            </div>
                                        </div>
                                        {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <button onClick={() => {
                                                buttonSubmit(sodienthoai,
                                                    ten, noidung, productdetail.id, hoverIndex, id)
                                            }} value="Submit" className={`${styles['input-submit']}`} >confirm</button>
                                        </div> */}
                                    </form>
                                </>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <button onClick={() => {
                                    buttonSubmit(sodienthoai,
                                        ten, noidung, productdetail.san_pham_id,productdetail.mau_sac,productdetail.dung_luong_id, hoverIndex+1, id)
                                }} value="Submit" className={`${styles['input-submit']}`} >confirm</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}