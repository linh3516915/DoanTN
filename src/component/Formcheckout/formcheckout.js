import { Link } from "react-router-dom";
import styles from './formcheckout.module.css'
import { useEffect, useState } from "react";
import Address from "../Address/address";
import { useDispatch, useSelector } from "react-redux";
import { openpopuplogin, openpopupotp, setcheckbox, setdatacheckout } from "../../redux/slice/popupSlice";
import OTP from "../OTP/otp";
import { match } from "../../redux/slice/addressSlice";
import axios from "axios";
import { getemail } from "../../redux/slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/ảnh/11trang.jpg";
export default function FormCheckout() {
    const [inputFullName, setInputFullName] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [chooseTime, setChoosetime] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const auth = useSelector(state => state.auth.authentication);
    const isAdmin = useSelector(state => state.auth.isAdmin);

    const items = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);
    const address = useSelector(state => state.address.Address);
    const popupsignup = useSelector(state => state.popup.btnPopupOTP);
    const emailpersit = useSelector(state => state.auth.email);
    const checkbox = useSelector(state => state.popup.checkbox);
    const pro = useSelector(state => state.address.province);
    const dic = useSelector(state => state.address.district);
    const wa = useSelector(state => state.address.ward);
    const totalprice = useSelector(state => state.cart.totalPrice);
    const totalcoupon = useSelector(state => state.cart.totalCoupon);
    const street = useSelector(state => state.address.street);
    const [gio, setGio] = useState(currentTime.getHours() + 7);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(match());
        if (user == {}) {
            dispatch(setdatacheckout({
                users_id: 0,
                name: inputFullName,
                phone: inputPhoneNumber,
                email: inputEmail,
                password: inputPassword,
                address: address,
                data: items,
                tong_tien: totalprice,
                giam_gia: totalprice - totalcoupon,
                gia_khuyen_mai: totalcoupon,
                time: 'trước ' + gio.toString().padStart(2, '0') + 'h ngày ' + currentTime.toLocaleDateString(),
                btncheckout: true
            }));
        }
        else {
            dispatch(setdatacheckout({
                users_id: user.id,
                name: inputFullName,
                phone: inputPhoneNumber,
                email: inputEmail,
                password: inputPassword,
                address: address,
                data: items,
                tong_tien: totalprice,
                giam_gia: totalprice - totalcoupon,
                gia_khuyen_mai: totalcoupon,
                time: 'trước ' + gio.toString().padStart(2, '0') + 'h ngày ' + currentTime.toLocaleDateString(),
                btncheckout: true
            }));
        }
    }, [inputFullName, inputPhoneNumber, inputEmail, inputPassword, inputRePassword, pro, wa, dic, street, currentTime, gio])
    // useEffect(() => {
    //         setCurrentTime(new Date());
    // }, [currentTime]);
    const listcart = items.map((item, index) => {
        return (
            <>
                <div style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '2%' }}>
                    <h5 style={{ textAlign: 'start', fontStyle: 'italic' }}> giao Lần thứ {index + 1}</h5>
                    <div style={{ display: 'flex' }}>
                        <img className={`${styles['img-ship']}`} style={{ }} src={item.img} />
                        <div>
                            <p style={{ fontSize: '84%' }}>{item.product.ten}</p>
                            <p style={{ fontSize: '84%' }}> giá : {item.product.gia}</p>
                        </div>
                    </div>
                </div>

            </>
        )
    })
    let [datatest, setDatatest] = useState([]);
    let renderHour = [];
    const handlesetday = (e) => {

        if (e.target.value == 0) {
            const newday = new Date();
            newday.setDate(newday.getDate() + 0);
            const hours = newday.getHours().toString().padStart(2, '0');
            datatest.splice(0, datatest.length);
            if (parseInt(hours) + 7 < 21) {
                for (let i = 0; i < 21 - (parseInt(hours) + 7); i++) {
                    datatest.push({
                        'hour': parseInt(hours) + 7 + i
                    });
                }
            }
            else {
                for (let i = 12; i < 21; i++) {
                    datatest.push({
                        'hour': i
                    });
                }
            }

            setGio(datatest[0].hour);
            setCurrentTime(newday);
        }
        else if (e.target.value == 1) {
            const tomorow = new Date();
            tomorow.setDate(tomorow.getDate() + 1);
            datatest.splice(0, datatest.length);
            for (let i = 12; i < 21; i++) {
                datatest.push({
                    'hour': i
                });
            }
            setGio(datatest[0].hour);
            console.log(datatest);
            setCurrentTime(tomorow);
        }
        else if (e.target.value == 2) {
            const nexttomorow = new Date();
            nexttomorow.setDate(nexttomorow.getDate() + 2);
            datatest.splice(0, datatest.length);
            for (let i = 12; i < 21; i++) {
                datatest.push({
                    'hour': i
                });
            }
            console.log(datatest);
            setGio(datatest[0].hour);
            setCurrentTime(nexttomorow);
        }
    }
    console.log(datatest);
    // useEffect(()=>{
    //     console.log('check',datatest);
    //      renderHour = datatest.map((item)=>{
    //         return (
    //             <>
    //                 <option value={item.hour} >trước {item.hour}h</option>
    //             </>
    //         )
    //     })
    // },[datatest])
    useEffect(() => {
        if (auth && !isAdmin) {
            setInputFullName(user.name);
            setInputPhoneNumber(user.so_dien_thoai);
            setInputEmail(user.email);
        }
    }, [user])
    return (
        <>

            {/* <div class="product-widget-area" style={{ backgroundColor: '#fff' }} >
                <div class="container">
                    <div class="row" style={{ justifyContent: 'center' }}>
                        <div className={`container w-fit-content ${styles['sign-up']}`}> */}
            <h3 className={`${styles['title']}`}>Check Out</h3>
            {/* <form
                                onSubmit={
                                    SignIn
                                } */}
            {/* className={` d-flex flex-column ${styles['sign-up-form']}`}> */}
            <input type='text' placeholder='Họ và tên' required
                // pattern="^[a-zA-Z]+$"
                value={inputFullName}
                onChange={(e) => {
                    setInputFullName(e.target.value)
                }}
            />
            {/* {isShowWarning(isValidFullName, isTouchFullName) ? alertMessage("Please enter your full name!") : <></>} */}

            <input type='email' placeholder='Email'
                value={inputEmail}
                onChange={(e) => {
                    setInputEmail(e.target.value)
                }}
                required
            />
            {!auth && !isAdmin && (
                <>
                    <input type='password' placeholder='Password' required
                        value={inputPassword}
                        onChange={(e) => {
                            setInputPassword(e.target.value)
                        }}
                    />
                    <input type='password' placeholder='Re-Password' required
                        value={inputRePassword}
                        onChange={(e) => {
                            setInputRePassword(e.target.value)
                        }}
                    />
                </>
            )}


            {/* {isShowWarning(isValidPassword, isTouchPassword) ? alertMessage("Please enter password at least 8 character!") : <></>} */}
            <input style={{ marginBottom: '2%' }} type='number' placeholder='Số điện thoại' required
                value={inputPhoneNumber}
                onChange={(e) => {
                    setInputPhoneNumber(e.target.value)
                }}
            />

            {/* {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter your phone number!") : <></>} */}
            <Address />
            <div className={`${styles['shiptime']}`}>
                <h3>Thông Tin Giao Hàng </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: '400', fontSize: '18px', margin: '0' }}>Giao vào trước {gio}h ngày {currentTime.toLocaleDateString()}</p>
                    <button onClick={() => { setChoosetime(!chooseTime) }} type='button' className="btn btn-outline-primary">chọn giờ và ngày <FontAwesomeIcon icon={faList} /></button>
                </div>
                {chooseTime && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <select onChange={handlesetday} class="form-select form-select-sm mb-3" style={{ width: '47%' }} id="district" aria-label=".form-select-sm" >
                            {/* <option value={0} >hôm nay</option> */}
                            <option value={1} >ngày mai</option>
                            <option value={2} >ngày mốt</option>
                        </select>
                        <select class="form-select form-select-sm mb-3" onChange={(e) => { setGio(e.target.value) }} style={{ width: '47%' }} id="district" aria-label=".form-select-sm" >
                            {
                                datatest.map((item) => {
                                    return (
                                        <>
                                            <option value={item.hour} >trước {item.hour}h</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                )}
                <div>
                    {listcart}
                </div>
            </div>
        </>
    )
}