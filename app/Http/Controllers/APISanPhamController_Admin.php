<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SanPham_Admin;
use App\Models\NhaCungCap_Admin;
use App\Models\LoaiSanPham_Admin;
use App\Models\ChiTietSanPham_Admin;
class APISanPhamController_Admin extends Controller
{
    //laydanhsach
    public function danhSach(){
        $dsSanPham = SanPham_Admin::all();
        $data=[];
            $length=count($dsSanPham);
            for($i=0;$i<$length;$i++)
            {
                $NhaCungCap=NhaCungCap_Admin::where('id',$dsSanPham[$i]->nha_cung_cap_id)->first();
                $LoaiSanPham=LoaiSanPham_Admin::where('id',$dsSanPham[$i]->loai_san_pham_id)->first();
                $SanPham =new SanPham_Admin();
                $SanPham->id=$dsSanPham[$i]->id;
                $SanPham->ten=$dsSanPham[$i]->ten;
                $SanPham->nha_cung_cap= $NhaCungCap->ten;
                $SanPham->loai_san_pham = $LoaiSanPham->ten_loai;
                array_push($data,$SanPham);
            }
            return response()->json([
                'success' =>true,
                'data'    =>$data
            ]);
    // them moi    
    }public function themSanPham(Request $request){
    
        if(empty($request->tensp)||empty($request->nhacungcap)||empty($request->loaisanpham))
        {
            return response()->json([
                'success' => false,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
        #kiem tra  san pham da ton tai hay chua?
        $sanPham = SanPham_Admin::where('ten',$request->tensp)->first();
        if(!empty($sanPham->ten)){
            return response()->json([
                'success'=> false,
                'message'=> "Sản phẩm ($request->tensp) tồn tại!!"        
            ]);
        }
        #tao moi san pham
        $sanPham = new SanPham_Admin();
        $sanPham->ten       = $request->tensp;
        $sanPham->nha_cung_cap_id = $request->nhacungcap;
        $sanPham->loai_san_pham_id = $request->loaisanpham;
        $sanPham    ->save();
        //
        return response()->json([
            'success' => true,
            'message' => "thêm sản phẩm thành công!! "
        ]);
    }
     //d.cập nhật
     public function capNhat(Request $request,$id)
     {
         $sanPham =SanPham_Admin::find($id);
         if(empty($sanPham)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Sản phẩm ID={$id} không tồn tại"
             ]);
         }
 
         $count =SanPham_Admin::where('id','<>',$id)->where('ten',$request->tensp)->count();
         if($count>0)
         {
             return response()->json([
                 'success' =>false,
                 'message' =>"Tên sản phẩm đã tồn tại"
             ]);
         }
         $sanPham->ten       = $request->tensp;
         $sanPham->nha_cung_cap_id = $request->nhacungcap;
         $sanPham->loai_san_pham_id = $request->loaisanpham;
         $sanPham->save();
         return response()->json([
             'success' =>true,
             'message' =>'Cập nhật sản phẩm thành công'
             
         ]);
     }
      //e. xóa
      public function xoa($id)
      {
         
          $sanPham =SanPham_Admin::find($id);
          $ctsp = ChiTietSanPham_Admin::where('san_pham_id',$sanPham -> id)->get();
          $lenght = count($ctsp);
          if($lenght > 0 ) {
             $ctsp->each -> delete();
          }
         
          if(empty($sanPham)){
              return response()->json([
                  'success' =>false,
                  'message' =>"Sản phẩm ID={$id} không tồn tại"
              ]);
          }
         
  
          $sanPham->delete();
          return response()->json([
              'success' =>true,
              'message' =>'Xóa sản phẩm thành công'
          ]);
      }
}
