<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChiTietSanPham_Admin;
use App\Models\MauSac_Admin;
use App\Models\DungLuong_Admin;
use App\Models\SanPham_Admin;
use App\Models\Ram_Admin;



class APIChiTietSanPhamController_Admin extends Controller
{
    //
    
    public function danhSachCTSP(){
        $chitietsanpham = ChiTietSanPham_Admin :: all();
        return response()-> json([
            'success' => true,
            'data'    => $chitietsanpham
    ]);
    }
    public function danhSach($id){
        $sanpham=SanPham_Admin::find($id);
        $dsChiTietSanPham= ChiTietSanPham_Admin::where('san_pham_id',$id)->get();
        $data=[];
            
            $length=count($dsChiTietSanPham);
            for($i=0;$i<$length;$i++)
            {
                $dungluong=DungLuong_Admin::where('id',$dsChiTietSanPham[$i]->dung_luong_id)->first();
                $mausac=MauSac_Admin::where('id',$dsChiTietSanPham[$i]->mau_sac_id)->first();
                // $ram=Ram_Admin::where('id',$dsChiTietSanPham[$i]->ram_id)->first();
                $ctsp =new ChiTietSanPham_Admin();
                $ctsp->ten=$dsChiTietSanPham[$i]->ten;
                $ctsp->san_pham_ten = $sanpham->ten;
                $ctsp->dung_luong_ten = $dungluong->kich_thuoc;
                $ctsp->mau_sac_ten = $mausac->ten_mau_sac;
                // $ctsp->ram_ten = $ram -> loai_ram;
                $ctsp->so_luong=$dsChiTietSanPham[$i]->so_luong;
                $ctsp->gia=$dsChiTietSanPham[$i]->gia;
                $ctsp->luot_thich=$dsChiTietSanPham[$i]->luot_thich;
                $ctsp->so_sao = $dsChiTietSanPham[$i]->so_sao;
                array_push($data,$ctsp);
            }
            return response()->json([
                'success' =>true,
                'data'    =>$data
            ]);
    }
    // them moi
    public function themctch(Request $request, $id){
        
        if(empty($request->tenctsp)||empty($request->dungluong)||empty($request->mausac)||empty($request->loairam)||empty($request->soluong||empty($request->gia)))
        {
            return response()->json([
                'success' => -1,
                'message' => "Chưa nhập đầy đủ thông tin!! "
            ]);
        }
       
        #kiem tra  san pham da ton tai hay chua?
        $ctsp = ChiTietSanPham_Admin::where('ten',$request->tenctsp)->first();
        if(!empty($ctsp->ten)){
            return response()->json([
                'success'=> 0,
                'message'=> " $request->tenctsp da tồn tại!!"        
            ]);
        }
        #tao moi ct san pham
        
        $ctsp = new ChiTietSanPham_Admin();
        $ctsp->ten       = $request->tenctsp;
        $ctsp-> san_pham_id = $id;
        $ctsp->dung_luong_id = $request -> dungluong;
        $ctsp->mau_sac_id = $request -> mausac;
        $ctsp->ram_id = $request ->loairam;
        $ctsp -> so_luong = $request -> soluong;
        $ctsp -> gia = $request -> gia ;
        $ctsp    ->save();
        //
        return response()->json([
            'success' => 1,
            'message' => "Thêm mới chi tiết sản phẩm thành công!! "
        ]);
    }
    public function Capnhat(Request $request, $id){
        $ctsp =ChiTietSanPham_Admin::find($id);
        if(empty($ctsp)){
            return response()->json([
                'success' =>0,
                'message' =>"Chi Tiết Sản phẩm ID={$id} không tồn tại"
            ]);
        }

        $count =ChiTietSanPham_Admin::where('id','<>',$id)->where('ten',$request->tenctsp)->count();
        if($count>0)
        {
            return response()->json([
                'success' =>-1,
                'message' =>" chi tiết sản phẩm $request->tenctsp đã tồn tại!! "
            ]);
        }
        $ctsp->ten       = $request->tenctsp;
        $ctsp->dung_luong_id = $request -> dungluong;
        $ctsp->mau_sac_id = $request -> mausac;
        $ctsp->ram_id = $request ->loairam;
        $ctsp -> so_luong = $request -> soluong;
        $ctsp -> gia = $request -> gia ;
        $ctsp    ->save();
        return response()->json([
            'success' =>true,
            'message' =>'Cập nhật chi tiết  sản phẩm thành công',
            'san_pham_id' =>$ctsp->san_pham_id
            
        ]); 
    }
    public function xoa($id)
    {
        
         $ctsp =ChiTietSanPham_Admin::find($id);
        
        if(empty($ctsp)){
             return response()->json([
                 'success' =>false,
                 'message' =>"Chi Tiet Sản phẩm ID={$id} không tồn tại"
             ]);
         }
        
 
         $ctsp->delete();
         return response()->json([
             'success' =>true,
             'message' =>'Xóa chi tiet sản phẩm thành công'
         ]);
    }
}
