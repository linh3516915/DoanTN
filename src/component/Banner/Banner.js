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
import { useState } from "react";
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



    console.log('inViewBanner', inViewBanner);
    return (
        <>
            <div>
                <div className="banner">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner ">
                            <div className="carousel-item active" >
                                <img src="thum_800x450.png" className="card-img-top  " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="bannertest2.jpg" className=" card-img-top " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="bannertest1.png" className=" card-img-top" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <div ref={refBanner} className="banner mt-2 position-relative font-family-Ubuntu">
                                    <div className={`position-absolute justify-content-center w-25 ms-5 d-flex h-100 flex-column ${inViewBanner ? 'animation-from-left' : ''} z-1`}>
                                        <p className={`text-uppercase font-italic mb-1 font-weight-500 font-weight-light opacity-50 ${styles['testname']}`}>new inspiration 2020</p>
                                        <h2 className='text-uppercase font-italic font-weight-900'>20% off on new season</h2>
                                        <Link to="/" className={`w-fit-content bg-dark text-decoration-none text-light px-3 py-2 ${styles['browse_collection-btn']}`}>Browse collections</Link>
                                    </div>
                                    <img loading='lazy' className={`w-100 ${inViewBanner ? "animation-from-right" : ""}`} src={bannerImg} alt='banner' />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev "  type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden" >Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
