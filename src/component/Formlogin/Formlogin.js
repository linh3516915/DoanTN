import { Link } from "react-router-dom";
import styles from './Formlogin.module.css'
import { useEffect, useState } from "react";
import { gettoken, getuser } from "../../redux/slice/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { closepopuplogin } from "../../redux/slice/popupSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useInView } from "react-intersection-observer";
export default function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const authen = useSelector(state => state.auth.authentication);
    const user = useSelector(state => state.auth.user)
    const { ref: refTopTrendingProduct, inView: inViewPopupLogin } = useInView({
        threshold: 0
    });
    const HandleLogin = async () => {

        try {
            // đăng nhập 
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                email,
                password
            });
            console.log('login', response.data);
            if (response.data.success === true) {
                dispatch(gettoken(response.data));
                dispatch(closepopuplogin());
            }
            else {
                alert('sai mật khẩu hoặc tài khoản');
            }
            //lấy dữ liệu ng dùng 
        } catch (error) {
            console.error(error);
            alert('khong them dc');
        }
    };

    console.log(token);
    console.log(authen);
    console.log(user);
    return (
        <>
            <div ref={refTopTrendingProduct} className={`container w-fit-content bg-light ${styles['sign-in']} ${inViewPopupLogin ? 'animation-from-top' : ''}`}>
                <button className='btn btn-outline-danger' style={{ marginBottom: '1rem' }} onClick={() => { dispatch(closepopuplogin()) }}><FontAwesomeIcon icon={faCircleXmark} /></button>
                <h3 className={`${styles['title']}`}>Sign In</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        HandleLogin();
                    }}
                    className={` d-flex flex-column ${styles['sign-in-form']}`}>
                    <input type='email' placeholder='Email' required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <input type='password' required placeholder='Password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button className={`${styles['sign-in_btn']} h-100`}>Sign In</button>
                </form>
                <div className={`${styles['sign-up-link']} text-center mt-5 opacity-75  font-italic`}>
                    <span className='opacity-50'>Create an account?</span>
                    <Link to="/signup" className='text-decoration-none ms-1' onClick={()=>{dispatch(closepopuplogin())}}>
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    )
}