import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Star(props) {
   let datastar = [];
    const liststar = [1, 2, 3, 4, 5].map((number, index) => {
        if (Math.floor(props.so_sao) >= number) {
            datastar.push(
                <div
                    className={`  `}
                >
                    <FontAwesomeIcon icon={faStar} />
                </div>
            )
        }

        return (
            < FontAwesomeIcon icon={faStarHalfStroke} />

        )
    })
    if ((props.so_sao - Math.floor(props.so_sao)) >= 0.1 && (props.so_sao - Math.floor(props.so_sao)) <= 0.9) {
        datastar.push(
            <div
                // key={index}
                className={`  `}
            // onClick={() => { setHoverIndex(index); setDisavled(true); }}
                style={{color : ''}}
            >
                < FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
        )
    }
    for (let i = 0; i < 5 - Math.ceil(props.so_sao); i++) {
        datastar.push(
            <div
                // key={i}
                className={` `}
                // onClick={() => { setHoverIndex(index); setDisavled(true); }}
                style={{ color: '#ccc' }}
            >
                <FontAwesomeIcon icon={faStar} />
            </div>
        )
    }

    return (
        <>
            <div style={{color : '#ffc808' ,display:'flex'}}>
                {datastar}
            </div>
        </>
    )
}