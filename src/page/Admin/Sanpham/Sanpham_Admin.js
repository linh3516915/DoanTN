
import { useEffect, useState } from "react";
import Header_Admin from "../../../layout/Admin/Header/Header";
import Sanpham from "../../../component/Admin/Sanpham/Sanpham";
import TaskbarAdmin from "../../../layout/Admin/Taskbar/taskbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { apiUrl } from "../../../api/api";


export default function SanPhamAdmin(props){
    const [dssp, SetDSSP] = useState([]);

    useEffect(() => {
        async function setsp() {
            var response = await fetch(`${apiUrl}/sanpham/sanpham-admin`);
            var json = await response.json();
            SetDSSP(json.data)
        }
        setsp();

    }, [])
    const [inputValue, setInputValue] = useState('');
    // const InputDropdown = () => {


    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showselectedOption, setshowSelectedOption] = useState(false);

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
        // setDisableprice(true);
        // dispatch(setname(''));
    };
    // const handleOptionClick = (option) => {
    //     dispatch(setId(option.id)); // Example dispatch, ensure these are correctly defined
    //     dispatch(setIdsupplier(option.nha_cung_cap_id));
    //     dispatch(setIdloaisanpham(option.loai_san_pham_id));
    //     dispatch(setIdtrangthai(option.trang_thai_id));
    //     dispatch(setname(option.ten))
    //     // setDisableprice(false);
    //     // setSelectedOption(option.id);
    //     setInputValue(option.ten);
    //     setShowDropdown(false);

    //     const getAPI = async () => {
    //         try {
    //             const response = await axios.get(`${apiUrl}/ctsp/ctsp-admin/${option.id}`);
    //             dispatch(setproductdetail(response.data.data));
    //             setshowSelectedOption(true);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     getAPI();
    // };
    let filteredOptions = [];
    if (dssp != []) {
        filteredOptions = dssp.filter(option =>
            option.ten.toLowerCase().includes(inputValue.toLowerCase())
        );
    }
    const listsanpham = dssp.map(function (item) {
        return (
            <Sanpham data={item} />
        );
    });


    return (
        <>
            <Header_Admin />
            <div className="container-fluid">
                <div style={{height: '38rem'}} className="row">
                   <TaskbarAdmin />
                    <main style={{width:'84%' , overflow : 'scroll'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">DANH SÁCH SẢN PHẨM</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <a href="/nhaphang" class="btn btn-sm btn-outline-secondary">Thêm Mới</a>
                                </div>

                            </div>
                        </div>
                        <div style={{ width: '100%' }}>
                            <FontAwesomeIcon icon={faSearch} style={{width : '5%'}}/>
                            <input
                                type="text"
                                placeholder="Nhập hoặc chọn..."
                                value={inputValue}
                                onChange={handleInputChange}
                                style={{ marginTop: '0' }}
                            />
                            {/* {showDropdown && inputValue && (
                                <ul className="dropdown" style={{ border: '1px solid #ccc', listStyleType: 'none', padding: '0' }}>
                                    {filteredOptions.map((option, index) => (
                                        <li key={index} style={{ borderBottom: '1px solid #ccc', cursor: 'pointer' }} onClick={() => handleOptionClick(option)}>{option.ten}</li>
                                    ))}
                                </ul>
                            )}
                            {showselectedOption && <p> {nameproduct}</p>} */}
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Nhà cung cấp</th>
                                    <th scope="col">Loại sản phẩm</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {inputValue != '' && (
                                   <>
                                        {filteredOptions.map((option, index) => (
                                            <Sanpham data={option} />
                                        ))}
                                    </> 
                                )}
                                {inputValue == '' && (
                                    dssp.map(function (item) {
                                        return (
                                            <Sanpham data={item} />
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>



        </>
    )
}