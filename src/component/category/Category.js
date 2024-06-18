import { useNavigate } from "react-router-dom";
import styles from './Category.module.css'
import { useEffect, useState } from "react"
import Img1 from '../../assets/imagestest/pic1.jpg'
import Img2 from '../../assets/imagestest/pic2.jpg'
import Img3 from '../../assets/imagestest/pic3.jpg'
import Img4 from '../../assets/imagestest/pic4.jpg'
import Img5 from '../../assets/imagestest/pic5.jpg'
import { useInView } from "react-intersection-observer";
function Category() {

    const categoryy =
        [
            { '_id': 1, 'image': Img1, 'name': 'pic1' },
            { '_id': 2, 'image': Img2, 'name': 'pic2' },
            { '_id': 3, 'image': Img3, 'name': 'pic3' },
            { '_id': 4, 'image': Img4, 'name': 'pic4' },
            { '_id': 5, 'image': Img5, 'name': 'pic5' }
        ];
    const { ref, inView } = useInView();
    const [categories, setCategories] = useState([categoryy]);
    console.log(categories);
    const renderCategories = () => {
        let firstRow = [];
        let secondRow = [];
        categoryy.forEach((category, index) => {

            if (index < 2) {
                firstRow.push(<div key={category._id} className={`flex-1 ${styles['category-img']}`}>
                    <img className="w-100 h-100" alt={category.name} src={`${category.image}`} />
                </div>)
            } else if (index >= 2 && index < 5) {
                secondRow.push(<div key={category._id} className={`flex-1 ${styles['category-img']}`}>
                    <img className="w-100 h-100" style={{ justifyContent: 'space-between' }} alt={category.name} src={`${category.image}`} />
                </div>)
            }
        })
        return <>
            <div className={`d-flex gap-3 ${inView ? 'animation-from-left' : ''}`} style={{ justifyContent: 'center' }}>
                {firstRow}
            </div>
            <div className={`d-flex gap-3 ${inView ? 'animation-from-right' : ''}`} style={{ justifyContent: 'center' }}>
                {secondRow}
            </div>
        </>
    }


    return (
        <div ref={ref} className="category">
            <div class="brands-area">
                <div class="zigzag-bottom"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="brand-wrapper">
                                <h2 class="section-title">Hệ Điều Hành</h2>
                                {renderCategories()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;