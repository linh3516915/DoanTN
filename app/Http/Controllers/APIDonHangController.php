<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DonHang;
use App\Models\ChiTietDonHang;
use App\Models\ChiTietSanPham;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
class APIDonHangController extends Controller
{
    public function DatHang(Request $rq){
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        
        $data =[];
        for($i = 0 ;$i < count($rq->data) ; $i++){
            $ctsp = ChiTietSanPham::where('san_pham_id',$rq->data[$i]['product']['san_pham_id'])->where('mau_sac_id',$rq->data[$i]['product']['mau_sac_id'])
            ->where('dung_luong_id',$rq->data[$i]['product']['dung_luong_id'])->first();
           
            if($ctsp -> so_luong >0 ){
                if($ctsp ->so_luong < $rq->data[$i]['quantity'])
                { 
                    $data[] = 'sản phẩm ' . $ctsp->ten . ' chỉ còn ' . $ctsp->so_luong;
                }
            }
            else{
                
                $data[] = 'sản phẩm '.$ctsp->ten.' sold out';
            }
        }
        if(count($data) > 0){
            return response()->json([
                'success' => false,
                'message' => $data
            ]);
        }
       
        $donhang = new DonHang();
        if($rq->users_id == 0){
            $checkemail = User::where('email',$rq->email)->first();
            if(!empty($checkemail)){
                return response()->json([
                    'success' => false,
                    'message' => 'email đã tồn tại'
                ]);
            }
            $user = new User();
            $user->name = $rq->name;
            $user->email = $rq->email;
            $user->password = Hash::make($rq->password);
            $user->so_dien_thoai = $rq->phone;
            $user->dia_chi = $rq->address;
            $user->isAdmin = 0;
            $user->save();
            $donhang->users_id = $user->id;
        }
        else{
            $donhang->users_id = $rq->users_id;
        }
            $donhang->so_dien_thoai = $rq -> phone;
            $donhang->email = $rq -> email;
            $donhang->ho_ten = $rq ->name ;
            $donhang->dia_chi = $rq->address;
            $donhang->ngay_dat= $dt->toDateTimeString();
            $donhang->thoi_gian_giao = $rq->time;
            $donhang->payment_methods = 0;
            $donhang->tong_tien = $rq->tong_tien ; 
            $donhang->giam_gia = $rq-> giam_gia;
            $donhang->gia_khuyen_mai = $rq->gia_khuyen_mai;
            $donhang->trang_thai= 1;
            $donhang->save();
       
        $data =[];
        for($i = 0 ;$i < count($rq->data) ; $i++){
            $ctsp = ChiTietSanPham::where('san_pham_id',$rq->data[$i]['product']['san_pham_id'])->where('mau_sac_id',$rq->data[$i]['product']['mau_sac_id'])
            ->where('dung_luong_id',$rq->data[$i]['product']['dung_luong_id'])->first();
                    $ctdh = new ChiTietDonHang();
                    $ctdh->don_hang_id = $donhang->id;
                    $ctdh->san_pham_id = $rq->data[$i]['product']['san_pham_id'];
                    $ctdh->mau_sac_id = $rq->data[$i]['product']['mau_sac_id'];
                    $ctdh->dung_luong_id = $rq->data[$i]['product']['dung_luong_id'];
                    $ctdh->gia = $rq->data[$i]['product']['gia_khuyen_mai'];
                    $ctdh->so_luong_mua = $rq->data[$i]['quantity'];
                    $ctdh->thanh_tien = $rq->data[$i]['product']['gia_khuyen_mai'] * $rq->data[$i]['quantity'];
                    $ctdh->isComment = 0;
                    $ctdh->save();
                    ChiTietSanPham::where('san_pham_id',$rq->data[$i]['product']['san_pham_id'])->where('mau_sac_id',$rq->data[$i]['product']['mau_sac_id'])
                    ->where('dung_luong_id',$rq->data[$i]['product']['dung_luong_id'])
                    ->update([
                        'so_luong' => ChiTietSanPham::raw('so_luong - ' . intval($rq->data[$i]['quantity'])),
                        'updated_at' => $dt,
                    ]);
        }
        if(count($data)==0){
            return response()->json([
                'success' => true,
            ]);
        }
        
    }
}
