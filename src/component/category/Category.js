import { useNavigate } from "react-router-dom";
import styles from './Category.module.css'
import { useEffect, useState } from "react"
import Img1 from '../../assets/images/product_1.png'
import Img2 from '../../assets/images/product_2.png'
import Img3 from '../../assets/images/product_3.png'
import Img4 from '../../assets/images/product_4.png'
import Img5 from '../../assets/images/product_5.png'
import { useInView } from "react-intersection-observer";
function Category() {

    const categoryy = 
        [
        {'_id': 1 , 'image' : Img1,'name' : 'pic1'},
        {'_id': 2 , 'image' : Img2,'name' : 'pic2'},
        {'_id': 3 , 'image' : Img3,'name' : 'pic3'},
        {'_id': 4 , 'image' : Img4,'name' : 'pic4'},
        {'_id': 5 , 'image' : Img5,'name' : 'pic5'}
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
                    <img className="w-100 h-100"  alt={category.name} src={`${category.image}`} />
                </div>)
            } else if (index >= 2 && index < 5) {
                secondRow.push(<div key={category._id}  className={`flex-1 ${styles['category-img']}`}>
                    <img className="w-100 h-100"style={{justifyContent : 'space-between'}} alt={category.name} src={`${category.image}`} />
                </div>)
            }
        })
        return <>
            <div className={`d-flex gap-3 ${inView ? 'animation-from-left' : ''}`} style={{justifyContent : 'center'}}>
                {firstRow}
            </div>
            <div className={`d-flex gap-3 ${inView ? 'animation-from-right' : ''}`}style={{justifyContent : 'center'}}>
                {secondRow}
            </div>
        </>
    }


    return (
        <div ref={ref} className="category">
            <div className="title text-center">
                <p className="m-0 text-uppercase font-italic text-black font-weight-light opacity-50">carefully created collections</p>
                <div className="text-uppercase font-italic text-black h5">browse our categories</div>
            </div>
            <div className={`d-flex flex-column gap-3`}>
                {renderCategories()}
            </div>
        </div>
    );
}

export default Category;