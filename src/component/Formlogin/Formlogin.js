import { Link } from "react-router-dom";
import styles from './Formlogin.module.css'
export default function FormLogin() {
    return (
        <>
           <div className={`container w-fit-content bg-light ${styles['sign-in']}`}>
                <h3 className={`${styles['title']}`}>Sign In</h3>
                <form 
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     setIsLoadingSpinnerModal(true);
                //     onSubmitLogin()
                // }}
                 className={` d-flex flex-column ${styles['sign-in-form']}`}>
                    <input type='email' placeholder='Email' required 
                    // value={email}
                    //     onChange={(e) => {
                    //         setEmail(e.target.value)
                    //     }}

                    />
                    <input type='password' required placeholder='Password' 
                    // value={password}
                    //     onChange={(e) => {
                    //         setPassword(e.target.value)
                    //     }} 
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