import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listProductdetail } from "../redux/slice/productdetail";

const dispatch = useDispatch();
useEffect(() => {
    try {
        const getAPI = async () => {
            const data = await axios.get('http://127.0.0.1:8000/api/productdetail/showLists',
            );
            console.log('check data: ', data);
            dispatch(listProductdetail(data));
        }
        getAPI();
    } catch (error) {

    }
}, [dispatch])