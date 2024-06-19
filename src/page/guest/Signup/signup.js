import { useEffect, useRef } from "react";
import FormSignUp from "../../../component/FormSignup/formsignup";
import FormLogin from "../../../component/Formlogin/Formlogin";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";


export default function SignUp() {
    const signuppageSectionRef = useRef(null);
    useEffect(() => {
        if (signuppageSectionRef.current) {
            signuppageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (
        <>
        <Header/>
            <div ref={signuppageSectionRef}  className="container d-flex flex-column gap-5">
                <FormSignUp/>
            </div>
            <Footer/>
        </>
    );
}