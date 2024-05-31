import FormSignUp from "../../../component/FormSignup/formsignup";
import FormLogin from "../../../component/Formlogin/Formlogin";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";


export default function SignUp() {
    return (
        <>
            <div className="container d-flex flex-column gap-5">
                <FormSignUp/>
            </div>
        </>
    );
}