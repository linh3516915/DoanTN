import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './otp.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closepopupotp, openpopuplogin } from '../../redux/slice/popupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
export default function OTP(props) {
  const [otp, setOtp] = useState('');
  const [isloading,setIsloading] = useState(false);
  const auth = useSelector(state => state.auth.authentication);
  const user = useSelector(state => state.auth.user);
  const formdata = useSelector(state=>state.popup.datacheckotp);
  const { ref: refPopupOTP, inView: inViewPopupOTP } = useInView({
    threshold: 0
});
  useEffect(() => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/sendotp', {
        email : formdata.email
      })
    }
    getAPI();
  },[formdata.email])
  console.log('check formdataOTP',formdata);
  const HandleSubmitOTPSignup = (email) => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/checkotp', {
        otp,
        email: email
      })
      alert(response.data.success);
      if (response.data.success) {
        const getAPI = async() =>{
          const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', {
            name: formdata.name,
            email : formdata.email,
            password :formdata.password,
            phone: formdata.phone,
            address: formdata.address,
        },{
          headers : {
            'Accept' : 'application/json'
          }
        })
        
        if(response.data.success === true)
          {
            
            alert('đăng ký thành công');
           // dispatch(setCart());
            dispatch(closepopupotp());
            dispatch(openpopuplogin());
          }
          else {
            alert(email);
          }
        }
        getAPI();
      }
      else {
          alert('Mã OTP không hợp lệ');
      }
    }
    getAPI();
  }
  const HandleResend = () => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/sendotpagain', {
        email: formdata.email
      })
      alert(response.data.success);
    }
    getAPI();
  }
  const exitOTP = (email) => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/delotp', {
        email 
      })
      dispatch(closepopupotp());
    }
    getAPI();
  }
  const dispatch = useDispatch();
  return (
    <div ref={refPopupOTP} className={`${styles['otp-input']}  ${inViewPopupOTP ? 'animation-from-top' : ''}`} >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>check OTP email</h2>
        <button className='btn btn-outline-danger' onClick={() => { exitOTP(formdata.email) }}><FontAwesomeIcon icon={faCircleXmark} /></button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={`${styles["input-custumize"]}`}
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {formdata.btnsignup && (
          <button value="Submit" onClick={() => { HandleSubmitOTPSignup(formdata.email) }} className={`${styles['input-submit']}`} >confirm</button>
        )}
        <button value="Submit" onClick={() => { HandleResend() }} className={`${styles['input-submit']}`} >resend OTP</button>
      </div>
    </div>

  );
}