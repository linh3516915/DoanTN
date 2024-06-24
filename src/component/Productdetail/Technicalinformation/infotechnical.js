import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import styles from './infotechnical.module.css'
function InfoTechnical() {
    return (
        <>
            <div className={`${styles['main']}`}>
                đây là thông tin kỹ thuật
            </div>
        </>
    );
}

export default InfoTechnical;