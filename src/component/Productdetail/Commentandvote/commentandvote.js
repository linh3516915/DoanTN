import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import styles from './comment.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getlistvote } from "../../../redux/slice/itemproductdetail";
function Commentandvote() {
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    const listvote = useSelector(state => state.itemproductdetail.listvote);
    const trungbinhsao = useSelector(state => state.itemproductdetail.trungbinhsao);
    const tongdanhgia = useSelector(state => state.itemproductdetail.tongdanhgia);
    const listcomment = useSelector(state => state.itemproductdetail.listcomment);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAPI = async () => {
            if (productdetail != null && listvote == null) {
                const response = await axios.get(`http://127.0.0.1:8000/api/binhluandanhgia/ListVote/${productdetail.id}`)
                console.log(response.data.data);
                dispatch(getlistvote(response.data));
            }
        }
        getAPI()
    }, productdetail)
    let vote = [];
    let comment = [];
    if (!productdetail) {
        return null;
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
    if (listcomment != null) {
        comment = listcomment.map((item,index) => {
            if(index < 2){
                return (
                    <>
                        <div className={`${styles['list-comment']}`}>
                            <div className={`${styles['comment-name']}`}>{item.ten}</div>
                            <div className={`${styles['comment-star']}`}>
                                <div class="product-wid-rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                            </div>
                            <div className={`${styles['comment-content']}`}>{item.noi_dung_binh_luan}</div>
                            <div className={`${styles['comment-footer']}`}>
                                <button className="btn btn-outline-primary">
                                    <FontAwesomeIcon icon={faThumbsUp} style={{marginRight:'1rem'}}/>
                                    {item.luot_thich}
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        })
    }
    return (
        <>
            <div className={`${styles['main']}`}>
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
                        <h3>{trungbinhsao} <FontAwesomeIcon icon={faStar} style={{ color: '#ffc808' }} /></h3>
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
                <div style={{ marginTop: '1rem',marginBottom:'2rem' }}>
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
                <div style={{display : 'flex',justifyContent:'space-between',marginBottom : '1.5rem'}}>
                    <button className="btn btn-outline-danger" style={{width:'48%'}}>xem thêm</button>
                    <button className="btn btn-danger"  style={{width:'48%'}}>đánh giá</button>
                </div>

            </div>
        </>
    );
}

export default Commentandvote;