<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DonHang;
use App\Models\ChiTietDonHang;
use App\Models\ChiTietSanPham;
use App\Models\User;
use App\Models\HinhAnh;
use App\Constants;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
// use App\Constants;
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
                'donhang'=> $donhang
            ]);
        }
    }
    public function donhang($id){
        $dh = DonHang::where('users_id', $id)->get();
        
        $datadh = [];
        $datactdh = [];
        $datactsp= [];
        // return response() -> json([
        //     'data' => count($dh),
        // ]);
        for($i=0 ; $i<count($dh); $i++){
            $ctdh = ChiTietDonHang::where('don_hang_id',$dh[$i]->id)->get();
            
            
            for($j = 0 ; $j< count($ctdh);$j++){
                $ctsp = ChiTietSanPham::where('san_pham_id',$ctdh[$j]->san_pham_id)->where('mau_sac_id',$ctdh[$j]->mau_sac_id)
                ->where('dung_luong_id',$ctdh[$j]->dung_luong_id)->first();
                $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)
                ->where('isAvatarimage',1)->first();
                array_push($datactdh,[
                    'datactdh' =>$ctdh[$j],
                    'data' => $ctsp,
                    'img' => Constants::APP_NAME.$anh->ten_hinh_anh
                ]);
                
            }
           
            // array_push($datadh,[
            //     'datadh' =>$dh[$i],
            //     'data' => $datactsp,
            // ]);
            // return response() -> json([
            //     'data' => $datadh,
            // ]);
        }
        return response() -> json([
            'data' => $dh,
            'datactdh'=> $datactdh
        ]);
  
    }
    public function donhangadmin(){
        $dh = DonHang::all();
        $datadh = [];
        $datactdh = [];
        $datactsp= [];
        // return response() -> json([
        //     'data' => count($dh),
        // ]);
        for($i=0 ; $i<count($dh); $i++){
            $ctdh = ChiTietDonHang::where('don_hang_id',$dh[$i]->id)->get();
            
            
            for($j = 0 ; $j< count($ctdh);$j++){
                $ctsp = ChiTietSanPham::where('san_pham_id',$ctdh[$j]->san_pham_id)->where('mau_sac_id',$ctdh[$j]->mau_sac_id)
                ->where('dung_luong_id',$ctdh[$j]->dung_luong_id)->first();
                $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)
                ->where('isAvatarimage',1)->first();
                array_push($datactdh,[
                    'datactdh' =>$ctdh[$j],
                    'data' => $ctsp,
                    'img' => Constants::APP_NAME.$anh->ten_hinh_anh
                ]);
                
            }
           
            // array_push($datadh,[
            //     'datadh' =>$dh[$i],
            //     'data' => $datactsp,
            // ]);
            // return response() -> json([
            //     'data' => $datadh,
            // ]);
        }
        return response() -> json([
            'data' => $dh,
            'datactdh'=> $datactdh
        ]);
    }
    public function duyetdon($id){
        $dh = DonHang::find($id);
        $dh->trang_thai = 2;
        $dh->save();
        return response() -> json([
            'success' => true,
        ]);
    }
    public function xacnhangiao($id){
        $dh = DonHang::find($id);
        $dh->trang_thai = 3;
        $dh ->payment_methods = 1;
        $dh->save();
        return response() -> json([
            'success' => true,
        ]);
    }
    public function chohuy($id){
        $dh = DonHang::find($id);
        $dh->trang_thai = 4;
        $dh->save();
        return response() -> json([
            'success' => true,
        ]);
    }
    public function duyethuy($id){
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        $dh = DonHang::find($id);
        $dh->trang_thai = 5;
        $dh->save();
        $ctdh = ChiTietDonHang::where('don_hang_id' , $dh->id) ->get();
        foreach ($ctdh as $ct) {
           $ctsp = ChiTietSanPham::where('san_pham_id',$ct->san_pham_id)->where('mau_sac_id', $ct->mau_sac_id)
           ->where('dung_luong_id',$ct->dung_luong_id)
           ->update([
               'so_luong' => ChiTietSanPham::raw('so_luong + ' . intval($ct->so_luong_mua)),
                'updated_at' => $dt,
           ]);
        }
        return response() -> json([
            'success' => true,
        ]);
    }
    public function thanhtoanvietqr(Request $rq){
        $donhang = DonHang::find($rq->id);
        if(!empty($donhang)){
            $donhang->payment_methods = 1;
            $donhang->save();
            return response() -> json([
                'success' => true,
            ]);
        }
    }
    // public function momo_payment(Request $rq){
    //     $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    // $vnp_Returnurl = Constants::APP_NAME;
    // $vnp_TmnCode = "ZFAWHVK4";//Mã website tại VNPAY 
    // $vnp_HashSecret = "S6HKOX08MUQROB3Z43R7JSEFY0N91OCO"; //Chuỗi bí mật
    
    // $vnp_TxnRef = $_POST['order_id']; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này 
    // sang VNPAY
    // $vnp_OrderInfo = $_POST['order_desc'];
    // $vnp_OrderType = $_POST['order_type'];
    // $vnp_Amount = $_POST['amount'] * 100;
    // $vnp_Locale = $_POST['language'];
    // $vnp_BankCode = $_POST['bank_code'];
    // $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
    // //Add Params of 2.0.1 Version
    // $vnp_ExpireDate = $_POST['txtexpire'];
    // //Billing
    // $vnp_Bill_Mobile = $_POST['txt_billing_mobile'];
    // $vnp_Bill_Email = $_POST['txt_billing_email'];
    // $fullName = trim($_POST['txt_billing_fullname']);
    // if (isset($fullName) && trim($fullName) != '') {
    //     $name = explode(' ', $fullName);
    //     $vnp_Bill_FirstName = array_shift($name);
    //     $vnp_Bill_LastName = array_pop($name);
    // }
    // $vnp_Bill_Address=$_POST['txt_inv_addr1'];
    // $vnp_Bill_City=$_POST['txt_bill_city'];
    // $vnp_Bill_Country=$_POST['txt_bill_country'];
    // $vnp_Bill_State=$_POST['txt_bill_state'];
    // // Invoice
    // $vnp_Inv_Phone=$_POST['txt_inv_mobile'];
    // $vnp_Inv_Email=$_POST['txt_inv_email'];
    // $vnp_Inv_Customer=$_POST['txt_inv_customer'];
    // $vnp_Inv_Address=$_POST['txt_inv_addr1'];
    // $vnp_Inv_Company=$_POST['txt_inv_company'];
    // $vnp_Inv_Taxcode=$_POST['txt_inv_taxcode'];
    // $vnp_Inv_Type=$_POST['cbo_inv_type'];
    // $inputData = array(
    //     "vnp_Version" => "2.1.0",
    //     "vnp_TmnCode" => $vnp_TmnCode,
    //     "vnp_Amount" => $vnp_Amount,
    //     "vnp_Command" => "pay",
    //     "vnp_CreateDate" => date('YmdHis'),
    //     "vnp_CurrCode" => "VND",
    //     "vnp_IpAddr" => $vnp_IpAddr,
    //     "vnp_Locale" => $vnp_Locale,
    //     "vnp_OrderInfo" => $vnp_OrderInfo,
    //     "vnp_OrderType" => $vnp_OrderType,
    //     "vnp_ReturnUrl" => $vnp_Returnurl,
    //     "vnp_TxnRef" => $vnp_TxnRef,
    //     "vnp_ExpireDate"=>$vnp_ExpireDate,
    //     "vnp_Bill_Mobile"=>$vnp_Bill_Mobile,
    //     "vnp_Bill_Email"=>$vnp_Bill_Email,
    //     "vnp_Bill_FirstName"=>$vnp_Bill_FirstName,
    //     "vnp_Bill_LastName"=>$vnp_Bill_LastName,
    //     "vnp_Bill_Address"=>$vnp_Bill_Address,
    //     "vnp_Bill_City"=>$vnp_Bill_City,
    //     "vnp_Bill_Country"=>$vnp_Bill_Country,
    //     "vnp_Inv_Phone"=>$vnp_Inv_Phone,
    //     "vnp_Inv_Email"=>$vnp_Inv_Email,
    //     "vnp_Inv_Customer"=>$vnp_Inv_Customer,
    //     "vnp_Inv_Address"=>$vnp_Inv_Address,
    //     "vnp_Inv_Company"=>$vnp_Inv_Company,
    //     "vnp_Inv_Taxcode"=>$vnp_Inv_Taxcode,
    //     "vnp_Inv_Type"=>$vnp_Inv_Type
    // );
    
    // if (isset($vnp_BankCode) && $vnp_BankCode != "") {
    //     $inputData['vnp_BankCode'] = $vnp_BankCode;
    // }
    // if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
    //     $inputData['vnp_Bill_State'] = $vnp_Bill_State;
    // }
    
    // //var_dump($inputData);
    // ksort($inputData);
    // $query = "";
    // $i = 0;
    // $hashdata = "";
    // foreach ($inputData as $key => $value) {
    //     if ($i == 1) {
    //         $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
    //     } else {
    //         $hashdata .= urlencode($key) . "=" . urlencode($value);
    //         $i = 1;
    //     }
    //     $query .= urlencode($key) . "=" . urlencode($value) . '&';
    // }
    
    // $vnp_Url = $vnp_Url . "?" . $query;
    // if (isset($vnp_HashSecret)) {
    //     $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);//  
    //     $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
    // }
    // $returnData = array('code' => '00'
    //     , 'message' => 'success'
    //     , 'data' => $vnp_Url);
    //     if (isset($_POST['redirect'])) {
    //         header('Location: ' . $vnp_Url);
    //         die();
    //     } else {
    //         echo json_encode($returnData);
    //     }
    // }
}
