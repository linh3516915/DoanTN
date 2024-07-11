import Header from "../../layout/Header/header";
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/images/banner1.jpg'
import styles from './Banner.module.css'
import { useInView } from 'react-intersection-observer';
import Img1 from '../../assets/images/product_1.png'
import Img2 from '../../assets/images/product_2.png'
import Img3 from '../../assets/images/product_3.png'
import Img4 from '../../assets/images/product_4.png'
import Img5 from '../../assets/images/product_5.png'
import bannertest1 from '../../assets/bannertest1.png'
import bannertest2 from '../../assets/ảnh/bannergreen.jfif'
import { useState,useEffect } from "react";
export default function Banner() {
    // const categoryy =
    //     [
    //         { '_id': 1, 'image': Img1, 'name': 'pic1' },
    //         { '_id': 2, 'image': Img2, 'name': 'pic2' },
    //         { '_id': 3, 'image': Img3, 'name': 'pic3' },
    //         { '_id': 4, 'image': Img4, 'name': 'pic4' },
    //         { '_id': 5, 'image': Img5, 'name': 'pic5' }
    //     ];

    //     const [slideIdenx,setSlideIdex] = useState(1);

    //        const categories = categoryy.map((data, index) => {
    //         return (
    //             <>
    //                 <div>
    //                     <img className="mySlides" key={data._id} style={{ display: 'none' }} src={data.image} />
    //                 </div>
    //             </>
    //         );
    //     })
    // const plusDivs = (n) => {
    //     //setSlideIdex(slideIdenx + n);
    // }
    // console.log(slideIdenx);
    const { ref: refBanner, inView: inViewBanner } = useInView({
        threshold: 0
    });
    const [dsslideshow, setDSSlideShow] = useState([]);
    const [btn, setBtn] = useState(0);
    useEffect(() => {
        async function setdsslideshow() {
            var response = await fetch(`http://127.0.0.1:8000/api/slideshow/slideshow-admin`);
            var json = await response.json();
            setDSSlideShow(json.data)
            console.log('check', response.data);
        }
        setdsslideshow();

    }, [])
    console.log('check', dsslideshow);

    // const btnmove = dsslideshow.map((item, index) => {



    //     console.log(btn);
    //     if (index == 0) {
    //         <li onClick={() => { setBtn(index) }} data-bs-target="#slide-list" data-bs-slide-to={index} className={` active`}></li>
    //     }
    //     return (
    //         <>
    //             <li onClick={() => { setBtn(index) }} data-bs-target="#slide-list" data-bs-slide-to={index} className={`${btn == index ? 'active' : ''}`}></li>
    //         </>
    //     )
    // })
    const listslideshow = dsslideshow.map(function (item, index) {
            if(btn<0){
                setBtn(item.length - 1);
            }
            if(btn > index){
                setBtn(0);
            }
            if(btn == index){
                return (
                    <div className="carousel-item active">
                        <img src={'http://127.0.0.1:8000/'+ item.URL_anh} className="d-block w-100" alt="..." />
                    </div>
                ); 
            }
        
        // return (
        //     <div className="carousel-item">
        //         <img src={'http://127.0.0.1:8000/'+ item.URL_anh} className="d-block w-100" alt="..." />
        //     </div>
        // );

    });
    function Slideshow(props) {
        return (
            <>
                <option value={props.data.id}>{props.data.ten_anh},{props.data.URL_anh},{props.data.noi_dung}</option>
            </>
        );
    }




    console.log('inViewBanner', inViewBanner);
    return (
        <>
            <div className="slider-area">
                <div className="zigzag-bottom"></div>
                <div id="slide-list" className="carousel carousel-fade slide" data-bs-ride="carousel">

                    <div className="slide-bulletz">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <ol className="carousel-indicators slide-indicators">
                                        <li data-bs-target="#slide-list" data-bs-slide-to="0" className="active"></li>
                                        <li data-bs-target="#slide-list" data-bs-slide-to="1"></li>
                                        <li data-bs-target="#slide-list" data-bs-slide-to="2"></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="single-slide">
                                <div className="slide-bg slide-two" ></div>
                                <div className="slide-text-wrapper">
                                    <div className="slide-text">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="slide-content">
                                                        <h2>About us</h2>
                                                        <p>Discover the excitement of cutting-edge technology with this premium smartphone! Featuring a sleek design, powerful performance, and versatile features, this phone is the perfect companion for every aspect of your life. </p>
                                                        <p>  Enjoy its crisp display, high-quality camera for stunning photos and videos, and smooth multitasking capabilities. Don't miss out on owning this exceptional product – place your order now to take advantage of special offers!</p>
                                                        {/* <a href="#" className="readmore">Learn more</a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="single-slide">
                                <div className="slide-bg slide-two" style={{backgroundImage: `url(${bannertest2})`}}></div>

                                <div className="slide-text-wrapper">
                                    <div className="slide-text">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="slide-content">
                                                        <h2>Reliable and Convenient Delivery Service at Our Store</h2>
                                                        <p> Welcome to our store! We take pride in offering fast and reliable delivery service right to our customers' doorstep. With an extensive shipping network, we are committed to providing a convenient and enjoyable shopping experience.</p>
                                                        <p> You can rest assured when placing an order with us, as customer satisfaction is our top priority. Explore our products today and let us deliver the best experience to you!</p>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="single-slide">
                                <div className="slide-bg slide-three"></div>
                                <div className="slide-text-wrapper">
                                    <div className="slide-text">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="slide-content">
                                                        <h2>And Now</h2>
                                                        <p>Step into our store, FUTURE SKY, where quality meets variety! We warmly welcome you to explore a diverse selection of high-quality products and excellent customer service. We are committed to meeting all your shopping needs with professionalism and enthusiasm. Don't hesitate to visit our store today for a delightful and exceptional shopping experience!</p>
                                                        <a href="./shop" className="readmore">Click here now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button onClick={()=>{setBtn(btn-1)}} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button onClick={()=>{setBtn(btn+1)}} className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
            </div>
        </>
    );
}
