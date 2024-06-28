import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import styles from './comment.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam, faStar, faStarHalfStroke, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getlistvote, getsocommentnow } from "../../../redux/slice/itemproductdetail";
import LoadingSpinner from "../../loading/loadingspinner";
import { loadingComponent } from "../../../redux/slice/filterSlice";
import { openpopupcomment } from "../../../redux/slice/popupSlice";
function Commentandvote() {
    const loadingcomponent = useSelector(state => state.filter.loadingcomponent);
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    const listvote = useSelector(state => state.itemproductdetail.listvote);
    const trungbinhsao = useSelector(state => state.itemproductdetail.trungbinhsao);
    const tongdanhgia = useSelector(state => state.itemproductdetail.tongdanhgia);
    const listcomment = useSelector(state => state.itemproductdetail.listcomment);
    const socommentnow = useSelector(state => state.itemproductdetail.socommentnow);
    const isadmin = useSelector(state => state.auth.isAdmin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const getAPI = async () => {
            if (productdetail != null && listvote == null) {
                dispatch(loadingComponent(true))
                const response = await axios.post(`http://127.0.0.1:8000/api/binhluandanhgia/ListVote`,{
                    san_pham_id : productdetail.san_pham_id,
                    mau_sac_id : productdetail.mau_sac_id,
                    dung_luong_id : productdetail.dung_luong_id
                })
                console.log(response.data.data);
                dispatch(getlistvote(response.data));
                dispatch(loadingComponent(false))
            }
        }
        getAPI()
    }, productdetail)
    console.log();
    let vote = [];
    let comment = [];
    const likebinhluan = (id) =>{
        const getAPI = async () => {
                const response = await axios.get(`http://127.0.0.1:8000/api/binhluandanhgia/likecomment/${id}`)
                window.location.reload();
            }

        getAPI()
        
    }
    if (listcomment != null) {
        comment = listcomment.map((item, index) => {
            if (index <= socommentnow) {
                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} className={`${styles['list-comment']}`}>
                            <div>
                                <div className={`${styles['comment-name']}`}>{item.ten}</div>
                                <div className={`${styles['comment-star']}`}>
                                    <div class="product-wid-rating" style={{ display: 'flex' }}>
                                        {[1, 2, 3, 4, 5].map((number, i) => {
                                            return (
                                                <>
                                                    <div key={index}
                                                        className={` ${styles['icon-star']} ${i + 1 <= item.so_sao ? styles['active'] : ''}`}

                                                    >
                                                        <i class="fa fa-star"></i>
                                                    </div>

                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={`${styles['comment-content']}`}>{item.noi_dung_binh_luan}</div>
                                <div className={`${styles['comment-footer']}`}>
                                    <button className="btn btn-outline-primary" onClick={()=>{likebinhluan(item.id)}}>

                                        <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '1rem' }} />
                                        {item.luot_thich}
                                    </button>
                                </div>
                            </div>
                            <div>
                                {isadmin && (
                                    <button className="btn btn-danger">Xóa</button>
                                )}

                            </div>
                        </div>
                    </>
                )
            }
        })
    }
    if (!productdetail) {
        return (
            <>
                <div style={{ width: '100%' }}>
                    <LoadingSpinner />
                </div>
            </>
        );
    }
    if (productdetail != null && listvote != null) {
        vote = listvote.map((item) => {
            return (
                <>
                    <li>
                        <p>{item.so_sao}<FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></p>
                        <div className={`${styles['vote-percent']}`}>
                            <div style={{ width: `${item.phan_tram_sao}%` }} className={`${styles['vote-percent-chilren']}`}></div>
                        </div>
                        <p>{item.phan_tram_sao}%</p>
                    </li>
                </>
            )
        })
    }

    const seemore = (them) => {
        if (listcomment.length > socommentnow) {
            if (listcomment.length - socommentnow >= 8) {
                dispatch(getsocommentnow(them));
            }
            else {
                dispatch(getsocommentnow(listcomment.length - socommentnow));
            }
        }
    }
    let datastar = [];
    if (productdetail != null) {
        const liststar = [1, 2, 3, 4, 5].map((number, index) => {
            if (Math.floor(productdetail.so_sao) >= number) {
                datastar.push(
                    <div
                        className={` ${styles['']} `}
                    >
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                )
            }

            return (
                < FontAwesomeIcon icon={faStarHalfStroke} />

            )
        })
        if ((productdetail.so_sao - Math.floor(productdetail.so_sao)) >= 0.1 && (productdetail.so_sao - Math.floor(productdetail.so_sao)) <= 0.9) {
            datastar.push(
                <div
                    // key={index}
                    className={` ${styles['']} `}
                // onClick={() => { setHoverIndex(index); setDisavled(true); }}

                >
                    < FontAwesomeIcon icon={faStarHalfStroke} />
                </div>
            )
        }
        for (let i = 0; i < 5 - Math.ceil(productdetail.so_sao); i++) {
            datastar.push(
                <div
                    // key={i}
                    className={` ${styles['']} `}
                    // onClick={() => { setHoverIndex(index); setDisavled(true); }}
                    style={{ color: '#ccc' }}
                >
                    <FontAwesomeIcon icon={faStar} />
                </div>
            )
        }
    }
    
    return (
        <>
            <div className={`${styles['main']}`}>
                {loadingcomponent && (
                    <div style={{ width: '100%' }}>
                        <LoadingSpinner />
                    </div>
                )}

                {productdetail != null && (
                    <>
                        <h4>{productdetail.ten}</h4>
                    </>
                )}
                {productdetail == null && (
                    <>
                        <h2>Tên sản phẩm</h2>
                    </>
                )}

                <div className={`${styles['vote']}`}>
                    <div className={`${styles['vote-top']}`}>
                        <div style={{ display: 'flex' }}>
                            <h3>{trungbinhsao}</h3>
                            <div className="product-wid-rating" style={{ display: 'flex',lineHeight:'2.5',marginRight:'10px' }}>
                                    {datastar}
                                </div>
                        </div>

                        <p>{tongdanhgia} người đánh giá</p>
                    </div>
                    <ul className={`${styles['vote-bottom']}`}>

                        {listvote == null && (
                            <>
                                <li>
                                    <p>5 <FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></p>
                                    <div className={`${styles['vote-percent']}`}>
                                        <div style={{ width: '0%' }} className={`${styles['vote-percent-chilren']}`}></div>
                                    </div>
                                    <p>0%</p>
                                </li>
                                <li>
                                    <p>4 <FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></p>
                                    <div className={`${styles['vote-percent']}`}>
                                        <div style={{ width: '0%' }} className={`${styles['vote-percent-chilren']}`}></div>
                                    </div>
                                    <p>0%</p>
                                </li>
                                <li>
                                    <p>3 <FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></p>
                                    <div className={`${styles['vote-percent']}`}>
                                        <div style={{ width: '0%' }} className={`${styles['vote-percent-chilren']}`}></div>
                                    </div>
                                    <p>0%</p>
                                </li>
                                <li>
                                    <p>2 <FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></p>
                                    <div className={`${styles['vote-percent']}`}>
                                        <div style={{ width: '0%' }} className={`${styles['vote-percent-chilren']}`}></div>
                                    </div>
                                    <p>0%</p>
                                </li>
                                <li>
                                    <p>1 <FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></p>
                                    <div className={`${styles['vote-percent']}`}>
                                        <div style={{ width: '0%' }} className={`${styles['vote-percent-chilren']}`}></div>
                                    </div>
                                    <p>0%</p>
                                </li>
                            </>

                        )}
                        {vote}
                    </ul>
                </div>
                <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                    {listcomment != null && (
                        <>
                            {comment}
                        </>
                    )}

                    {listcomment == null && (
                        <>
                            <div style={{ textAlign: 'center', opacity: 0.2 }}>hãy là người comment đầu tiên nhé <FontAwesomeIcon icon={faFaceSmileBeam} /></div>
                        </>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    {listcomment == null ? (
                        <>
                            <button className="btn btn-outline-danger" style={{ width: '48%' }}>xem thêm</button>
                        </>
                    ) : (
                        <button className="btn btn-outline-danger" onClick={() => { seemore(8) }} style={{ width: '48%' }}>xem thêm</button>
                    )}
                    <button className="btn btn-danger" onClick={() => { dispatch(openpopupcomment()) }} style={{ width: '48%' }}>đánh giá</button>
                </div>

            </div>
        </>
    );
}

export default Commentandvote;