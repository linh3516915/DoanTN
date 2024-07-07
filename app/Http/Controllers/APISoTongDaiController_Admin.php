<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SoTongDai_Admin;
class APISoTongDaiController_Admin extends Controller
{
    //
    public function danhSach(){
        $sotongdai = SoTongDai_Admin::all();
        return response()->json([
            'data' => $sotongdai,
        ]);
    }
    public function themSoTongDai(Request $request){
    
        if(empty($request->tenso))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $sotongdai= SoTongDai_Admin::where('ten_so',$request->tenso)->first();
        if(!empty($sotongdai->ten_so)  ){
            return response()->json([
                'success'=> 0,
                'message'=> "Tên tổng đài: ($request->tenso) đã tồn tại!!",
                   
            ]);
        }
        #tao moi
        $sotongdai = new SoTongDai_Admin();
        $sotongdai->ten_so      = $request->tenso;
        $sotongdai->so_dien_thoai      = $request->sodienthoai;
        $sotongdai->gio_bat_dau_hoat_dong      = $request->giobatdau;
        $sotongdai->gio_ket_thuc_hoat_dong      = $request->gioketthuc;
        $sotongdai    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm tông đài thành công!! ",
            'data'=>$sotongdai     
        ]);
    }
     //d.cập nhật
     public function capNhatTongDai(Request $request,$id)
     {
         $sotongdai = SoTongDai_Admin::find($id);
         if(empty($sotongdai)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Tổng đài ID={$id} không tồn tại"
             ]);
         }
 
         $count =SoTongDai_Admin::where('id','<>',$id)->where('ten_so',$request->tenso)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Tên tổng đài đã tồn tại"
             ]);
         }
         $sotongdai->ten_so      = $request->tenso;
         $sotongdai->so_dien_thoai      = $request->sodienthoai;
         $sotongdai->gio_bat_dau_hoat_dong      = $request->giobatdau;
         $sotongdai->gio_ket_thuc_hoat_dong      = $request->gioketthuc;
         $sotongdai    ->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật tổng đài thành công! '
         ]);
     }
      //e. xóa
      public function xoaTongDai($id)
      {
          $sotongdai =SoTongDai_Admin::find($id);
          if(empty($sotongdai)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Tổng đài ID={$id} không tồn tại"
              ]);
          }
  
          $sotongdai->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa tổng đài thành công'
          ]);
      }
}
