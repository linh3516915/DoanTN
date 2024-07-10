<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DonHang;

class APIDonHangController_Admin extends Controller
{
    //
    public function SoLuongDonDuyet(){
        try{
            // Đếm số lượng đơn hàng đã duyệt có trạng thái = 1
            $donhang=DonHang::where('trang_thai',1)->count();
            return response()->json(['soluongdon' => $donhang],200);
        }catch(\Exception $e){
            return response()->json(['message'=> $e->getMessage()],500);
        }
    }
    public function doanhThuHangThang(){
        $donhang = DonHang::all();
        $data = [];
        $datamonth = [];
        
        for($i = 1 ; $i<=12 ; $i++){
            $tong= 0;
            $records = DonHang::whereMonth('created_at', [$i])->get();
            foreach($records as $record){
                if($record->trang_thai == 3){
                    $tong =$tong + $record->gia_khuyen_mai;
                }
            }
            array_push($data , $tong);
            array_push($datamonth , 'tháng '.$i);
            $tong= 0 ; 
        }
        return response()->json([
            'data'=> $data,
            'datamonth' => $datamonth
        ]);
    }
    public function doanhThuHangNgay(){
        $donhang = DonHang::all();
        $data = [];
        $dataday = [];
        for($i = 1 ; $i <= 31 ; $i++){
            $tong = 0;
            $records = DonHang::whereDay('created_at', [$i])->get();
        foreach($records as $record){
            if($record -> trang_thai == 3){
                $tong = $tong + $record-> gia_khuyen_mai;
            }
        }
        array_push($data , $tong);
            array_push($dataday , 'ngày '.$i);
            $tong= 0 ;
        }
        return response()->json([
            'data'=> $data,
            'dataday' => $dataday
        ]);
    }
}
