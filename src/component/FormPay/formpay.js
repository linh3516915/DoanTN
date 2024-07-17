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
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../api/api';
export default function FormPay(props) {
  const { ref: refPopupOTP, inView: inViewPopupOTP } = useInView({
    threshold: 0
  });
  const [btnconfirmcash, setBtnconfirmcash] = useState(false);
  const [btnconfirmmomo, setBtnconfirmomo] = useState(false);
  const [btnconfirm, setBtnconfirm] = useState(false);
  const [data, setData] = useState([]);
  const totalcoupon = useSelector(state => state.cart.totalCoupon);
  const iddonhang = useSelector(state => state.ordermanagement.id_don_hang.id);
  const gia = useSelector(state => state.ordermanagement.id_don_hang.gia_khuyen_mai);
  const navigate = useNavigate();
  const btncash = () => {
    setBtnconfirmcash(true);
    setBtnconfirmomo(false);
    setBtnconfirm(true);
  }
  const btnmomo = () => {
    setBtnconfirmcash(false);
    setBtnconfirmomo(true);
    setBtnconfirm(false);
  }
  const dispatch = useDispatch();
  const confirm = (btnconfirmcash, btnconfirmmomo) => {
    if (btnconfirmcash) {

    }
    if (btnconfirmmomo) {

    }
  }
  console.log(btnconfirmcash, btnconfirmmomo);
  // useEffect(() => {
  //   if (btnconfirmmomo) {
  //     setInterval(() => {
  //     const getAPI = async () => {
  //       const response = await fetch('https://script.googleusercontent.com/a/macros/caothang.edu.vn/echo?user_content_key=uYqMtO1mXwMRKORmiFiOCoc6MAgaFS6s4GpVrh3_i4JALkXbtBVg6Xn-hQW3oeTnjYj3X5CJRJfNp1mdM0jm1VsWt9hixEW7OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAP9o9vArLfWc-uvGkFWB9xGG5RFzrzEq_zmOhNhFkaG4t0SxJRy0mD2XLJItzandfEZYC7OR93mlpdlrRnMtbJx9-cOq-3Xvr0ld-k_85V6HlV6Zi4TjVhIQsojXKT7qDc_ScPTHfLrg&lib=MdB2pWqPSbdA4S9z4851t9cjB0FGL_NO4')
  //       const mb = await response.json();
  //       const testmb = mb.data[mb.data.length - 1];
  //       const content =testmb["Mô tả"];
  //        console.log(testmb["Giá trị"],testmb["Mô tả"]);
  //       // if(testmb["Giá trị"]>= gia && content.includes('CHUYEN TIEN CHO DAT DON HANG ID ' + {iddonhang})){
  //       //     alert('giao dich thanh cong');
  //       // }
  //       // else{
  //       //   console.log('that bai gg')
  //       // }
  //     }
  //     // setTimeout(() => {

  //         getAPI();
  //       }, 1000);
  //     // }, 20000);
  //   }
  // }, [btnconfirmmomo])
  const [returnmb, setReturnmb] = useState(false);
  useEffect(() => {
    let intervalId;

    const getAPI = async () => {
      try {
        const response = await fetch('https://script.googleusercontent.com/a/macros/caothang.edu.vn/echo?user_content_key=uYqMtO1mXwMRKORmiFiOCoc6MAgaFS6s4GpVrh3_i4JALkXbtBVg6Xn-hQW3oeTnjYj3X5CJRJfNp1mdM0jm1VsWt9hixEW7OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAP9o9vArLfWc-uvGkFWB9xGG5RFzrzEq_zmOhNhFkaG4t0SxJRy0mD2XLJItzandfEZYC7OR93mlpdlrRnMtbJx9-cOq-3Xvr0ld-k_85V6HlV6Zi4TjVhIQsojXKT7qDc_ScPTHfLrg&lib=MdB2pWqPSbdA4S9z4851t9cjB0FGL_NO4');
        const mb = await response.json();
        const testmb = mb.data[mb.data.length - 1];
        const content = testmb["Mô tả"];

        // Kiểm tra điều kiện và xử lý
        if (testmb["Giá trị"] >= gia && content.includes('CHUYEN TIEN CHO DAT ID '+iddonhang.toString())) {
         
          const responses = await axios.post(`${apiUrl}/donhang/thanhtoanvietqr`, {
            'id': iddonhang
          });
          if (responses.data.success) {
            alert('Giao dịch thành công');
            setReturnmb(true);
          }
        } else {
          console.log('Thất bại');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      }
    };

    if (btnconfirmmomo) {
      intervalId = setInterval(() => {
        getAPI();
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [btnconfirmmomo]);

  // Xử lý reload trang khi returnmb được thiết lập
  if (returnmb) {
    window.location.reload();
  }


  return (
    <div ref={refPopupOTP} className={`${styles['otp-input']}  ${inViewPopupOTP ? 'animation-from-top' : ''}`} >
      <button className='btn btn-outline-danger' style={{ position: 'absolute', right: '1px', top: '1px' }} onClick={() => {
        dispatch(closepopuppay());
      }}><FontAwesomeIcon icon={faCircleXmark} /></button>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'math', marginBottom: '0px' }}>Chọn Phương Thức Thanh Toán</h2>
      </div>

      <div style={{ textAlign: 'start', marginBottom: '5%' }}>
        <div>
          <input type='radio' name='payment methods' onChange={() => { btncash() }} />
          <FontAwesomeIcon style={{ marginLeft: '2%' }} icon={faMoneyBill} /> <label style={{ width: '95%;' }}>Cash</label>
        </div>
        <div>
          <input type='radio' name='payment methods' onChange={() => { btnmomo() }} />
          <label style={{ width: '84%;' }}><img style={{ width: '13%', marginLeft: '5%' }} src={iconmomo} /> Momo</label>
        </div>

      </div>
      {btnconfirmmomo && (
        <>
          <img width={200} height={200} src={`https://img.vietqr.io/image/MB-0829136387-compact2.png?amount=${gia}&addInfo='CHUYEN TIEN CHO DAT ID ${iddonhang}'`} />
          <div> Tổng tiền phải chuyển : {gia}</div>
          <div> Nội dung chuyển khoản : {iddonhang}</div>
        </>

      )}
      {btnconfirm && (
        <button onClick={() => {
          confirm(btnconfirmcash, btnconfirmmomo);
        }} disabled={(btnconfirmcash == false && btnconfirmmomo == false) || (btnconfirmcash == true && btnconfirmmomo == true)} style={{ backgroundColor: '#1abc9c', color: 'white', width: '100%', height: '48%', borderRadius: '12px', fontSize: '1.5rem' }} className='btn '>Xác Nhận</button>

      )}

      {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {formdata.btnsignup && (
          <button value="Submit" onClick={() => { HandleSubmitOTPSignup(formdata.email) }} className={`${styles['input-submit']}`} >confirm</button>
        )}
        <button value="Submit" onClick={() => { HandleResend() }} className={`${styles['input-submit']}`} >resend OTP</button>
      </div> */}
    </div>

  );
}