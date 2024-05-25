import { Link } from "react-router-dom";
import styles from './formsignup.module.css'
export default function FormSignUp() {
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
                <input type='text'  placeholder='Full Name'
                    // value={inputFullName}
                    // onChange={(e) => {
                    //     setInputFullName(e.target.value)
                    // }}
                />
                {/* {isShowWarning(isValidFullName, isTouchFullName) ? alertMessage("Please enter your full name!") : <></>} */}
                <input type='email' placeholder='Email'
                    // value={inputEmail}
                    // onChange={(e) => {
                    //     setInputEmail(e.target.value)
                    // }}
                />
                {/* {isShowWarning(isValidEmail, isTouchEmail) ? alertMessage("Please enter your email! (abc@gmail.com)") : <></>} */}
                <input type='password'  placeholder='Password'
                    // value={inputPassword}
                    // onChange={(e) => {
                    //     setInputPassword(e.target.value)
                    // }}
                />
                {/* {isShowWarning(isValidPassword, isTouchPassword) ? alertMessage("Please enter password at least 8 character!") : <></>} */}
                <input type='phone' placeholder='Phone'
                    // value={inputPhoneNumber}
                    // onChange={(e) => {
                    //     setInputPhoneNumber(e.target.value)
                    // }}
                    // onBlur={onTouchedPhoneNumber}
                />
                {/* {isShowWarning(isValidPhoneNumber, isTouchPhoneNumber) ? alertMessage("Please enter your phone number!") : <></>} */}
                <button className={`${styles['sign-up_btn']} h-100`}>Sign Up</button>
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