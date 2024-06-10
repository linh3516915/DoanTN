import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './otp.module.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function OTP(props) {
  const [otp, setOtp] = useState('');
  const auth = useSelector(state => state.auth.authentication);
    const user = useSelector(state => state.auth.user);
  const HandleSubmitOTP = () => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/checkotp', {
        otp,
        email : props.formdata.email
      })
      alert(response.data.success);
      if(response.data.success){
          // const response = await axios.post('http://127.0.0.1:8000/api/donhang/addnew', {
          //               sdt: phone,
          //               ho_ten: name,
          //               email : email,
          //               dia_chi: address,
          //               tong_tien: totalprice
          //           })
          //           alert('dat hang thanh cong');
          //           dispatch(setCart());
          //           window.location.reload();
      }
      else {

      }
    }
    getAPI();
  }
  const HandleResend = () =>{
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/sendotpagain', {
        email : props.formdata.email
      })
      alert(response.data.success);
    }
    getAPI();
  }
  return (
    <div className={`${styles['otp-input']}`}>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        inputStyle={`${styles["input-custumize"]}`}
        renderInput={(props) => <input {...props} />}
      />
      <button value="Submit" onClick={()=>{HandleSubmitOTP()}} className={`${styles['input-submit']}`} >buy</button>
      <button value="Submit" onClick={()=>{HandleResend()}} className={`${styles['input-submit']}`} >resend OTP</button>
    </div>

  );
}