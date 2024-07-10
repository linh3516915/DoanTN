import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import styles from './otp.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closepopupotp, openpopuplogin, setsuccess } from '../../redux/slice/popupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import { getemail, setOTP } from '../../redux/slice/authSlice';
import { loadingmodal } from '../../redux/slice/filterSlice';
import { setCart } from '../../redux/slice/cartSlice';
export default function OTP(props) {
  const [otp, setOtp] = useState('');
  const [isloading, setIsloading] = useState(false);
  const auth = useSelector(state => state.auth.authentication);
  const user = useSelector(state => state.auth.user);
  const otpcheck = useSelector(state => state.auth.OTP);
  const emailcheck = useSelector(state => state.auth.email);
  const formdata = useSelector(state => state.popup.datacheckotp);
  const datacheckout = useSelector(state => state.popup.datacheckout);
  const popupsignup = useSelector(state => state.popup.btnPopupOTP);
  const { ref: refPopupOTP, inView: inViewPopupOTP } = useInView({
    threshold: 0
  });
//   useEffect(() => {
//     if(popupsignup == false){
//       const getAPI = async () => {
//         const response = await axios.post('http://127.0.0.1:8000/api/otp/delotp', {
//           email: formdata.email
//         })
//         //dispatch(closepopupotp());
//       }
//       getAPI();  
//     }
// }, [popupsignup, formdata.email])
  // useEffect(() => {
  //   const getAPI = async () => {
  //     if(emailcheck !== '' && otpcheck ==null ){
  //       const response = await axios.post('http://127.0.0.1:8000/api/otp/sendotp', {
  //         email: emailcheck
  //       })
  //       dispatch(setOTP(response.data.otptocheck));
  //     }
  //   }
  //   getAPI();
  //   console.log('check otpppp',otpcheck);
  // }, [emailcheck])
 
  console.log('check formdataOTP', formdata);
  const HandleSubmitOTPCheckout = () =>{
    dispatch(loadingmodal(true));
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/checkotp', {
        otp,
        'otpcheck': otpcheck
      })
      if(response.data.success){
        dispatch(setOTP(null));
        const getAPI = async () => {
          dispatch(loadingmodal(true));
          const response = await axios.post('http://127.0.0.1:8000/api/donhang/addnew',datacheckout)
          if(response.data.success){
            alert('done');
            dispatch(setCart());
          }
          else{
            alert(response.data.message);
          }
        }
        getAPI();
        dispatch(loadingmodal(false));
        dispatch(closepopupotp());
      }
      else{
        alert('sai otp');
      }
    }
      getAPI()
      dispatch(loadingmodal(false));
  }
  const HandleSubmitOTPSignup = () => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/checkotp', {
        otp,
        'otpcheck': otpcheck
      })
      if (response.data.success) {
        const getAPI = async () => {
          const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', {
            name: formdata.name,
            email: formdata.email,
            password: formdata.password,
            phone: formdata.phone,
            address: formdata.address,
          }, {
            headers: {
              'Accept': 'application/json'
            }
          })

          if (response.data.success === true) {

            dispatch(setsuccess(true));
            // dispatch(setCart());
            dispatch(getemail(''));
            dispatch(closepopupotp());
            dispatch(openpopuplogin());
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
        'otpcheck' : otpcheck
      })
      alert(response.data.success);
    }
    getAPI();
  }
  const exitOTP = () => {
    const getAPI = async () => {
      const response = await axios.post('http://127.0.0.1:8000/api/otp/delotp', {
        'otpcheck' : otpcheck
      })
      dispatch(getemail(''));
      dispatch(setOTP(null));
      dispatch(closepopupotp());
    }
    getAPI();
  }
  const dispatch = useDispatch();
  return (
    <div ref={refPopupOTP} className={`${styles['otp-input']}  ${inViewPopupOTP ? 'animation-from-top' : ''}`} >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>check OTP email</h2>
        <button className='btn btn-outline-danger' onClick={() => { exitOTP() }}><FontAwesomeIcon icon={faCircleXmark} /></button>
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
          <button value="Submit" onClick={() => { HandleSubmitOTPSignup() }} className={`${styles['input-submit']}`} >confirm</button>
        )}
        {formdata.btncheckout && (
          <button value="Submit" onClick={() => { HandleSubmitOTPCheckout() }} className={`${styles['input-submit']}`} >confirm Đơn</button>
        )}
        <button value="Submit" onClick={() => { HandleResend() }} className={`${styles['input-submit']}`} >resend OTP</button>
      </div>
    </div>

  );
}