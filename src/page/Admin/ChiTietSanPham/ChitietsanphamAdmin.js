
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import HeaderAdmin from '../../../layout/Admin/Header/Header';
import TaskbarAdmin from '../../../layout/Admin/Taskbar/taskbar';
import PopupAddLSP from '../../../component/Admin/AddTHvaLSP/AddLoaiSP';
import PopupAddNCC from '../../../component/Admin/AddTHvaLSP/AddNhaCungCap';
import PopupAddDL from '../../../component/Admin/AddTHvaLSP/AddDungLuong';
import PopupAddMauSac from '../../../component/Admin/AddTHvaLSP/AddMauSac';
import { useDispatch, useSelector } from 'react-redux';
import { loadingmodal } from '../../../redux/slice/filterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faDeleteLeft, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { delproductdetail, setId, setIdloaisanpham, setIdsupplier, setIdtrangthai, setanhctsp, setgiakhuyenmai, setgiatien, setiddungluong, setidmausac, setmota, setname, setoption, setphantramgiam, setproductdetail, setproductdetails, setsoluong } from '../../../redux/slice/productSlice';
import ChiTietSanPham from '../../../component/Admin/ChiTietSanPham/Chitietsanpham';
import EditorComponent from '../../../component/CKeditor/ckeditor';
import PopupAddtrangthai from '../../../component/Admin/AddTHvaLSP/Addtrangthai';
import { openpopupeditproductdetail, setsuccess } from '../../../redux/slice/popupSlice';
import { apiUrl, apiUrl_anh } from '../../../api/api';
export default function ChiTietSanPhamAdmin(props) {

    const { id } = useParams();
    const [dsctsp, SetDSCTSP] = useState([]);


    useEffect(() => {
        async function setctsp() {
            var response = await fetch(`${apiUrl}/ctsp/ctsp-admin/${id}`);
            var json = await response.json();
            SetDSCTSP(json.data)
            dispatch(setId(id))
        }
        setctsp();
    }, [id]);
    // const listCTSP = dsctsp.map(function (item) {
    //     return (
    //         <ChiTietSanPham data={item} />
    //     );
    // });
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    // const InputDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showselectedOption, setshowSelectedOption] = useState(false);
    const [addtensp, setTenSP] = useState('');
    const [dsSanPham, setDSSanPham] = useState([]);
    const [tenncc, setTenNCC] = useState(0);
    const [trangthaiid, setTrangthaiid] = useState(0);
    const [addloaisp, setLoaiSP] = useState(0);
    const [dsLoaiSP, setDSLSP] = useState([]);
    const [dsNCC, SetDSNCC] = useState([]);
    const [ten_mau_sac, setTenMauSac] = useState(0);
    const [dsmausac, setDSMauSac] = useState([]);
    const [kich_thuoc, setKichThuoc] = useState(0);
    const [dsdungluong, setDSDL] = useState([]);
    const [giatien, setGiaTien] = useState(0);
    const [sl, setSL] = useState(0);
    const [ghichu, setGhiChu] = useState('');
    const [btnghichu, setBtnGhiChu] = useState(false);
    const [formdata, setFormData] = useState({});
    const [image, setImage] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [requestSelectedFiles, setRequestSelectedFiles] = useState([]);
    const user = useSelector(state => state.auth.user);
    const isloadingmodal = useSelector(state => state.filter.loading);
    const dispatch = useDispatch();
    const [modalIsOpenNCC, setModalIsOpenNCC] = useState(false);
    const [modalIsOpentrangthai, setModalIsOpentrangthai] = useState(false);
    const [modalIsOpenLSP, setModalIsOpenLSP] = useState(false);
    const [modalIsOpenDL, setModalIsOpenDL] = useState(false);
    const [modalIsOpenMS, setModalIsOpenMS] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showselectedfile, setShowselectedfile] = useState(true);
    const [showprice, setShowprice] = useState(true);
    const [requestSelectedFile, setRequestSelectedFile] = useState([]);
    const [dstrangthai, setDstrangthai] = useState([]);
    const openModalDL = () => setModalIsOpenDL(true);
    const closeModalDL = () => setModalIsOpenDL(false);

    const openModalNCC = () => setModalIsOpenNCC(true);
    const closeModalNCC = () => setModalIsOpenNCC(false);

    const openModaltrangthai = () => setModalIsOpentrangthai(true);
    const closeModaltrangthai = () => setModalIsOpentrangthai(false);

    const openModalLSP = () => setModalIsOpenLSP(true);
    const closeModalLSP = () => setModalIsOpenLSP(false);

    const openModalMS = () => setModalIsOpenMS(true);
    const closeModalMS = () => setModalIsOpenMS(false);
    // const [options, setOptions] = useState([]);
    const options = useSelector(state => state.product.option);
    const idproduct = useSelector(state => state.product.id);
    const idsupplier = useSelector(state => state.product.idsupplier);
    const idloaisanpham = useSelector(state => state.product.idloaisanpham);
    const idtrangthai = useSelector(state => state.product.idtrangthai);
    const iddungluong = useSelector(state => state.product.iddungluong);
    const idmausac = useSelector(state => state.product.idmausac);
    const productdetail = useSelector(state => state.product.productdetail);
    const nameproduct = useSelector(state => state.product.name);
    const mota = useSelector(state => state.product.mo_ta);
    const soluong = useSelector(state => state.product.soluong);
    const gia = useSelector(state => state.product.giatien);
    const phantramgiam = useSelector(state => state.product.phantramgiam);
    const giakhuyenmai = useSelector(state => state.product.giakhuyenmai);
    const anhctsp = useSelector(state => state.product.anhctsp);
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function setncc() {
            try {
                var response = await fetch(`${apiUrl}/nhacungcap/nhacungcap-admin`);
                var json = await response.json();
                SetDSNCC(json.data)
            } catch (error) {

                if (error.response.status === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        setncc();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }


        }
        setncc();
        const getAPI = async () => {
            try {
                // dispatch(loadingmodal(true));
                const response = await axios.get(`${apiUrl}/sanpham/sanpham-admin`)
                //setOptions(response.data.data)
                dispatch(setoption(response.data.data));
                // dispatch(loadingmodal(false));
            } catch (error) {
                if (error.response.status === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        getAPI();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }

        }
        getAPI();
        async function setloaisp() {
            try {
                var response = await fetch(`${apiUrl}/loaisp/loaisp-admin`);
                var json = await response.json();
                setDSLSP(json.data)
            } catch (error) {
                if (error.response.status === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        setloaisp();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }

        }
        setloaisp();
        async function setmausac() {
            try {
                var response = await fetch(`${apiUrl}/mausac/mausac-admin`);
                var json = await response.json();
                setDSMauSac(json.data)
            } catch (error) {
                if (error.response.status === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        setmausac();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }

        }
        setmausac();
        async function setdungluong() {
            try {
                var response = await fetch(`${apiUrl}/dungluong/dungluong-admin`);
                var json = await response.json();
                setDSDL(json.data)
            } catch (error) {
                if (error.response.status === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        setdungluong();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }

        }
        setdungluong();
        async function settrangthai() {
            try {
                var response = await fetch(`${apiUrl}/trangthaisanpham/trangthaisanpham`);
                var json = await response.json();
                setDstrangthai(json.data)
            } catch (error) {
                if (error.response.status === 429) {
                    const delay = Math.pow(2, retryCount) * 1000; // 1000 milliseconds = 1 second
                    setTimeout(() => {
                        setRetryCount(retryCount + 1);
                        settrangthai();
                    }, delay);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }

        }
        settrangthai();
    }, []);
    let listnhacungcap = [];
    console.log(requestSelectedFiles);
    if (dsNCC != []) {
        listnhacungcap = dsNCC.map(function (item) {
            return (
                <option value={item.id} selected={item.id == idsupplier}>{item.ten}</option>
            );
        });
    }
    let listloaisanpham = [];
    if (dsLoaiSP != []) {
        listloaisanpham = dsLoaiSP.map(function (item) {
            return (
                <option value={item.id} selected={item.id == idloaisanpham}>{item.ten_loai}</option>
            );
        });

    }
    let listsanpham = [];
    if (dsSanPham != []) {
        listsanpham = dsSanPham.map(function (item) {
            return (
                <option value={item.id}>{item.ten}</option>
            );
        });
    }
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
    let listtrangthai = [];
    if (dstrangthai != []) {
        listtrangthai = dstrangthai.map(function (item) {
            return (
                <option value={item.id} selected={idtrangthai === item.id}>{item.ten_trang_thai}</option>
            );
        });
    }

    const themmoiLSP = async (loaisp) => {
        try {

            const response = await axios.post(`${apiUrl}/loaisp/themmoi-loaisp`, {
                loaisp
            });
            setDSLSP(dsLoaiSP => [...dsLoaiSP, response.data.data]);
            //setLoaiSP(response.data.data.id);

        } catch (error) {
            console.error('Lỗi thêm loại sản phẩm:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }
    const themmoiDL = async (kich_thuoc) => {
        try {

            const response = await axios.post(`${apiUrl}/dungluong/themmoi-dungluong`, {
                kich_thuoc
            });
            setDSDL(dsdungluong => [...dsdungluong, response.data.data]);
            //setLoaiSP(response.data.data.id);

        } catch (error) {
            console.error('Lỗi Thêm Dung Luong:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }

    const themmoiNCC = async (tenncc) => {
        try {

            const response = await axios.post(`${apiUrl}/nhacungcap/themmoi-nhacungcap`, {
                tenncc
            });
            SetDSNCC(dsNCC => [...dsNCC, response.data.data]);
            //setLoaiSP(response.data.data.id);

        } catch (error) {
            console.error('Lỗi thêm nha cung cap', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }

    const themmoiMauSac = async (ten_mau_sac) => {
        try {
            const response = await axios.post(`${apiUrl}/mausac/themmoi-mausac`, {
                ten_mau_sac
            });
            setDSMauSac(dsmausac => [...dsmausac, response.data.data]);
            //setLoaiSP(response.data.data.id);

        } catch (error) {
            console.error('Lỗi thêm Màu Sắc', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }
    const themmoitrangthai = async (tentrangthai) => {
        try {
            const response = await axios.post(`${apiUrl}/trangthaisanpham/themmoi`, {
                tentrangthai
            });
            setDstrangthai(dstrangthai => [...dstrangthai, response.data.data]);

        } catch (error) {
            console.error('Lỗi thêm Màu Sắc', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
        };
    }

    const themmoinhaphang = (e) => {
        e.preventDefault();
        console.log('formdataa', formdata);
        const getAPI = async () => {
            try {
                dispatch(loadingmodal(true));
                const response = await axios.post(`${apiUrl}/nhaphang/nhaphang`, {
                    'ten_san_pham': formdata.ten_san_pham,
                    'mau_sac_id': parseInt(formdata.mau_sac_id),
                    'dung_luong_id': parseInt(formdata.dung_luong_id),
                    'user_id': user.id,
                    'nha_cung_cap_id': parseInt(formdata.nha_cung_cap_id),
                    'loai_san_pham_id': parseInt(formdata.loai_san_pham_id),
                    'so_luong': parseInt(formdata.so_luong),
                    'gia': parseInt(formdata.gia),
                    'phan_tram_giam': parseInt(formdata.phan_tram_giam),
                    'gia_khuyen_mai': parseInt(formdata.gia_khuyen_mai),
                    'ghi_chu': formdata.ghi_chu,
                    'trang_thai_id': parseInt(formdata.trang_thai_id),
                    'mo_ta': formdata.mo_ta,
                    'requestSelectedFiles': formdata.requestSelectedFiles,
                    'requestSelectedFile': formdata.requestSelectedFile
                }
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }

                    })

                if (response.data.success) {
                    console.log('testdataaaa', response.data.data.san_pham_id);

                    dispatch(setproductdetails(response.data));

                    dispatch(loadingmodal(false));
                    dispatch(setsuccess(true));

                }
                else {
                    console.log('check : 3 file', response.data.message);
                }
                dispatch(loadingmodal(false));
            } catch (error) {
                dispatch(loadingmodal(false));
            }
        }
        getAPI()
    }
    const [disabledprice, setDisableprice] = useState(false);
    const [index, setIndex] = useState(null);
    console.log('productdetail', productdetail);
    let listCTSP = [];
    if (productdetail != null) {
        listCTSP = productdetail.map(function (item) {
            console.log('productdetail', productdetail);
            return (
                <tr key={item.id}>
                    <td>{item.ten}</td>
                    <td >{item.san_pham_ten}</td>
                    <td >{item.dung_luong_ten}</td>
                    <td >{item.mau_sac_ten}</td>
                    <td>{item.so_luong}</td>
                    <td >{item.gia}</td>
                    <td >{item.phan_tram_giam}%</td>
                    <td >{item.gia_khuyen_mai}</td>
                    <td>
                        <button className='btn btn-success ' type='button' style={{}} onClick={() => {
                            dispatch(setiddungluong(item.dung_luong_id));
                            dispatch(setidmausac(item.mau_sac_id));
                            dispatch(setsoluong(item.so_luong));
                            dispatch(setgiatien(item.gia));
                            dispatch(setname(item.ten));
                            dispatch(setphantramgiam(item.phan_tram_giam));
                            dispatch(setgiakhuyenmai(item.gia_khuyen_mai));
                            const getAPI = async () => {
                                try {
                                    const response = await axios.post(`${apiUrl}/hinhanh/laydanhsach`, {
                                        san_pham_id: item.san_pham_id,
                                        mau_sac_id: item.mau_sac_id
                                    });
                                    dispatch(setanhctsp(response.data.ten));
                                    setSelectedFile(`${apiUrl_anh}/` + response.data.ten)
                                    setshowSelectedOption(true);
                                } catch (error) {
                                    console.error('Error fetching data:', error);
                                }
                            };
                            getAPI();
                            dispatch(openpopupeditproductdetail())
                        }}><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => {
                            setDisableprice(!disabledprice);
                            console.log(item.dung_luong_id);
                            dispatch(setiddungluong(item.dung_luong_id));
                            dispatch(setidmausac(item.mau_sac_id));
                            dispatch(setsoluong(0));
                            dispatch(setgiatien(item.gia));
                            setShowselectedfile(false);
                            setShowprice(false);
                            const getAPI = async () => {
                                try {
                                    const response = await axios.post(`${apiUrl}/hinhanh/laydanhsach`, {
                                        san_pham_id: item.san_pham_id,
                                        mau_sac_id: item.mau_sac_id
                                    });
                                    dispatch(setanhctsp(response.data.ten));
                                    setSelectedFile(`${apiUrl_anh}/` + response.data.ten)
                                    setshowSelectedOption(true);
                                } catch (error) {
                                    console.error('Error fetching data:', error);
                                }
                            };

                            getAPI();
                        }} type='button' className='btn btn-success' style={{ marginRight: '2%' }}><FontAwesomeIcon icon={faPlus} /></button>
                        <button type='button' className="btn btn-danger" onClick={() => {
                            const Delete = async (id) => {
                                var response = await axios.post(`${apiUrl}/nhaphang/xoaproductdetail`,{
                                    'san_pham_id' : item.san_pham_id,
                                    'mau_sac_id' : item.mau_sac_id,
                                    'dung_luong_id' : item.dung_luong_id
                                });
                                if(response.data.success){
                                    dispatch(delproductdetail(response.data.data));
                                    dispatch(setsuccess(true));

                                }
                                
                            };
                            Delete();
                        }}><FontAwesomeIcon icon={faDeleteLeft} /></button>
                    </td>
                </tr>
            );
        });
    }
    const [product, setProduct] = useState([]);
    const [anh, setAnh] = useState(null)
    useEffect(() => {
        const getAPI = async () => {
            dispatch(loadingmodal(true));
            try {
                const response = await axios.get(`${apiUrl}/ctsp/ctsp-admin/${id}`);
                const product = await axios.get(`${apiUrl}/product/product/${id}`);
                setInputValue(product.data.data.ten);
                setTrangthaiid(product.data.data.trang_thai_id);
                setTenNCC(product.data.data.nha_cung_cap_id);
                setLoaiSP(product.data.data.loai_san_pham_id)
                dispatch(setproductdetail(response.data.data));
                dispatch(setmota(product.data.data.mo_ta));
                dispatch(setiddungluong(null));
                dispatch(setidmausac(null));
                dispatch(setsoluong(0));
                dispatch(setgiatien(0));
                setProduct(product.data.data);
                setAnh(product.data.hinhanhsanpham);
                setshowSelectedOption(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            dispatch(loadingmodal(false));
        };
        getAPI();

    }, [id])
    const [formedit, setFormedit] = useState([]);
    // const handleeditsanpham = () => {
    //     console.log('check data edit', formedit);
    //     const getAPI = async () => {
    //         try {
    //             const response = await axios.post(`${apiUrl}/hinhanh/laydanhsach`, {
    //                 san_pham_id: item.san_pham_id,
    //                 mau_sac_id: item.mau_sac_id
    //             });
    //             dispatch(setanhctsp(response.data.ten));
    //             setSelectedFile('${apiUrl_anh}/' + response.data.ten)
    //             setshowSelectedOption(true);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     getAPI();
    // }

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        // setSelectedOption('');
        // dispatch(setId(null)); // Example dispatch, ensure these are correctly defined
        // dispatch(setIdsupplier(null));
        // dispatch(setIdloaisanpham(null));
        // dispatch(setIdtrangthai(null));
        // dispatch(setproductdetail(null));
        // dispatch(setiddungluong(null));
        // dispatch(setidmausac(null));
        // dispatch(setanhctsp(null));
        // dispatch(setsoluong(0));
        // dispatch(setgiatien(0));
        // setShowDropdown(true);
        // setSelectedFile(null)
        // // setDisableprice(true);
        // dispatch(setname(''));
    };
    const handleOptionClick = (option) => {
        dispatch(setId(option.id)); // Example dispatch, ensure these are correctly defined
        dispatch(setIdsupplier(option.nha_cung_cap_id));
        dispatch(setIdloaisanpham(option.loai_san_pham_id));
        dispatch(setIdtrangthai(option.trang_thai_id));
        dispatch(setname(option.ten))
        // setDisableprice(false);
        // setSelectedOption(option.id);
        setInputValue(option.ten);
        setShowDropdown(false);

        const getAPI = async () => {
            try {
                const response = await axios.get(`${apiUrl}/ctsp/ctsp-admin/${id}`);
                dispatch(setproductdetail(response.data.data));
                setshowSelectedOption(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getAPI();
    };
    let filteredOptions = [];
    if (options != []) {
        filteredOptions = options.filter(option =>
            option.ten.toLowerCase().includes(inputValue.toLowerCase())
        );
    }


    const handleRemoveImage = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };
    const [editproduct, setEditproduct] = useState(true);
    const handleedit = () => {
        console.log(
            'id', id,
            'ten', inputValue,
            'nha_cung_cap_id', parseInt(tenncc),
            'loai_san_pham_id', parseInt(addloaisp),
            'trang_thai_id', parseInt(trangthaiid),
            'mo_ta', mota,
            'requestSelectedFiles', requestSelectedFiles,
        )

        const formData = new FormData();
        formData.append('id', id);
        formData.append('ten', inputValue);
        formData.append('nha_cung_cap_id', parseInt(tenncc));
        formData.append('loai_san_pham_id', parseInt(addloaisp));
        formData.append('trang_thai_id', parseInt(trangthaiid));
        formData.append('mo_ta', mota);

        requestSelectedFiles.forEach((file, index) => {
            formData.append(`photos[${index}]`, file);
        });
        console.log('check nefdkakak: ', formData)
        const getAPI = async () => {
            try {
                dispatch(loadingmodal(true));
                const response = await axios.post(`${apiUrl}/nhaphang/capnhatproduct`,
                    formData
                    , {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Set Content-Type là multipart/form-data
                        },
                    });
                if (response.data.success) {
                    console.log('check è', response.data.files);
                    alert('done');
                    dispatch(loadingmodal(false));
                    window.location.reload();
                }
                else {
                    console.log('check è', response.data.message);

                }
                // dispatch(setanhctsp(response.data.ten));
                // setSelectedFile('${apiUrl_anh}/' + response.data.ten)
                // setshowSelectedOption(true);
                dispatch(loadingmodal(false));
            } catch {

            }
        }
        getAPI();
    }
    useEffect(() => {
        dispatch(setgiakhuyenmai(((100 - phantramgiam) * gia) / 100));
    }, [phantramgiam, gia])
    return (
        <>
            {/* check={props.check} logoutadmin={props.logoutadmin} */}
            <HeaderAdmin />
            <div className="container-fluid">
                <div style={{ height: '38rem' }} className="row">
                    <TaskbarAdmin />
                    <main style={{ width: '84%', overflow: 'scroll' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">cập nhật Sản Phẩm</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                </div>
                            </div>
                        </div>


                        <PopupAddMauSac isOpen={modalIsOpenMS} onthemmoiMS={themmoiMauSac} onRequestClose={closeModalMS} />
                        <PopupAddNCC isOpen={modalIsOpenNCC} onthemmoincc={themmoiNCC} onRequestClose={closeModalNCC} />
                        <PopupAddtrangthai isOpen={modalIsOpentrangthai} onthemmoincc={themmoitrangthai} onRequestClose={closeModaltrangthai} />
                        <PopupAddLSP isOpen={modalIsOpenLSP} onthemmoi={themmoiLSP} onRequestClose={closeModalLSP} />
                        <PopupAddDL isOpen={modalIsOpenDL} onthemmoidl={themmoiDL} onRequestClose={closeModalDL} />
                        <form onSubmit={themmoinhaphang} style={{ width: '100%', maxWidth: '100%' }} className="row" >
                            <div className="col-12">
                                <div className="add_sp-ctsp">
                                    <div className="add_sp">
                                        <div style={{ border: 'solid 1px #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '15px', boxShadow: '5px 5px 5px #ccc' }}>
                                            <h3>Thông tin chung </h3><button type='button' className='btn btn-success' onClick={() => { setEditproduct(!editproduct); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <form style={editproduct ? { opacity: '0.5', height: '22rem', overflow: 'scroll', maxWidth: '100%' } : { maxWidth: '100%' }}>
                                                <div className="row">
                                                    <div style={{ width: '50%' }}>
                                                        <div>Tên Sản Phẩm</div>
                                                        <input
                                                            disabled={editproduct}
                                                            type="text"
                                                            placeholder="Nhập hoặc chọn..."
                                                            value={editproduct ? product.ten : inputValue}
                                                            onChange={handleInputChange}
                                                            style={{ marginTop: '0' }}
                                                            required
                                                        />
                                                        {showDropdown && inputValue && (
                                                            <ul className="dropdown" style={{ border: '1px solid #ccc', listStyleType: 'none', padding: '0' }}>
                                                                {filteredOptions.map((option, index) => (
                                                                    <li key={index} style={{ borderBottom: '1px solid #ccc', cursor: 'pointer' }} onClick={() => handleOptionClick(option)}>{option.ten}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {showselectedOption && <p> {nameproduct}</p>}
                                                    </div>
                                                    {/* <InputDropdown /> */}
                                                    {/* <div class="col-md-6">
                                                    <label for="Ten" className=""> trạng thái sản phẩm</label>
                                                    <select className="form-select" style={{ marginTop: '1em' }} onChange={(e) => { setTenNCC(e.target.value) }} required>
                                                        <option selected="" className="form-control">Trạng thái sản phẩm</option>
                                                        {listtrangthai}
                                                    </select>
                                                    <button className='btn btn-outline-danger' type='button' style={{}} onClick={openModaltrangthai}>Thêm nhanh</button>

                                                </div> */}
                                                    <div style={{ marginBottom: '1rem', width: '50%' }}>
                                                        <label for="">Trạng thái sản phẩm</label>
                                                        <div style={{ display: 'flex' }}>
                                                            <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                                <div className="col-md-12">
                                                                    <select className="form-select" disabled={editproduct} style={{}} value={editproduct ? product.trang_thai_id : trangthaiid} onChange={(e) => { setTrangthaiid(e.target.value); dispatch(setIdtrangthai(e.target.value)) }} required>
                                                                        <option selected="" className="form-control">Trạng thái sản phẩm</option>
                                                                        {listtrangthai}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            {/* <div className="container"> */}

                                                            <button disabled={editproduct} className='btn btn-outline-danger' type='button' style={{}} onClick={openModaltrangthai}><FontAwesomeIcon icon={faPlus} /></button>
                                                            {/* </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '1em', display: 'flex' }}>
                                                    <div style={{ width: '29%', marginRight: '2%' }}>
                                                        <div style={{ marginBottom: '1rem' }}>
                                                            <label for="">Nhà cung cấp</label>
                                                            <div style={{ display: 'flex' }}>
                                                                <div className="row" style={{ width: '100%', marginRight: '2%' }}>
                                                                    <div className="col-md-12">
                                                                        <select className="form-select" disabled={editproduct} value={editproduct ? product.nha_cung_cap_id : tenncc} onChange={(e) => { setTenNCC(e.target.value); dispatch(setIdsupplier(e.target.value)) }} required>
                                                                            <option selected="" className="form-control">Nhà Cung Cấp</option>
                                                                            {listnhacungcap}
                                                                        </select>
                                                                    </div>

                                                                </div>
                                                                {/* <div className="container"> */}

                                                                <button disabled={editproduct} className='btn btn-outline-danger' type='button' style={{}} onClick={openModalNCC}><FontAwesomeIcon icon={faPlus} /></button>
                                                                {/* </div> */}
                                                            </div>
                                                        </div>

                                                        <div style={{ marginBottom: '1rem' }}>
                                                            <label for="">Loại sản phẩm</label>
                                                            <div style={{ display: 'flex' }}>
                                                                <div className="row" style={{ width: '100%', marginRight: '2%' }}>
                                                                    <div className="col-md-12">

                                                                        <select className="form-select" disabled={editproduct} value={editproduct ? product.loai_san_pham_id : addloaisp} onChange={(e) => { setLoaiSP(e.target.value); dispatch(setIdloaisanpham(e.target.value)) }} required>
                                                                            <option selected="" className="form-control">Loại Sản Phẩm</option>
                                                                            {listloaisanpham}
                                                                        </select>

                                                                    </div>
                                                                </div>

                                                                <button disabled={editproduct} className='btn btn-outline-danger' type='button' onClick={openModalLSP}><FontAwesomeIcon icon={faPlus} /></button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '70%' }}>
                                                        <div>
                                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                                <div class="col-md-12">
                                                                    <label for="Ten" className="">Mô Tả Sản Phẩm </label>
                                                                    <EditorComponent disabled={editproduct} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="mb-4" style={{ marginBottom: '5rem' }}>
                                                        {anh != null && (
                                                            <div style={{ marginTop: '3%' }}>
                                                                {
                                                                    anh.map((file, index) => (
                                                                        <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                                                                            <img src={`${apiUrl_anh}/` + file.URL_anh} alt={`Ảnh đã chọn ${index}`} style={{ width: '200px', marginBottom: '10px' }} />
                                                                        </div>
                                                                    ))

                                                                }

                                                            </div>
                                                        )}
                                                        {!editproduct && (
                                                            <>
                                                                {/* <label for="formFile" class="form-label">Chọn ảnh Đại diện của sản phẩm</label> */}
                                                                <div >
                                                                    <input class="form-control" style={{ width: '50%', height: 'max-content', margin: '0 auto' }} type="file" id="formFile" multiple onChange={(e) => {
                                                                        // const file = e.target.files[0];
                                                                        // if (file) {
                                                                        //     const reader = new FileReader();
                                                                        //     reader.onloadend = () => {
                                                                        //         setSelectedFile(reader.result); // Lưu đường dẫn của ảnh vào state
                                                                        //     };
                                                                        //     reader.readAsDataURL(file); // Đọc và chuyển đổi file thành URL dạng base64
                                                                        // }
                                                                        const files = Array.from(e.target.files);
                                                                        const hasWebpFile = files.some(file => {
                                                                            const extension = file.name.split('.').pop().toLowerCase();
                                                                            return extension === 'webp';
                                                                        });

                                                                        // Nếu có file có đuôi .webp, cảnh báo người dùng
                                                                        if (hasWebpFile) {
                                                                            alert('Không được chọn file có đuôi .webp');
                                                                            e.target.value = '';
                                                                        }
                                                                        else {
                                                                            setRequestSelectedFiles(Array.from(e.target.files, file => ({ file: file })));
                                                                            // Duyệt qua từng file để đọc và lưu vào state
                                                                            files.forEach(file => {
                                                                                const reader = new FileReader();
                                                                                reader.onloadend = () => {
                                                                                    setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, reader.result]);
                                                                                };
                                                                                reader.readAsDataURL(file); // Đọc và chuyển đổi file thành URL dạng base64
                                                                            });
                                                                        }

                                                                    }} />
                                                                    {selectedFiles != null && (
                                                                        <div style={{ marginTop: '3%' }}>
                                                                            {!editproduct && (

                                                                                selectedFiles.map((file, index) => (
                                                                                    <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                                                                                        <img src={file} alt={`Ảnh đãss chọn ${index}`} style={{ width: '200px', height: '200px', marginBottom: '10px' }} />
                                                                                    </div>
                                                                                ))

                                                                            )}

                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}

                                                    </div>
                                                    {/* <img src={}/> */}
                                                </div>
                                                {!editproduct && (
                                                    //     } catch (error) {
                                                    //         console.error('Error fetching data:', error);
                                                    //     }
                                                    <button type='button' onClick={handleedit} className='btn btn-success'>sửa </button>
                                                )}

                                            </form>


                                        </div>
                                        <div style={{ border: 'solid 1px #ccc', padding: '1rem', borderRadius: '15px', marginBottom: '1rem', boxShadow: '5px 5px 5px #ccc' }}>
                                            <h3>thông tin cấu hình </h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                <div style={{ marginBottom: '10px', width: '20%', }}>
                                                    <label for="">Dung Lượng</label>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                            <div className="col-md-12">
                                                                <select className="form-select" value={iddungluong} onChange={(e) => { setKichThuoc(e.target.value); setShowprice(true); dispatch(setiddungluong(e.target.value)) }} required>
                                                                    <option selected="" className="form-control">Dung Lượng</option>
                                                                    {listdungluong}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <button className='btn btn-outline-danger' type='button' onClick={openModalDL}>+</button>

                                                    </div>
                                                </div>

                                                <div style={{ marginBottom: '1rem', width: '20%' }}>
                                                    <label for="">Màu Sắc</label>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div className="row" style={{ width: '75%', marginRight: '2%' }}>
                                                            <div className="col-md-12">
                                                                <select className="form-select" value={idmausac} onChange={(e) => { setTenMauSac(e.target.value); setShowprice(true); setShowselectedfile(true); setSelectedFile(''); dispatch(setidmausac(e.target.value)) }} required>
                                                                    <option selected="" className="form-control">Màu Sắc</option>
                                                                    {listmausac}
                                                                </select>
                                                            </div>
                                                        </div>


                                                        <button className='btn btn-outline-danger ' type='button' style={{}} onClick={openModalMS}>+</button>

                                                    </div>
                                                </div>


                                                <div className="" style={{ marginBottom: '1rem', width: '20%' }}>
                                                    {/* <div class="col-md-3" > */}
                                                    <label for="Ten" className=" "> Số lượng </label>
                                                    <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem' }} type="number" min={0} value={soluong} onChange={(e) => { dispatch(setsoluong(e.target.value)) }} required />
                                                    {/* </div> */}
                                                </div>
                                                {showprice && (
                                                    <>
                                                        <div className="" style={{ marginBottom: '1rem', width: '20%', height: '20px' }}>
                                                            {/* <div class="col-md-3"> */}
                                                            <label for="Ten" className=""> Giá Tiền </label>
                                                            <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem' }} type="number" min={0} value={gia} onChange={(e) => { dispatch(setgiatien(e.target.value)) }} required />
                                                            {/* </div> */}
                                                        </div>
                                                        <div className="" style={{ marginBottom: '1rem', width: '20%', height: '20px' }}>
                                                            {/* <div class="col-md-3"> */}
                                                            <label for="Ten" className="">giảm giá(%)</label>
                                                            <input style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem', width: '85%' }} type="number" min={0} max={100} value={phantramgiam} onChange={(e) => { dispatch(setphantramgiam(e.target.value)) }} required />
                                                            {/* </div> */}
                                                        </div>
                                                        <div className="" style={{ marginBottom: '1rem', width: '20%', height: '20px' }}>
                                                            {/* <div class="col-md-3"> */}
                                                            <label for="Ten" className=""> giá khuyến mãi </label>
                                                            <input disabled style={{ border: 'solid 1px #ccc', marginTop: '0', height: '2.5rem', width: '85%' }} type="number" min={0} max={100} value={giakhuyenmai} required />
                                                            {/* </div> */}
                                                        </div>
                                                    </>
                                                )}

                                                <button type='submit' style={{ marginTop: '18px', height: '3rem' }} onClick={() => {
                                                    setFormData({
                                                        'ten_san_pham': product.ten,
                                                        'mau_sac_id': parseInt(idmausac),
                                                        'dung_luong_id': parseInt(iddungluong),
                                                        'trang_thai_id': parseInt(idtrangthai),
                                                        'user_id': user.id,
                                                        'nha_cung_cap_id': parseInt(idsupplier),
                                                        'loai_san_pham_id': parseInt(idloaisanpham),
                                                        'mo_ta': mota,
                                                        'so_luong': parseInt(soluong),
                                                        'gia': parseInt(gia),
                                                        'phan_tram_giam': parseInt(phantramgiam),
                                                        'gia_khuyen_mai': parseInt(giakhuyenmai),
                                                        'ghi_chu': ghichu,
                                                        'requestSelectedFiles': requestSelectedFiles,
                                                        'requestSelectedFile': requestSelectedFile
                                                    })
                                                }} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>

                                            {showselectedfile && (
                                                <>
                                                    <p style={{ marginTop: '3%' }}>chọn ảnh đại diện sản phẩm</p>
                                                    <input class="form-control" style={{ width: '50%', height: 'max-content', margin: '0 auto' }} type="file" id="formFile" onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const extension = file.name.split('.').pop().toLowerCase();
                                                            if (extension === 'webp') {
                                                                alert('Không được chọn file có đuôi .webp');
                                                                e.target.value = ''; // Xóa lựa chọn file
                                                                return;
                                                            }
                                                            else {
                                                                setRequestSelectedFile(e.target.files[0]);

                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        setSelectedFile(reader.result); // Lưu đường dẫn của ảnh vào state
                                                                    };
                                                                    reader.readAsDataURL(file); // Đọc và chuyển đổi file thành URL dạng base64
                                                                }
                                                            }
                                                            // Xử lý tiếp khi file hợp lệ
                                                        }
                                                    }} required />
                                                </>

                                            )}

                                            {selectedFile && (
                                                <div style={{ margin: '3%' }}>
                                                    <img src={selectedFile} alt="Ảnh đã chọn" style={{ width: '200px', height: '200px' }} />
                                                </div>
                                            )}
                                            {/* {!selectedFile && (
                                                <div style={{ margin: '3%' }}>
                                                    <img src={anhctsp} alt="Ảnh đã chọn" style={{ width: '200px' }} />
                                                </div>
                                            )} */}

                                            <div className="row" style={{ marginBottom: '10px' }}>
                                                <div class="col-md-12">
                                                    <label for="Ten" className="form-label "> Ghi chú <button onClick={() => { setBtnGhiChu(!btnghichu); }} type='button' className='btn btn-outline-dark'><FontAwesomeIcon icon={faCircleChevronDown} /></button></label>
                                                    {btnghichu && (
                                                        <textarea style={{ border: 'solid 1px #ccc' }} id="w3review" name="w3review" rows="4" cols="60" onChange={(e) => { setGhiChu(e.target.value) }}></textarea>
                                                    )}
                                                </div>
                                            </div>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Tên chi tiết sản phẩm</th>
                                                        <th scope="col">Tên sản phẩm</th>
                                                        <th scope="col">Dung lượng</th>
                                                        <th scope="col">Màu sắc</th>
                                                        <th scope="col">Số lượng</th>
                                                        <th scope="col">Giá tiền</th>
                                                        <th scope="col">Giảm</th>
                                                        <th scope="col">Giá khuyến mãi</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listCTSP}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div></div>
                        </form>
                    </main>
                </div>
            </div>



        </>
    )

}


