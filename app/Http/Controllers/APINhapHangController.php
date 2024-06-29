<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SanPham;
use App\Models\ChiTietSanPham;
use App\Models\MauSac_Admin;
use App\Models\DungLuong_Admin;
use App\Models\NhapHang;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
class APINhapHangController extends Controller
{
    public function nhaphang(Request $rq){
        $ten_san_pham = trim($rq->ten_san_pham);
        $sanpham= SanPham::Where('ten',$ten_san_pham)->first();
        $tenmau = MauSac_Admin::find($rq->mau_sac_id);
        $tendungluong= DungLuong_Admin::find($rq->dung_luong_id);
        $tenAdmin = User::find($rq->user_id);
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
       if(empty($sanpham)){
        //themmoi
        $sp = new SanPham();
        $sp->ten = $ten_san_pham;
        $sp->nha_cung_cap_id = $rq->nha_cung_cap_id;
        $sp->loai_san_pham_id = $rq->loai_san_pham_id;
        $sp->save();
        //ctsp
        $ctsp =new ChiTietSanPham();
        $ctsp->ten = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac;
        $ctsp->san_pham_id = $sp->id;
        $ctsp->dung_luong_id = $rq->dung_luong_id;
        $ctsp->mau_sac_id = $rq->mau_sac_id;
        $ctsp->so_luong= $rq->so_luong;
        $ctsp->gia = $rq->gia;
        $ctsp->luot_thich= 0;
        $ctsp->so_sao = 0;
        $ctsp->save();
        $nhaphang= new NhapHang();
        $nhaphang->users_id = $rq->user_id;
        $nhaphang->ten_san_pham = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac;
        $nhaphang->so_luong = $rq->so_luong;
        $nhaphang->gia = $rq->gia;
        $nhaphang->thanh_tien= $rq->so_luong * $rq->gia;
        if($rq->ghi_chu == ''){
            $nhaphang->ghi_chu = 'Admin '.$tenAdmin->name.' đã thêm mới sản phẩm tên '
            .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
            .$rq->so_luong.' '.$rq->gia.' vào thời gian '.$dt->toDateTimeString();
        }
        else {
            $nhaphang->ghi_chu = $rq->ghi_chu;
        }
        $nhaphang->save();
        return response() -> json([
            'success' => true,
            'message' => 'thêm mới sản phẩm thành công' 
        ]);
    }
       else{
        $findctsp= ChiTietSanPham::where('san_pham_id', $sanpham->id)->where('dung_luong_id',$rq->dung_luong_id)
        ->where('mau_sac_id',$rq->mau_sac_id)->first();
        if(empty($findctsp)){
            $ctsp =new ChiTietSanPham();
            $ctsp->ten = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac;
            $ctsp->san_pham_id = $sanpham->id;
            $ctsp->dung_luong_id = $rq->dung_luong_id;
            $ctsp->mau_sac_id = $rq->mau_sac_id;
            $ctsp->so_luong= $rq->so_luong;
            $ctsp->gia = $rq->gia;
            $ctsp->luot_thich= 0;
            $ctsp->so_sao = 0;
            $ctsp->save();
            $nhaphang= new NhapHang();
            $nhaphang->users_id = $rq->user_id;
            $nhaphang->ten_san_pham = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac;
            $nhaphang->so_luong = $rq->so_luong;
            $nhaphang->gia = $rq->gia;
            $nhaphang->thanh_tien= $rq->so_luong * $rq->gia;
            if($rq->ghi_chu == ''){
                $nhaphang->ghi_chu = 'Admin '.$tenAdmin->name.' đã thêm mới1 chi tiết sản phẩm tên '
                .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
                .$rq->so_luong.' '.$rq->gia.' vào thời gian '.$dt->toDateTimeString();
            }
            else {
                $nhaphang->ghi_chu = $rq->ghi_chu;
            }
            $nhaphang->save();
            return response() -> json([
                'success' => true,
                'message' => 'thêm mới chi tiết sản phẩm thành công' 
            ]);
        }
        //capnhat
        else {
            ChiTietSanPham::where('san_pham_id', $sanpham->id)
            ->where('dung_luong_id', $rq->dung_luong_id)
            ->where('mau_sac_id', $rq->mau_sac_id)
            ->update([
            'so_luong' => ChiTietSanPham::raw('so_luong + ' . $rq->so_luong),
            'updated_at' => $dt,
        ]);
        $nhaphang= new NhapHang();
        $nhaphang->users_id = $rq->user_id;
        $nhaphang->ten_san_pham = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac;
        $nhaphang->so_luong = $rq->so_luong;
        $nhaphang->gia = $rq->gia;
        $nhaphang->thanh_tien= $rq->so_luong * $rq->gia;
        if($rq->ghi_chu == ''){
            $nhaphang->ghi_chu = 'Admin '.$tenAdmin->name.' đã cập nhập lại chi tiết sản phẩm tên '
            .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
            .$rq->so_luong.' '.$rq->gia.' vào thời gian '.$dt->toDateTimeString();
        }
        else {
            $nhaphang->ghi_chu = $rq->ghi_chu;
        }
        $nhaphang->save();
        return response() -> json([
            'success' => true,
            'message' => 'cập nhật thành công' 
        ]);
        }
        // $findctsp->so_luong=$findctsp->so_luong + $rq->so_luong;
        // $findctsp->gia = $rq->gia;
        // $findctsp->updated_at = $dt;
        // $findctsp->save();
       
       }
    }
}
