import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getstreet, getdistrict, getprovince, getward } from "../../redux/slice/addressSlice";

export default function Address() {
    const [province, setProvince] = useState([]);
    const [province_id, setProvince_id] = useState(0);
    const [district, setDistrict] = useState([]);
    const [district_id, setDistric_id] = useState(null);
    const [ward, setWard] = useState([]);
    const pro = useSelector(state => state.address.province);
    const dic = useSelector(state => state.address.district);
    const wa = useSelector(state => state.address.ward);
    const dispatch = useDispatch();
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/address/province', {
                headers: {
                    Accept: 'application/json',
                }
            });
            setProvince(response.data.data);

        }
        getAPI();
    }, [])
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.post('http://127.0.0.1:8000/api/address/district', {
                province_id
            });
            setDistrict(response.data.data);
            dispatch(getprovince(response.data.nameprovince));
        }
        getAPI();
    }, [province_id])
    useEffect(() => {
        const getAPI = async () => {
            const response = await axios.post('http://127.0.0.1:8000/api/address/ward', {
                district_id
            });
            setWard(response.data.data);
            dispatch(getdistrict(response.data.namedistrict));
        }
        getAPI();
    }, [district_id])

    const provinces = province.map((item) => {
        return (
            <>
                <option value={item.province_id} key={item.province_id} >{item.name}</option>
            </>
        )
    })
    const districts = district.map((item) => {
        return (
            <>
                <option value={item.district_id} key={item.district_id} >{item.name}</option>
            </>
        )
    })
    const wards = ward.map((item) => {
        return (
            <>
                <option value={item.name} key={item.ward_id} >{item.name}</option>
            </>
        )
    })
    return (
        <>
            {/* <div class="container" style={{ paddingRight: '0', paddingLeft: '0' }}>
                <div class="row justify-content-md-center p-2">
                    <div class="col-md-auto" style={{ display: 'flex' }}>
                        <select class="form-select form-select-sm mb-3" id="city" onChange={(e) => { setProvince_id(e.target.value) }} aria-label=".form-select-sm" required>
                            <option value="" selected>Chọn tỉnh thành</option>
                            {provinces}

                        </select>

                        <select class="form-select form-select-sm mb-3" onChange={(e) => { setDistric_id(e.target.value) }} id="district" aria-label=".form-select-sm" required>
                            <option value="" selected>Chọn quận huyện</option>
                            {districts}
                        </select>



                    </div>
                    <select class="form-select form-select-sm" onChange={(e) => { dispatch(getward(e.target.value)) }} id="ward" aria-label=".form-select-sm" required>
                        <option value="" selected>Chọn phường xã</option>
                        {wards}
                    </select>
                    <label style={{ marginTop: '10px' }}>nhập tên đường</label>
                    <input type="text" onChange={(e) => { dispatch(getstreet(e.target.value)) }} required />
                </div>
            </div> */}
            {/*  */}
            <div data-mdb-input-init class="form-outline mb-4" style={{display:"flex", justifyContent:"space-between"}}>
                <select class="form-select form-select-sm mb-3" style={{width : '47%'}} id="city" onChange={(e) => { setProvince_id(e.target.value) }} aria-label=".form-select-sm" required>
                    <option value="" selected>Chọn tỉnh thành</option>
                    {provinces}

                </select>
                <select class="form-select form-select-sm mb-3" style={{width : '47%'}} onChange={(e) => { setDistric_id(e.target.value) }} id="district" aria-label=".form-select-sm" required>
                    <option value="" selected>Chọn quận huyện</option>
                    {districts}
                </select>
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
                <select onChange={(e) => { dispatch(getward(e.target.value)) }} id="ward" aria-label=".form-select-sm" required>
                    <option value="" selected>Chọn phường xã</option>
                    {wards}
                </select>
            </div>
            <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" placeholder="nhập tên đường" onChange={(e) => { dispatch(getstreet(e.target.value)) }} required />
            </div>
        </>
    )
}