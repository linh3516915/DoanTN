import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './formpay.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closepopupotp, closepopuppay, openpopuplogin } from '../../redux/slice/popupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { getemail } from '../../redux/slice/authSlice';
import iconmomo from '../../assets/icon/tải xuống (1).png'
export default function FormPay(props) {
    const { ref: refPopupOTP, inView: inViewPopupOTP } = useInView({
        threshold: 0 
      });
      const [btnconfirmcash,setBtnconfirmcash] = useState(false);
      const [btnconfirmmomo,setBtnconfirmomo] = useState(false);
      const btncash = () =>{
        setBtnconfirmcash(true);
        setBtnconfirmomo(false);
      }
      const btnmomo = () =>{
        setBtnconfirmcash(false);
        setBtnconfirmomo(true);
      }
    const dispatch = useDispatch();
    const confirm = (btnconfirmcash,btnconfirmmomo)=>{
        if(btnconfirmcash){
            
        }
        if(btnconfirmmomo){

        }
    }
    console.log(btnconfirmcash,btnconfirmmomo);
    return (
        <div ref={refPopupOTP} className={`${styles['otp-input']}  ${inViewPopupOTP ? 'animation-from-top' : ''}`} >
            <button className='btn btn-outline-danger' style={{ position: 'absolute', right: '1px', top: '1px' }} onClick={() => {
                dispatch(closepopuppay());
             }}><FontAwesomeIcon icon={faCircleXmark} /></button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'math', marginBottom: '0px' }}>Chọn Phương Thức Thanh Toán</h2>
            </div>
            
            <div style={{ textAlign: 'start',marginBottom: '5%' }}>
                <div>
                    <input type='radio' name='payment methods' onChange={()=>{btncash()}}/>
                    <FontAwesomeIcon style={{ marginLeft: '2%' }} icon={faMoneyBill} /> <label style={{ width: '95%;' }}>Cash</label>
                </div>
                <div>
                    <input type='radio' name='payment methods' onChange={()=>{btnmomo()}}/>
                    <label style={{ width: '84%;' }}><img style={{ width: '13%', marginLeft: '5%' }} src={iconmomo} /> Momo</label>
                </div>
            </div>
            <button onClick={() => {
                confirm(btnconfirmcash,btnconfirmmomo);

            }} disabled={(btnconfirmcash== false && btnconfirmmomo ==false)||(btnconfirmcash== true && btnconfirmmomo ==true)} style={{ backgroundColor: '#1abc9c', color: 'white', width: '100%', height: '48%', borderRadius: '12px', fontSize: '1.5rem' }} className='btn '>Xác Nhận</button>

            {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {formdata.btnsignup && (
          <button value="Submit" onClick={() => { HandleSubmitOTPSignup(formdata.email) }} className={`${styles['input-submit']}`} >confirm</button>
        )}
        <button value="Submit" onClick={() => { HandleResend() }} className={`${styles['input-submit']}`} >resend OTP</button>
      </div> */}
        </div>

    );
}