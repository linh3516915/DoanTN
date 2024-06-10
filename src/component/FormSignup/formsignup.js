import { Link } from "react-router-dom";
import styles from './formsignup.module.css'
import { useState } from "react";
import Address from "../Address/address";
export default function FormSignUp() {
    const [inputFullName, setInputFullName] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [address, setAdress] = useState('');
    const SignIn = () => {

    }
    return (
        <>
            <div className={`container w-fit-content ${styles['sign-up']}`}>
                <h3 className={`${styles['title']}`}>Sign Up</h3>
                <form
                    // onSubmit={isValidSubmit ? onSubmitSignup : (e) => {
                    //     e.preventDefault();
                    //     onTouchedEmail(true);
                    //     onTouchedFullName(true);
                    //     onTouchedPassword(true);
                    //     onTouchedPhoneNumber(true);
                    // }} 
                    className={` d-flex flex-column ${styles['sign-up-form']}`}>
                    <input type='text' placeholder='Full Name' required 
                        pattern="^[a-zA-Z]+$"
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
                    {/* {isShowWarning(isValidPassword, isTouchPassword) ? alertMessage("Please enter password at least 8 character!") : <></>} */}
                    <input type='nuber' placeholder='Phone' required
                        value={inputPhoneNumber}
                        onChange={(e) => {
                            setInputPhoneNumber(e.target.value)
                        }}
                    />
                    
                    {/* {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter your phone number!") : <></>} */}
                    <Address/>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <input type='checkbox' required style={{ cursor: 'pointer', width: '22px', marginTop: '0' }} /><label style={{ fontSize: '10px' }}>tôi đồng ý đến các thông tin này đều chính xác</label>

                    </div>

                    <button onClick={() => { SignIn() }} className={`${styles['sign-up_btn']} h-100`}>Sign Up</button>
                </form>
                <div className={`${styles['sign-in-link']} text-center mt-5 opacity-75  font-italic`}>
                    <span className='opacity-50'>Login?</span>
                    <Link to="/login" className='text-decoration-none ms-1'>
                        Click
                    </Link>
                </div>
            </div>
        </>
    )
}