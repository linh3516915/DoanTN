import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listProductdetail,listtop16hottrend } from "../../redux/slice/productdetail";

const dispatch = useDispatch();

    useEffect(() => {
        try {
            const getAPI = async () => {
                const data = await axios.get('http://127.0.0.1:8000/api/productdetail/top8hottrending',
                );
                console.log('check data: ', data.data);
                dispatch(listtop16hottrend(data.data));
            }
            getAPI();
        } catch (error) {
            alert('loi');
        }
    }, [dispatch])
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
