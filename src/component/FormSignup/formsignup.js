import { Link } from "react-router-dom";
import styles from './formsignup.module.css'
import { useState } from "react";
import Address from "../Address/address";
import { useDispatch, useSelector } from "react-redux";
import { openpopuplogin, openpopupotp } from "../../redux/slice/popupSlice";
import OTP from "../OTP/otp";
import { match } from "../../redux/slice/addressSlice";
import axios from "axios";
export default function FormSignUp() {
    const [inputFullName, setInputFullName] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [checkbox, setCheckbox] = useState(false);
    const address = useSelector(state => state.address.Address);
    const dispatch = useDispatch();
    const SignIn = (event) => {
        event.preventDefault();
        const getAPI = async () => {
            const response = await axios.post('http://127.0.0.1:8000/api/account/checkemail', {
               email : inputEmail
            })
            if (response.data.success === true) {
                dispatch(openpopupotp(formdata));
            }
            else {
                alert('email đã tồn tại');
            }
        }
        getAPI();
    }
    console.log(checkbox);
    return (
        <>

            <div class="product-widget-area" style={{ backgroundColor: '#fff' }} >
                <div class="container">
                    <div class="row" style={{ justifyContent: 'center' }}>
                        <div className={`container w-fit-content ${styles['sign-up']}`}>
                            <h3 className={`${styles['title']}`}>Sign Up</h3>
                            <form
                                onSubmit={
                                    SignIn
                                }
                                className={` d-flex flex-column ${styles['sign-up-form']}`}>
                                <input type='text' placeholder='Full Name' required
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
                                {/* {isShowWarning(isValidEmail, isTouchEmail) ? alertMessage("Please enter your email! (abc@gmail.com)") : <></>} */}
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
                                {/* {isShowWarning(isValidPassword, isTouchPassword) ? alertMessage("Please enter password at least 8 character!") : <></>} */}
                                <input type='nuber' placeholder='Phone' required
                                    value={inputPhoneNumber}
                                    onChange={(e) => {
                                        setInputPhoneNumber(e.target.value)
                                    }}
                                />

                                {/* {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter your phone number!") : <></>} */}
                                <Address />
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <input type='checkbox' checked={checkbox} onChange={() => {
                                        setCheckbox(!checkbox);
                                    }} required style={{ cursor: 'pointer', width: '22px', marginTop: '0' }} /><label style={{ fontSize: '10px' }}>tôi đồng ý đến các thông tin này đều chính xác</label>
                                </div>
                                <button onClick={() => {
                                    dispatch(match());
                                    setFormdata({
                                        name: inputFullName,
                                        phone: inputPhoneNumber,
                                        email: inputEmail,
                                        address: address,
                                        password: inputPassword,
                                        btnsignup: checkbox
                                    });
                                }} disabled={!checkbox} className={`${checkbox ? styles['sign-up_btn'] : styles['sign-up_disible']} h-100`}>Sign Up</button>
                            </form>
                            <div className={`${styles['sign-in-link']} text-center mt-5 opacity-75  font-italic`}>
                                <span className='opacity-50'>Login?</span>
                                <div onClick={() => {
                                    dispatch(openpopuplogin());
                                }} className='text-decoration-none ms-1' style={{ cursor: 'pointer' }}>
                                    Click
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}