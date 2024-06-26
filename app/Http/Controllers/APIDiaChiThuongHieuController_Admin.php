<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiaChiThuongHieu_Admin;

class APIDiaChiThuongHieuController_Admin extends Controller
{
    //
    public function danhSach(){
        $dsdiachi = DiaChiThuongHieu_Admin::all();
        return response()-> json([
            'success' => true,
            'data'    => $dsdiachi
        ]);
    }
    public function themMoi(Request $request){
    
        if(empty($request->nha_cung_cap_id)||empty($request->dia_chi))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        // $diachithuonghieu= DiaChiThuongHieu_Admin::where('dia_chi',$request->dia_chi)->first();
        // if(!empty($diachithuonghieu->dia_chi)){
        //     return response()->json([
        //         'success'=> 0,
        //         'message'=> "Tên loại sản phẩm: ($request->kich_thuoc) đã tồn tại!!"        
        //     ]);
        // }
        #tao moi
        $diachithuonghieu = new DiaChiThuongHieu_Admin();
        $diachithuonghieu->nha_cung_cap_id      = $request->nha_cung_cap_id;
        $diachithuonghieu->dia_chi      = $request->dia_chi;
        $dungluong    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm địa chỉ thương hiệu thành công!! "
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $dungluong = DungLuong_Admin::find($id);
         if(empty($dungluong)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Dung lượng ID={$id} không tồn tại"
             ]);
         }
 
         $count =DungLuong_Admin::where('id','<>',$id)->where('kich_thuoc',$request->kich_thuoc)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Dung lượng sản phẩm đã tồn tại"
             ]);
         }
         $dungluong->kich_thuoc      = $request->kich_thuoc;
         $dungluong->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật dung lượng thành công'
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
          $dungluong =DungLuong_Admin::find($id);
          if(empty($dungluong)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Dung lượng ID={$id} không tồn tại"
              ]);
          }
  
          $dungluong->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa Dung lượng thành công'
          ]);
      }
}
