import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Img1 from '../../assets/imagestest/pic1.jpg'
import Img2 from '../../assets/imagestest/pic2.jpg'
import Img3 from '../../assets/imagestest/pic3.jpg'
import Img4 from '../../assets/imagestest/pic4.jpg'
import Img5 from '../../assets/imagestest/pic5.jpg'
import { useInView } from "react-intersection-observer";
import img from "../../assets/ảnh/14ve.jpg";
function ImageProductDetail() {

    const categoryy =
        [
            { '_id': 1, 'image': Img1, 'name': 'pic1' },
            { '_id': 2, 'image': Img2, 'name': 'pic2' },
            { '_id': 3, 'image': Img3, 'name': 'pic3' },
            { '_id': 4, 'image': Img4, 'name': 'pic4' },
            { '_id': 5, 'image': Img5, 'name': 'pic5' }
        ];

    return (
        <>
            <aside className="col-lg-6" style={{ height: '30rem' }}>
                <div className="border rounded-4 mb-3 d-flex justify-content-center" style={{ height: '85%' }}>
                    <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
                        <img className="rounded-4 fit" src={img} style={{ height: '100%' }} />
                    </a>
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" >
                        {/* <img className="rounded-4 fit" src={img} style={{height:'100%'}}/> */}
                        <img width="60" height="60" className="rounded-2" src={img} />
                    </a>
                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" >
                        <img width="60" height="60" className="rounded-2" src={img} />
                    </a>
                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" >
                        <img width="60" height="60" className="rounded-2" src={img} />
                    </a>
                    <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp" >
                        <img width="60" height="60" className="rounded-2" src={img} />
                    </a>
                </div>
            </aside>
        </>
    );
}

export default ImageProductDetail;