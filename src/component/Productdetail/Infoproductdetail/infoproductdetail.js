import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer";
import styles from './infoproductdetail.module.css'
import Img5 from '../../../assets/imagestest/pic5.jpg'
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faMinus, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getinfoproductdetail, getproductdetail } from "../../../redux/slice/itemproductdetail";
import { addRecently } from "../../../redux/slice/recentlyviewedSlice";
function InfoProductDetail(props) {
    const [seemore, setSeemore] = useState(false);
    const [formAdd, setFormadd] = useState(false);
    const [id, setId] = useState(null);
    const [tieude, setTieude] = useState('');
    const [noidung, setNoidung] = useState('');
    const [imgnoidung, setImgnoidung] = useState(null);
    const [formdata, setFormdata] = useState(null);
    const [showformedit, setShowformedit] = useState(-1);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const productdetail = useSelector(state => state.itemproductdetail.productdetail);
    const infoproductdetail = useSelector(state => state.itemproductdetail.infoproductdetail);
    const dispatch = useDispatch();
    const SectionRef = useRef(null);
    const formSectionRef = useRef(null);
    const formeditSectionRef = useRef(null);

    useEffect(() => {
        if (productdetail !== null && infoproductdetail === null) {
            const getAPI = async () => {
                const response = await axios.post('http://127.0.0.1:8000/api/noidungsanpham/listinfoproductdetail', {
                    san_pham_id: productdetail.san_pham_id
                })
                dispatch(getinfoproductdetail(response.data.data));

            }
            getAPI();
        }


    }, [productdetail, infoproductdetail])
    useEffect(() => {
        if (productdetail !== null) {
            setFormdata({
                'san_pham_id': productdetail.san_pham_id,
                'tieu_de': tieude,
                'noi_dung': noidung,
                'image': imgnoidung,
                'id': id,
            })
        }

    }, [tieude, noidung, imgnoidung, productdetail, id])
    if (!infoproductdetail == null) {
        return null;
    }
    console.log('API Response:sssss', productdetail);
    let listinfoproductdetail = [];
    let imginfoproducdetail = [];
    const delimg = (id) => {
        const getAPI = async () => {
            const response = await axios.delete(`http://127.0.0.1:8000/api/noidungsanpham/delimginfoproduct/${id}`)
            window.location.reload();
        }
        getAPI();
    }
    const delinfoproduct = (id) =>{
        const getAPI = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/noidungsanpham/delinfoproduct/${id}`)
            window.location.reload();
        }
        getAPI();
    }
    const delall =(id)=>{
        const getAPI = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/noidungsanpham/del/${id}`)
            window.location.reload();
        }
        getAPI();
    }
    if (infoproductdetail != null) {
        listinfoproductdetail = infoproductdetail.map((item, ind) => {
            imginfoproducdetail = item.hinh_anh_noi_dung.map((item) => {
                return (
                    <>
                        <div className={`${styles['img']}`}>
                            {isAdmin && (
                                <button onClick={() => { delimg(item.id) }} className={`btn btn-outline-success`}> <FontAwesomeIcon icon={faTrash} /> xóa ảnh</button>
                            )}

                            <img src={'http://127.0.0.1:8000/' + item.URL_anh} />
                        </div>
                    </>
                )
            })
            return (
                <>
                    {showformedit === ind && (
                        <>
                            <form style={{ border: 'solid 1px #ccc', padding: '1rem' }} onSubmit={(e) => { e.preventDefault(); }} ref={formeditSectionRef} className={`${formeditSectionRef != null ? 'animation-from-top' : ''}`}>
                                {isAdmin && (
                                    <>
                                        <button onClick={() => {
                                            setShowformedit(-1);
                                            setTieude('');
                                            setNoidung('');
                                            setImgnoidung(null);
                                            setId(null);
                                            if (formeditSectionRef.current) {
                                                formeditSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }} style={{ borderRadius: '22px', marginLeft: '2%', marginTop: '0' }} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faMinus} /></button>
                                    </>

                                )}
                                <input className="col-6" value={tieude} placeholder='Nhập Tiêu Đề' type="text" onChange={(e) => { setTieude(e.target.value) }} />
                                <textarea style={{ border: 'solid 1px #ccc' }} value={noidung} placeholder='Nhập Tiêu Đề' onChange={(e) => { setNoidung(e.target.value) }} rows="4" cols="50" />
                                <input class="form-control" type="file" style={{ marginBottom: '1rem' }} id="formFileMultiple" multiple onChange={(e) => { setImgnoidung(e.target.files[0]); }} />
                                {imginfoproducdetail}
                                <button onClick={() => { edit(tieude, noidung, imgnoidung, item.noi_dung_san_pham.id, formdata) }} className={`btn btn-outline-success`}>sửa</button>

                            </form>

                        </>
                    )}
                    {showformedit === -1 && (
                        <>
                            <div className={`${isAdmin ? (styles['main']) : ''}`}>
                                <h5 className={`${styles['title']}`}>{item.noi_dung_san_pham.tieu_de}
                                    {isAdmin && (
                                        <>
                                         <button onClick={() => {
                                            setShowformedit(ind);
                                            setTieude(item.noi_dung_san_pham.tieu_de);
                                            setNoidung(item.noi_dung_san_pham.noi_dung);
                                            setImgnoidung(null);
                                            setId(item.noi_dung_san_pham.id)
                                            if (SectionRef.current) {
                                                SectionRef.current.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }} style={{ borderRadius: '22px', marginLeft: '2%', marginTop: '0' }} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            {(item.noi_dung_san_pham.tieu_de == '' && item.noi_dung_san_pham.noi_dung == '') ? (
                                                <button style={{ borderRadius: '22px', marginLeft: '2%', marginTop: '0' }}   onClick={() => {delall(item.noi_dung_san_pham.id)}} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faTrash} />xóa </button>
                                            ): (
                                                <>
                                                <button style={{ borderRadius: '22px', marginLeft: '2%', marginTop: '0' }}   onClick={() => { delinfoproduct(item.noi_dung_san_pham.id) }} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faTrash} />xóa nội dung </button>
                                                <button style={{ borderRadius: '22px', marginLeft: '2%', marginTop: '0' }}   onClick={() => {delall(item.noi_dung_san_pham.id)}} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faTrash} />xóa </button>
                                           
                                                </>
                                            )}
                                          
                                         
                                       
                                        </>
                                       
                                    )}
                                </h5>
                                <p className={`${styles['description']}`}> {item.noi_dung_san_pham.noi_dung}</p>
                                {imginfoproducdetail}
                            </div>

                        </>
                    )}

                </>
            )

        })

    }
    console.log(imgnoidung);
    console.log(tieude);
    const themmoi = (tieude, noidung, imgnoidung, san_pham_id) => {

        if (tieude == '' && noidung == '' && imgnoidung == null) {
            alert('Nhập ít nhất 1 trường để thêm');
        }
        else {
            if (productdetail !== null) {
                console.log('them moi', formdata);
                const getAPI = async () => {
                    const response = await axios.post('http://127.0.0.1:8000/api/noidungsanpham/addinfoproductdetail', formdata,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    )
                    window.location.reload();
                }
                getAPI();
            }
        }

    }
    const edit = (tieude, noidung, imgnoidung, id) => {

        if (tieude == '' && noidung == '' && imgnoidung == null) {
            alert('Nhập ít nhất 1 trường để thêm');
        }
        else {
            if (productdetail !== null) {
                console.log(formdata);
                const getAPI = async () => {
                    const response = await axios.post('http://127.0.0.1:8000/api/noidungsanpham/editinfoproductdetail', formdata,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    )
                    window.location.reload();
                }
                getAPI();
            }
        }

    }
    console.log(formdata);
    return (
        <>
            <div ref={SectionRef} style={{ width: '70%' }}>
                <div >
                    <h4 className={`${styles['']}`} style={{ fontWeight: '700', marginBottom: '2rem' }}>thông tin sản phẩm</h4>
                    <div className={` ${seemore ? styles['main'] : styles['seemore']}`} >

                        {listinfoproductdetail}
                        {/* {imginfoproducdetail} */}
                        {isAdmin && (
                            <div>
                                {formAdd && (
                                    <button onClick={() => {
                                        setFormadd(false)
                                        if (SectionRef.current) {
                                            SectionRef.current.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} style={{ borderRadius: '22px' }} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faMinus} /></button>
                                )}
                                {!formAdd && (
                                    <button onClick={() => {
                                        setFormadd(true);
                                        if (formSectionRef.current) {
                                            formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }} style={{ borderRadius: '22px' }} className={`btn btn-outline-danger ${styles['button']}`}><FontAwesomeIcon icon={faPlus} /></button>
                                )}
                                {formAdd && (
                                    <form onSubmit={(e) => { e.preventDefault(); }} ref={formSectionRef} className={`${formSectionRef != null ? 'animation-from-top' : ''}`}>
                                        <input className="col-6" value={tieude} placeholder='Nhập Tiêu Đề' type="text" onChange={(e) => { setTieude(e.target.value) }} />
                                        <textarea style={{ border: 'solid 1px #ccc' }} value={noidung} placeholder='Nhập Tiêu Đề' onChange={(e) => { setNoidung(e.target.value) }} rows="4" cols="50" />
                                        <input class="form-control" type="file" style={{ marginBottom: '1rem' }} id="formFileMultiple" multiple onChange={(e) => { setImgnoidung(e.target.files[0]); }} />
                                        <button onClick={() => { themmoi(tieude, noidung, imgnoidung, productdetail.san_pham_id, formdata) }} className={`btn btn-outline-success`}>thêm mới</button>
                                    </form>
                                )}

                            </div>

                        )}

                    </div>
                    {!seemore && (
                        <button onClick={() => { setSeemore(true) }} className={`btn btn-outline-primary ${styles['button']}`}>xem thêm</button>
                    )}
                    {seemore && (
                        <button onClick={() => {
                            setSeemore(false);
                            if (SectionRef.current) {
                                SectionRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                        }} className={`btn btn-outline-primary ${styles['button']}`}>Ẩn bớt</button>
                    )}


                </div>

            </div>

        </>
    );
}

export default InfoProductDetail;