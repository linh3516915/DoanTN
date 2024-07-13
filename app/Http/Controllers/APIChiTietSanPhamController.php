<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ChiTietSanPham;
use App\Models\ChiTietDonHang;
use App\Models\SanPham;
use App\Models\DungLuong;
use App\Models\MauSac;
use App\Models\BinhLuanDanhGia;
use App\Models\NoiDungSanPham;
use App\Models\HinhAnhNoiDungSanPham;
use App\Models\HinhAnhSanPham;
use App\Constants;
use App\Providers\HelperServiceProvider;
use App\Models\HinhAnh;
class APIChiTietSanPhamController extends Controller
{
    public function Listproductdetails(){
        $products = SanPham::all();
        $data = [];
        $data2 = [];
        for($i=0; $i<count($products);$i++){
            $productdetail = ChiTietSanPham::where('san_pham_id',$products[$i]->id)->first();
            if($productdetail != null){
                array_push($data,$productdetail);
            }
        }
        foreach ($data as $ctsp) {
            $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
            array_push($data2,[
                'data' => $ctsp,
                'image' => Constants::APP_NAME.$anh->ten_hinh_anh
            ]);
        }
        return response()->json([
            'data' => $data2,
        ]);
    }
    public function Listproductdetail(Request $rq){
        $data=[];
        $productdetail = ChiTietSanPham::where('san_pham_id',$rq->id_product)->get();
        foreach ($productdetail as $ctsp) {
            $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
            array_push($data,[
                'data' => $ctsp,
                'image' => Constants::APP_NAME.$anh->ten_hinh_anh
            ]);
        }
        return response()->json([
            'data' => $data,
        ]);
    }
    public function productdetail(Request $rq){
        $datactsp = [];
        $productdetail = ChiTietSanPham::where('ten',$rq->ten)->first();
        $imgctsp = HinhAnh::where('san_pham_id',$productdetail->san_pham_id)->where('mau_sac_id',$productdetail->mau_sac_id)
        ->where('isAvatarimage',1)->first();
        array_push($datactsp , [
            'data' => $productdetail,
            'img' => Constants::APP_NAME.$imgctsp->ten_hinh_anh
        ]);
        $imgsp = HinhAnhSanPham::where('san_pham_id',$productdetail->san_pham_id)->get();
        $dataimg = [];
        foreach ($imgsp as $img) {
            array_push($dataimg,Constants::APP_NAME.$img->URL_anh);
        }
//          $productdetail = ChiTietSanPham::where('ten',$rq->ten)->first();
// >>>>>>> bd82b8a55dd9cbe83500afc7cfcf8f4ef40753aa
        $ncc = SanPham::find($productdetail->san_pham_id);
        $mau_sac =   ChiTietSanPham::where('san_pham_id',$productdetail->san_pham_id)->groupBy('mau_sac_id')->select('mau_sac_id')->get();
        $datamausac =[];
        for($i=0;$i<count($mau_sac);$i++){
            $ms = MauSac::find($mau_sac[$i]->mau_sac_id);
            array_push($datamausac,$ms);
        }
        $dung_luong =   ChiTietSanPham::where('san_pham_id',$productdetail->san_pham_id)->groupBy('dung_luong_id')->select('dung_luong_id')->get();
        $datadungluong =[];
        for($i=0;$i<count($dung_luong);$i++){
            $dl = DungLuong::find($dung_luong[$i]->dung_luong_id);
            array_push($datadungluong,$dl);
        }
        $votes = BinhLuanDanhGia::where('san_pham_id',$productdetail->san_pham_id)->where('mau_sac_id',$productdetail->mau_sac_id)
        ->where('dung_luong_id',$productdetail->dung_luong_id)->get();
        $votetest = BinhLuanDanhGia::where('san_pham_id',$productdetail->san_pham_id)->where('mau_sac_id',$productdetail->mau_sac_id)
        ->where('dung_luong_id',$productdetail->dung_luong_id)->first();
        $test = BinhLuanDanhGia::where('san_pham_id',$productdetail->san_pham_id)->where('mau_sac_id',$productdetail->mau_sac_id)
        ->where('dung_luong_id',$productdetail->dung_luong_id)->groupBy('so_sao')
        ->select('so_sao', \DB::raw('COUNT(so_sao) as so_luong_sao'))->get();
        $comment = BinhLuanDanhGia::where('san_pham_id',$productdetail->san_pham_id)->where('mau_sac_id',$productdetail->mau_sac_id)
        ->where('dung_luong_id',$productdetail->dung_luong_id)->get();
        $star = [5,4,3,2,1];
        $data = [];
        $tong = 0;
        foreach($star as $item){
            $vote = $test->firstWhere('so_sao', $item);
            if($vote){
                $tong = $tong+  $vote->so_luong_sao * $item;
            }
          
            $phantram = ($vote ? ($vote->so_luong_sao*100)/count($votes) : 0);
            array_push($data,[
                'so_sao' => $item,
                'phan_tram_sao' =>number_format(round($phantram)),
            ]);
        }
        $info = NoiDungSanPham::where('san_pham_id',$productdetail->san_pham_id)->get();
        $datanoidung=[];
        for($i= 0 ; $i<count($info);$i++){
            $image = HinhAnhNoiDungSanPham::where('noi_dung_san_pham_id' , $info[$i]->id)->get();
            array_push($datanoidung,[
                'noi_dung_san_pham' => $info[$i],
                'hinh_anh_noi_dung' => $image,
            ]);
        }
        $sp = SanPham::where('nha_cung_cap_id', $ncc->nha_cung_cap_id)->get();
        // return response()->json([
        //     'data' => $sp, 
        // ]);
        $datarelated=[];
            foreach($sp as $item){
                $ctsp = ChiTietSanPham::where('san_pham_id', $item->id)->first();
                
                if(!empty($ctsp)){
                    if( $ctsp->dung_luong_id == $productdetail->dung_luong_id && $ctsp->mau_sac_id == $productdetail->mau_sac_id){
                        
                    }
                    else{
                        array_push($datarelated,$ctsp);
                    }
                }
            }
            $datarelatedwithimg = [];
            foreach ($datarelated as $ctsp) {
                $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
                array_push($datarelatedwithimg,[
                    'data' => $ctsp,
                    'image' => Constants::APP_NAME.$anh->ten_hinh_anh
                ]);
            }
            // return response() -> json([
            //     'data_relatedproduct' => $datarelated,   
            // ]);
        
        if(!empty($votetest)){
            return response()->json([
                'data' => $datactsp,
                'img' => Constants::APP_NAME . $imgctsp->ten_hinh_anh,
                'imgsp' => $dataimg,
                'nha_cung_cap_id' => $ncc->nha_cung_cap_id,
                'mau_sac' => $datamausac,
                'dung_luong' => $datadungluong ,
                'data_listvote' => $data,
                'tong_danh_gia'=>count($votes),
                 'tong_phan_tram_sao' =>number_format(round(($tong/count($votes)),1),1),
                 'data_comment' => $comment,
                 'data_noi_dung' => $datanoidung,
                 'data_relatedproduct' => $datarelatedwithimg, 

            ]);
        }
        else{
            return response()->json([
                'data' => $datactsp,
                'img' => Constants::APP_NAME . $imgctsp->ten_hinh_anh,
                'imgsp' => $dataimg,
                'nha_cung_cap_id' => $ncc->nha_cung_cap_id,
                'mau_sac' => $datamausac,
                'dung_luong' => $datadungluong ,
                'data_listvote' => $data,
                'tong_danh_gia'=>count($votes), 
                'tong_phan_tram_sao' =>$tong,
                'data_comment' => null,
                'data_noi_dung' => $datanoidung,
                'data_relatedproduct' => $datarelatedwithimg, 
            ]);
        }
        // return response()->json([
        //     'data' => $productdetail,
        //     'nha_cung_cap_id' => $ncc->nha_cung_cap_id,
        //     'mau_sac' => $datamausac,
        //     'dung_luong' => $datadungluong ,
        // ]);
    }
    public function listdungluong(Request $rq){
        $dungluong = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->get();
        $data=[];
        $data2= [];
        for($k=0 ; $k<count($dungluong);$k++)
        {
            {
                array_push($data,$dungluong[$k]->dung_luong_id);
            }
            
        }
        for($i=0 ; $i<count($data);$i++)
        {
           for($j= $i+1;$j<count($data);$j++){
                if($data[$i] == $data[$j])
                {
                    $data[$j] = 0 ;
                    // $max == $
                }
           }
            
        }
        for($k=0 ; $k<count($data);$k++)
        {
            if($data[$k]!=0)
            {
                array_push($data2,$data[$k]);
            }
            
        }
        sort($data2);
        $data3= [];
        for($i=0;$i<count($data2);$i++){
            $dl = DungLuong::find($data2[$i]);
            array_push($data3,$dl);
        }
        return response()->json([
            'data' => $data3,
        ]);
    }
    public function listmausac(Request $rq){
        $mausac = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->get();
        $data=[];
        $data2= [];
        for($k=0 ; $k<count($mausac);$k++)
        {
            {
                array_push($data,$mausac[$k]->mau_sac_id);
            }
            
        }
        
        for($i=0 ; $i<count($data);$i++)
        {
           for($j= $i+1;$j<count($data);$j++){
                if($data[$i] == $data[$j])
                {
                    $data[$j] = 0 ;
                }
           }
            
        }
        for($k=0 ; $k<count($data);$k++)
        {
            if($data[$k]!=0)
            {
                array_push($data2,$data[$k]);
            }
            
        }
        sort($data2);
        $data3 = [];
        for($i=0;$i<count($data2);$i++){
            $dl = MauSac::find($data2[$i]);
            array_push($data3,$dl);
        }
        return response()->json([
            'data' => $data3,
        ]);
     }
   public function findproductdetail(Request $rq){
         $data= [];
        $ctsp = ChiTietSanPham::where('san_pham_id',$rq->san_pham_id)->where('mau_sac_id',$rq->mau_sac_id)->where('dung_luong_id',$rq->dung_luong_id)->first();
        
        $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
        array_push($data,[
            'data' => $ctsp,
            'image' => Constants::APP_NAME.$anh->ten_hinh_anh
        ]);
        return response()->json([
            'data' => $data,
        ]);
    }
    
    public function top8hottrending(){
        $productdetail = ChiTietSanPham::where('luot_thich' ,'>',0)->orderBy('luot_thich' , 'desc')->get();
        $data = [];
        $data2 = [];
        for($i = 0;$i<count($productdetail);$i++){
            if($i<16 )
            {
                array_push($data,$productdetail[$i]);
            }
        }
        foreach ($data as $ctsp) {
            $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
            array_push($data2,[
                'data' => $ctsp,
                'image' => Constants::APP_NAME.$anh->ten_hinh_anh
            ]);
        }
        return response()->json([
            'data' => $data2,
            
        ]);
    }
    public function latesproduct(){
        $products = SanPham::orderBy('created_at', 'desc')->get();
        $data = [];
        $data2 = [];
        for($i = 0 ; $i<count($products); $i++)
        {
            $ctsp = ChiTietSanPham::where('san_pham_id', $products[$i]->id)->first();
            if($ctsp != null)
            {
                array_push($data,$ctsp);
            }
            
        }
        foreach ($data as $ctsp) {
            $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
            array_push($data2,[
                'data' => $ctsp,
                'image' => Constants::APP_NAME.$anh->ten_hinh_anh
            ]);
        }
        return response()->json([
            'data' => $data2 ,
            'result' => count($data)
        ]);
    }
    public function topseller(){
        $product = ChiTietDonHang::all();
        $data=[];
        $data2= [];
        if(count($product)>0){
            $products = ChiTietDonHang::groupBy('san_pham_id','mau_sac_id','dung_luong_id')
            ->select('san_pham_id','mau_sac_id','dung_luong_id', \DB::raw('SUM(so_luong_mua) as total_quantity'))
            ->orderBy('total_quantity' ,'desc')
            ->get();
          
    
                for($i = 0; $i<count($products) ;$i++)
                {
                    // $ctsp = ChiTietSanPham::find($products[$i]->chi_tiet_san_pham_id);
                    $ctsp = ChiTietSanPham::where('san_pham_id',$products[$i]->san_pham_id)->where('mau_sac_id',$products[$i]->mau_sac_id)->where('dung_luong_id',$products[$i]->dung_luong_id)->first();
                    // $ctdh = [
                    //     'chi_tiet_san_pham' => $ctsp,
                    //     'so_luong_mua' => $products[$i]->total_quantity,
                    // ];
                    array_push($data,$ctsp);
                    
                    
                }
                foreach ($data as $ctsp) {
                    $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
                    array_push($data2,[
                        'data' => $ctsp,
                        'image' => Constants::APP_NAME.$anh->ten_hinh_anh
                    ]);
                }
                return response()->json([
                    'data' => $data2,
                    'result' => count($data)
                ]);
        }
        return response()->json([
            'data' => $data2
        ]);
    }
    public function search(Request $rq){
        if($rq->ten !=''){
        // {HelperServiceProvider::ucfirstString($rq->ten)
            $ctsps = ChiTietSanPham::where('ten','like','%'.HelperServiceProvider::ucfirstString($rq->ten).'%')->get();
            // $data = [];
            // for($i=0; $i<count($ctsp);$i++){
            //     $productdetail = ChiTietSanPham::where('san_pham_id',$ctsp[$i]->id)->first();
            //     if($productdetail != null){
            //         array_push($data,$productdetail);
            //     }
                
            // }
            $data= [];
                foreach ($ctsps as $ctsp) {
                    $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
                    array_push($data,[
                        'data' => $ctsp,
                        'image' => Constants::APP_NAME.$anh->ten_hinh_anh
                    ]);
                }
            return response()->json([
                'result' => count($ctsps),
                 'data' => $data,
                
            ]);
        }
        return response()->json([
            'result' => 0,
            'data' => null,
       ]);
    }
    public function filterprice(Request $rq){
        if($rq->giatu  < 1000000 ||$rq->giatu  >=  $rq->giaden){
            return response()->json([
                'success' => false,
                'message'=> 'lỗi'
            ]);
        }
        if( $rq->giaden < 1000000 &&  $rq->giaden < $rq->giatu)
            {
                return response()->json([
                    'success' => false,
                    'message'=> 'lỗi'
                ]);
            }
            if($rq->giatu < $rq->giaden){
                $productdetail = ChiTietSanPham::where('gia','>',$rq->giatu)->where('gia','<=',$rq->giaden)->get();
                $data= [];
                foreach ($productdetail as $ctsp) {
                    $anh = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)->first();
                    array_push($data,[
                        'data' => $ctsp,
                        'image' => Constants::APP_NAME.$anh->ten_hinh_anh
                    ]);
                }
                return response()->json([
                    'result' => count($productdetail),
                    'data' => $data,
                    'success' => true,
                    // 'image' => 
                ]);
            }
            else{
                return response()->json([
                    'success' => false,
                    'message'=> 'lỗi'
                ]);
            }
            
    }
    public function relatedproduct(Request $rq){
        $sp = SanPham::where('nha_cung_cap_id', $rq->nha_cung_cap_id)->get();
        $datarelated=[];
            foreach($sp as $item){
                $ctsp = ChiTietSanPham::where('san_pham_id', $item->id)->first();
                if(!empty($ctsp)){
                    if( $ctsp->dung_luong_id != $productdetail->dung_luong_id && $ctsp->mau_sac_id != $productdetail->mau_sac_id){
                        array_push($datarelated,$ctsp);
                    }
                }
            }
            return response() -> json([
                'data' => $datarelated,   
            ]);
        
        return response() -> json([
            'data' => $data,   
        ]);
    }
}
