import { Link } from "react-router-dom";
import styles from './Formlogin.module.css'
import { useEffect, useState } from "react";
import { gettoken, getuser } from "../../redux/slice/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
export default function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const authen = useSelector(state => state.auth.authentication);
    const user = useSelector(state => state.auth.user)
    const HandleLogin = async () => {

        try {
            // đăng nhập 
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                email,
                password
            });
            console.log('login', response);
            dispatch(gettoken(response.data));
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
            <div className={`container w-fit-content bg-light ${styles['sign-in']}`}>
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
                    <Link to="/signup" className='text-decoration-none ms-1'>
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    )
}