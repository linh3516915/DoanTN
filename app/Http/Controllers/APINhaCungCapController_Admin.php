<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NhaCungCap_Admin;
use App\Models\DiaChiThuongHieu_Admin;

class APINhaCungCapController_Admin extends Controller
{
    //
    public function danhSach(){
        
        $dsNhaCungCap = NhaCungCap_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dsNhaCungCap
            ]);
    } 
    // public function chiTietNCC(Request $request ,$id){
    //     $nhacungcap = NhaCungCap_Admin::find($id);
    //     return response()->json([
    //         'success' => true,
    //         'data' =>$nhacungcap
    //     ]);
    //  }

    //them moi
    public function themNCC(Request $request){
    
        if(empty($request->tenncc))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  da ton tai hay chua?
        $nhacungcap= NhaCungCap_Admin::where('ten',$request->tenncc)->first();
        if(!empty($nhacungcap->ten)){
            return response()->json([
                'success'=> 0,
                'message'=> "Tên nhà cung cấp: ($request->tenncc) đã tồn tại!!"        
            ]);
        }
        #tao moi
        $nhacungcap = new NhaCungCap_Admin();
        $nhacungcap->ten       = $request->tenncc;
        $nhacungcap    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm nhà cung cấp thành công!! "
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $nhacungcap = NhaCungCap_Admin::find($id);
         if(empty($nhacungcap)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Sản phẩm ID={$id} không tồn tại"
             ]);
         }
 
         $count =NhaCungCap_Admin::where('id','<>',$id)->where('ten',$request->tenncc)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Tên nhà cung cấp đã tồn tại"
             ]);
         }
         $nhacungcap->ten       = $request->tenncc;
         $nhacungcap->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật nhà cung cấp thành công'
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
          $nhacungcap =NhaCungCap_Admin::find($id);
          if(empty($nhacungcap)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Nhà cung cấp ID={$id} không tồn tại"
              ]);
          }
  
          $nhacungcap->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa nhà cung cấp thành công'
          ]);
      }
}
