import FormLogin from "../../../component/Formlogin/Formlogin";
import Footer from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/header";



export default function Login() {
    return (
        <>
 <Header/>
            <div className="container d-flex flex-column gap-5">
                <FormLogin/>
            </div>
            <Footer/>
        </>
    );
}