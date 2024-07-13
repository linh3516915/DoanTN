import { createSlice } from '@reduxjs/toolkit'
import { apiUrl_anh } from '../../api/api'

const initialState = {
  items: [],
  //   totalQuantity: 0, // Đảm bảo đây là 'totalQuantity' thay vì 'totalquality'

}

export const productSlice = createSlice({

  name: 'product',
  initialState: {
    option: [],
    mo_ta: null,
    name: '',
    id: null,
    idsupplier: null,
    idloaisanpham: null,
    productdetail: null,
    iddungluong: null,
    idmausac: null,
    idtrangthai: null,
    soluong: 0,
    giatien: 0,
    phantramgiam: 0,
    giakhuyenmai: 0,
    anhctsp: ''
  },
  reducers: {
    // addCart: (state, action) => {
    //   state.items.push(action.payload);
    // },
    setoption: (state, action) => {
      state.option = action.payload
    },
    setmota: (state, action) => {
      state.mo_ta = action.payload
    },
    setname: (state, action) => {
      state.name = action.payload
    },
    setId: (state, action) => {
      state.id = action.payload
    },
    setIdsupplier: (state, action) => {
      state.idsupplier = action.payload
    },
    setIdloaisanpham: (state, action) => {
      state.idloaisanpham = action.payload
    },
    setproductdetail: (state, action) => {
      state.productdetail = action.payload
    },
    setproductdetails: (state, action) => {
      console.log('data products', action.payload);
      if (action.payload.data != null ||state.productdetail == null) {
        console.log('data productsssss', action.payload);
        const data = action.payload.data;
        const items = state.productdetail;
        const check = state.productdetail.find(item => parseInt(item.san_pham_id) === parseInt(data.san_pham_id) && parseInt(item.mau_sac_id) === parseInt(data.mau_sac_id) && parseInt(item.dung_luong_id) === parseInt(data.dung_luong_id));
        console.log('data check', check);
        if (!check) {
          state.productdetail.push(action.payload.data);
          console.log('data !check', check);
        }
        else {
          check.so_luong = parseInt(check.so_luong) + parseInt(action.payload.so_luong);
          console.log('action.payload.so_luong', check.so_luong);
        }
      }

      // state.productdetail = action.payload
    },
    
    setiddungluong: (state, action) => {
      state.iddungluong = action.payload
    },
    setidmausac: (state, action) => {
      state.idmausac = action.payload
    },
    setIdtrangthai: (state, action) => {
      state.idtrangthai = action.payload
    },
    setsoluong: (state, action) => {
      state.soluong = action.payload
    },
    setgiatien: (state, action) => {
      state.giatien = action.payload
    },
    setphantramgiam: (state, action) => {
      state.phantramgiam = action.payload
    },
    setgiakhuyenmai: (state, action) => {
      state.giakhuyenmai = action.payload
    },
    setanhctsp: (state, action) => {
      state.anhctsp = `${apiUrl_anh}/`+ action.payload;
    },
  },
})

export const { setoption, setmota, setname, setId, setIdsupplier
  , setIdloaisanpham, setIdtrangthai, setproductdetail,
  setiddungluong, setidmausac, setgiatien, setsoluong, setproductdetails,
  setanhctsp,setphantramgiam,setgiakhuyenmai} = productSlice.actions

export default productSlice.reducer
