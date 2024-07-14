<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SanPham;
use App\Models\ChiTietSanPham;
use App\Models\MauSac_Admin;
use App\Models\DungLuong_Admin;
use App\Models\NhapHang;
use App\Models\HinhAnhSanPham;
use App\Models\HinhAnh;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use App\Providers\HelperServiceProvider;
class APINhapHangController extends Controller
{
    public function nhaphang(Request $rq){
        $ten_san_pham =HelperServiceProvider::ucfirstString( $rq->ten_san_pham);
        $sanpham= SanPham::Where('ten',$ten_san_pham)->first();
        $tenmau = MauSac_Admin::find($rq->mau_sac_id);
        $tendungluong= DungLuong_Admin::find($rq->dung_luong_id);
        $tenAdmin = User::find($rq->user_id);
        $dt = Carbon::now('Asia/Ho_Chi_Minh');

        // if($rq->hasFile('requestSelectedFile')){
        //     $hinhanhctsp = new HinhAnh(); 
        //     $imagectsp = $rq->file('requestSelectedFile');
        //     $imageNamectsp = $imagectsp->getClientOriginalName();
        //     $imagectsp->move(public_path('productdetail'), $imageNamectsp);
        //     $hinhanhctsp->san_pham_id = $sanpham ->id;
        //     $hinhanhctsp->mau_sac_id = $rq->mau_sac_id;
        //     $hinhanhctsp->ten_hinh_anh = 'productdetail/'.$imageNamectsp;
        //     $hinhanhctsp->isAvatarimage = 1;
        //     $hinhanhctsp->save();
        //     return response()->json(['success' =>false ,'m' => $imageNamectsp]);
        // }
        // else {
        //     return response()->json(['success' =>false ,'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
        // }




       if(empty($sanpham)){
        //themmoi
        $sp = new SanPham();
        $sp->ten = $ten_san_pham;
        $sp->nha_cung_cap_id = $rq->nha_cung_cap_id;
        $sp->loai_san_pham_id = $rq->loai_san_pham_id;
        if($rq->mo_ta == null){
            $sp->mo_ta = '';
        }
        else{
            $sp->mo_ta = $rq->mo_ta;
        }
        $sp->trang_thai_id = $rq->trang_thai_id;
        $sp->save();
    //    foreach ($rq-> as $key => $value) {
    //     # code...
    //    }
    // $test = $rq->requestSelectedFiles[0]->file('file');
    $files = $rq->requestSelectedFiles;

if ($files && count($files) > 0) {
    
    foreach ($files as $file) {
        
        $fileName = $file['file']->getClientOriginalName();
       
        // $fileType = $file['type'];
        // $fileSize = $file['file']->size;
        // $lastModified = $file['file']->lastModifiedDate;
        
        // Ví dụ: Lưu trữ tệp tin vào thư mục công khai (public)
        $file['file']->move(public_path('product'), $fileName);
        // Ví dụ: Lưu thông tin vào CSDL
        $hinhanhsp = new HinhAnhSanPham();
        $hinhanhsp->san_pham_id = $sp->id; // Giả sử $sp là đối tượng sản phẩm đã lưu
        $hinhanhsp->URL_anh = 'product/' . $fileName;
        $hinhanhsp->save();
    }

    // return response()->json([
    //     'success' => true,
    //     'message' => 'Thêm mới sản phẩm thành công',
    // ]);
} else {
    // return response()->json([
    //     'success' => false,
    //     'message' => 'Không có tệp nào được gửi xuống',
    // ]);
}
    // $test2 = $test->file('file');
    
        $ctsp =new ChiTietSanPham();
        $ctsp->ten =$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac) ;
        $ctsp->san_pham_id = $sp->id;
        $dungluong=DungLuong_Admin::where('id',$rq->dung_luong_id)->first();
        $mausac=MauSac_Admin::where('id',$rq->mau_sac_id)->first();
       
        $ctsp->dung_luong_id = $rq->dung_luong_id;
        $ctsp->mau_sac_id = $rq->mau_sac_id;
        $ctsp->so_luong= intval($rq->so_luong);
        $ctsp->gia = intval($rq->gia);
        $ctsp->phan_tram_giam= intval($rq->phan_tram_giam);
        $ctsp->gia_khuyen_mai = intval($rq->gia_khuyen_mai);
        $ctsp->luot_thich= 0;
        $ctsp->so_sao = 0;
        $ctsp->save();
        $ctsp->san_pham_ten = $sp->ten;
        $ctsp->dung_luong_ten = $dungluong->kich_thuoc;
        $ctsp->mau_sac_ten = $mausac->ten_mau_sac;
        if($rq->hasFile('requestSelectedFile')){
            $hinhanhctsp = new HinhAnh(); 
            $imagectsp = $rq->file('requestSelectedFile');
            $imageNamectsp = $imagectsp->getClientOriginalName();
            $imagectsp->move(public_path('productdetail'), $imageNamectsp);
            $hinhanhctsp->san_pham_id = $sp ->id;
            $hinhanhctsp->mau_sac_id = $rq->mau_sac_id;
            $hinhanhctsp->ten_hinh_anh = 'productdetail/'.$imageNamectsp;
            $hinhanhctsp->isAvatarimage = 1;
            $hinhanhctsp->save();
        }
        else {
            return response()->json(['success' =>false ,'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
        }
        $nhaphang= new NhapHang();
        $nhaphang->users_id = $rq->user_id;
        $nhaphang->san_pham_id = $sp->id;
        $nhaphang->dung_luong_id = $rq->dung_luong_id;
        $nhaphang->mau_sac_id = $rq->mau_sac_id;
        $nhaphang->ten_san_pham = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac);
        $nhaphang->so_luong = intval($rq->so_luong);
        $nhaphang->gia = intval($rq->gia);
        $nhaphang->thanh_tien= intval($rq->so_luong) * intval($rq->gia);
        if($rq->ghi_chu == ''){
            $nhaphang->log = 'Admin '.$tenAdmin->name.' đã thêm mới sản phẩm tên '
            .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
            .intval($rq->so_luong).' '.intval($rq->gia).' vào thời gian '.$dt->toDateTimeString();
            $nhaphang->ghi_chu = '';
        }
        else {
            $nhaphang->ghi_chu = $rq->ghi_chu;
            $nhaphang->log = 'Admin '.$tenAdmin->name.' đã thêm mới sản phẩm tên '
            .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
            .intval($rq->so_luong).' '.intval($rq->gia).' vào thời gian '.$dt->toDateTimeString();
        }
        $nhaphang->save();
        return response() -> json([
            'success' => true,
            'message' => 'thêm mới sản phẩm thành công' ,
            'data' =>$ctsp,
            'so_luong' =>  intval(intval($rq->so_luong))
        ]);
    }
       else{
        $ten_san_pham =HelperServiceProvider::ucfirstString( $rq->ten_san_pham);
        $sp= SanPham::Where('ten',$ten_san_pham)->first();
        $findctsp= ChiTietSanPham::where('san_pham_id', $sp->id)->where('dung_luong_id',$rq->dung_luong_id)
        ->where('mau_sac_id',$rq->mau_sac_id)->first();
        
        $findanhctsp = HinhAnh::where('san_pham_id',$sanpham->id)->where('mau_sac_id',$rq->mau_sac_id)
        ->where('isAvatarimage',1)->first();
        if(empty($findanhctsp)){
            if($rq->hasFile('requestSelectedFile')){
                $hinhanhctsp = new HinhAnh(); 
                $imagectsp = $rq->file('requestSelectedFile');
                $imageNamectsp = $imagectsp->getClientOriginalName();
                $imagectsp->move(public_path('productdetail'), $imageNamectsp);
                $hinhanhctsp->san_pham_id = $sanpham ->id;
                $hinhanhctsp->mau_sac_id = $rq->mau_sac_id;
                $hinhanhctsp->ten_hinh_anh = 'productdetail/'.$imageNamectsp;
                $hinhanhctsp->isAvatarimage = 1;
                $hinhanhctsp->save();
            }
            else {
                return response()->json(['success' =>false ,'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
            }
        }
        if(empty($findctsp)){
            $ctsp =new ChiTietSanPham();
            $dungluong=DungLuong_Admin::where('id',$rq->dung_luong_id)->first();
            $mausac=MauSac_Admin::where('id',$rq->mau_sac_id)->first();
            $ctsp->ten = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' .HelperServiceProvider::ucfirstString( $tenmau->ten_mau_sac);
            $ctsp->san_pham_id = $sanpham->id;
            $ctsp->dung_luong_id = $rq->dung_luong_id;
            $ctsp->mau_sac_id = $rq->mau_sac_id;
            $ctsp->so_luong= intval($rq->so_luong);
            $ctsp->gia = intval($rq->gia);
            $ctsp->phan_tram_giam= intval($rq->phan_tram_giam);
            $ctsp->gia_khuyen_mai = intval($rq->gia_khuyen_mai);
            $ctsp->luot_thich= 0;
            $ctsp->so_sao = 0;
            $ctsp->save();

            $ctsp->san_pham_ten = $sanpham->ten;
            $ctsp->dung_luong_ten = $dungluong->kich_thuoc;
            $ctsp->mau_sac_ten = $mausac->ten_mau_sac;

            $nhaphang= new NhapHang();
            $nhaphang->users_id = $rq->user_id;
            $nhaphang->san_pham_id = $sanpham->id;
            $nhaphang->dung_luong_id = $rq->dung_luong_id;
            $nhaphang->mau_sac_id = $rq->mau_sac_id;
            $nhaphang->ten_san_pham = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac);
            $nhaphang->so_luong = intval($rq->so_luong);
            $nhaphang->gia = intval($rq->gia);
            $nhaphang->thanh_tien= intval($rq->so_luong) * intval($rq->gia);
            if($rq->ghi_chu == ''){
                $nhaphang->log = 'Admin '.$tenAdmin->name.' đã thêm mới1 chi tiết sản phẩm tên '
                .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
                .intval($rq->so_luong).' '.intval($rq->gia).' vào thời gian '.$dt->toDateTimeString();
                 $nhaphang->ghi_chu = '';
            }   
            else {
                $nhaphang->log = 'Admin '.$tenAdmin->name.' đã thêm mới1 chi tiết sản phẩm tên '
                .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
                .intval($rq->so_luong).' '.intval($rq->gia).' vào thời gian '.$dt->toDateTimeString();
                $nhaphang->ghi_chu = $rq->ghi_chu;
            }
            $nhaphang->save();
            return response() -> json([
                'success' => true,
                'message' => 'thêm mới chi tiết sản phẩm thành công' ,
                'data' =>$ctsp,
                'so_luong' => intval($rq->so_luong)
            ]);
        }
        //capnhat
        else {
            $dungluong=DungLuong_Admin::where('id',$rq->dung_luong_id)->first();
            $mausac=MauSac_Admin::where('id',$rq->mau_sac_id)->first();
            // $sanpham=SanPham::where('id',$findctsp->san_pham_id)->first();
            $findctsp->san_pham_ten = $sp->ten;
            $findctsp->dung_luong_ten = $dungluong->kich_thuoc;
            $findctsp->mau_sac_ten = $mausac->ten_mau_sac;
            ChiTietSanPham::where('san_pham_id', $sanpham->id)
            ->where('dung_luong_id', $rq->dung_luong_id)
            ->where('mau_sac_id', $rq->mau_sac_id)
            ->update([
            'so_luong' => ChiTietSanPham::raw('so_luong + ' . intval($rq->so_luong)),
            'updated_at' => $dt,
        ]);
        $nhaphang= new NhapHang();
        $nhaphang->users_id = $rq->user_id;
        $nhaphang->san_pham_id = $sanpham->id;
        $nhaphang->dung_luong_id = $rq->dung_luong_id;
        $nhaphang->mau_sac_id = $rq->mau_sac_id;
        $nhaphang->ten_san_pham = $ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac);
        $nhaphang->so_luong = intval($rq->so_luong);
        $nhaphang->gia = intval($rq->gia);
        $nhaphang->thanh_tien= intval($rq->so_luong) * intval($rq->gia);
        if($rq->ghi_chu == ''){
            $nhaphang->log = 'Admin '.$tenAdmin->name.' đã cập nhập lại chi tiết sản phẩm tên '
            .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
            .intval($rq->so_luong).' '.intval($rq->gia).' vào thời gian '.$dt->toDateTimeString();
            $nhaphang->ghi_chu = '';
        }
        else { 
            $nhaphang->log = 'Admin '.$tenAdmin->name.' đã cập nhập lại chi tiết sản phẩm tên '
            .$ten_san_pham . ' ' . $tendungluong->kich_thuoc . ' ' . $tenmau->ten_mau_sac.' với số lượng và giá là '
            .intval($rq->so_luong).' '.intval($rq->gia).' vào thời gian '.$dt->toDateTimeString();
            $nhaphang->ghi_chu = $rq->ghi_chu;
        }
        $nhaphang->save();
        return response() -> json([
            'success' => true,
            'message' => 'cập nhật thành công',
            'data' =>$findctsp,
            'so_luong' => intval($rq->so_luong)
        ]);
        }
        // $findctsp->so_luong=$findctsp->so_luong + intval($rq->so_luong);
        // $findctsp->gia = intval($rq->gia);
        // $findctsp->updated_at = $dt;
        // $findctsp->save();
       
       }
    }
    public function capnhatproduct(Request $rq) {
        $product = SanPham::find($rq->id);
        $product->ten = $rq->ten;
        $product->nha_cung_cap_id = $rq->nha_cung_cap_id ;
        $product-> loai_san_pham_id = $rq->loai_san_pham_id;
        $product->trang_thai_id = $rq->trang_thai_id;
        if($rq->mo_ta == ''){
            $product->mo_ta = '';
        }
        else{
            $product->mo_ta = $rq->mo_ta;
        }
        $product->save();
        $ctsp = ChiTietSanPham::where('san_pham_id',$rq->id)->get();
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
        for($i=0;$i<count($ctsp);$i++){
            // $productdetail = ChiTietSanPham::where('id',$ctsp[$i]->id)->first();
            $tenmau = MauSac_Admin::find($ctsp[$i]->mau_sac_id);
            $tendungluong= DungLuong_Admin::find($ctsp[$i]->dung_luong_id);
            // $productdetail->ten = HelperServiceProvider::ucfirstString($product->ten).' '.$tendungluong->kich_thuoc.' '.HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac);
            // $productdetail->save();
            ChiTietSanPham::where('san_pham_id', $ctsp[$i]->san_pham_id)
            ->where('dung_luong_id', $ctsp[$i]->dung_luong_id)
            ->where('mau_sac_id', $ctsp[$i]->mau_sac_id)
            ->update([
                'ten' => 
                    HelperServiceProvider::ucfirstString($product->ten).' '.$tendungluong->kich_thuoc.' '.HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac)
                ,
                'updated_at' => $dt->toDateTimeString(),
            ]);
        }
        // $files = $rq->requestSelectedFiles;

        //$uploadedFiles = [];
      
    if($rq->file('photos') != null){
        foreach ($rq->file('photos') as $index => $file) {
            // $filename = time() . '_' . $index . '.' . $file->getClientOriginalExtension();
            // $file->storeAs('photos', $filename, 'public'); // Lưu vào thư mục 'public/photos'
            $fileName = $file->getClientOriginalName();
            $file->move(public_path('product'), $fileName);
            $hinhanhsp = new HinhAnhSanPham();
            $hinhanhsp->san_pham_id = $rq->id; // Giả sử $sp là đối tượng sản phẩm đã lưu
            $hinhanhsp->URL_anh = 'product/' . $fileName;
            $hinhanhsp->save();
        }
    }
    

    return response()->json([
        'success' => true,
    ]);
    }
    public function capnhatproductdetail(Request $rq){
        $ctsp = ChiTietSanPham::where('san_pham_id', $rq->san_pham_id)
        ->where('dung_luong_id', $rq->dung_luong_id)
        ->where('mau_sac_id', $rq->mau_sac_id)->first();
        // return response()->json([
        //     'success' => false,
        //     'message' => $ctsp
        // ]);
        // $ctsp -> so_luong = $rq->so_luong ; 
        // $ctsp ->gia = $rq->gia ; 
        // $ctsp->phan_tram_giam = $rq-> phan_tram_giam;
        // $ctsp ->gia_khuyen_mai = $rq->gia_khuyen_mai;
        // $ctsp->save();
        $dt = Carbon::now('Asia/Ho_Chi_Minh');
         $chitiet = ChiTietSanPham::where('san_pham_id', $ctsp->san_pham_id)
            ->where('dung_luong_id', $ctsp->dung_luong_id)
            ->where('mau_sac_id', $ctsp->mau_sac_id)
            ->update([
                // 'ten' => 
                //     HelperServiceProvider::ucfirstString($product->ten).' '.$tendungluong->kich_thuoc.' '.HelperServiceProvider::ucfirstString($tenmau->ten_mau_sac)
                // ,
                'so_luong' => intval($rq->so_luong),
                 'gia'=>intval($rq->gia),             
                 'phan_tram_giam'=>intval($rq->phan_tram_giam),       
                 'gia_khuyen_mai'=>intval($rq->gia_khuyen_mai),   
                'updated_at' => $dt->toDateTimeString(),
            ]);
            $findanhctsp = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)
            ->where('isAvatarimage',1)->first();
            if(!empty($findanhctsp)){
                
                if($rq->requestSelectedFile != []){
                    $findanhctsp = HinhAnh::where('san_pham_id',$ctsp->san_pham_id)->where('mau_sac_id',$ctsp->mau_sac_id)
                    ->where('isAvatarimage',1)->delete();
                    if($rq->hasFile('requestSelectedFile')){
                        $hinhanhctsp = new HinhAnh(); 
                        $imagectsp = $rq->file('requestSelectedFile');
                        $imageNamectsp = $imagectsp->getClientOriginalName();
                        $imagectsp->move(public_path('productdetail'), $imageNamectsp);
                        $hinhanhctsp->san_pham_id = $ctsp->san_pham_id;
                        $hinhanhctsp->mau_sac_id = $ctsp->mau_sac_id;
                        $hinhanhctsp->ten_hinh_anh = 'productdetail/'.$imageNamectsp;
                        $hinhanhctsp->isAvatarimage = 1;
                        $hinhanhctsp->save();
                    }
                    else {
                        return response()->json(['success' =>false ,'error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
                    }
                }
               
            }
        return response()->json([
            'success' => true,
            // 'data' => ChiTietSanPham::where('san_pham_id', $ctsp->san_pham_id)
            // ->where('dung_luong_id', $ctsp->dung_luong_id)
            // ->where('mau_sac_id', $ctsp->mau_sac_id)
        ]);
    }
    public function xoaproductdetail(Request $rq){
        $chitietsp = ChiTietSanPham::where('san_pham_id', $rq->san_pham_id)
        ->where('dung_luong_id', $rq->dung_luong_id)
        ->where('mau_sac_id', $rq->mau_sac_id);
        $chitiet = ChiTietSanPham::where('san_pham_id', $rq->san_pham_id)
        ->where('dung_luong_id', $rq->dung_luong_id)
        ->where('mau_sac_id', $rq->mau_sac_id)
        ->delete();
        $hinhanhdel = HinhAnh::where('san_pham_id', $rq->san_pham_id)
        ->where('mau_sac_id', $rq->mau_sac_id)->where('isAvatarimage' , 1)->first();
        if ($hinhanhdel && $hinhanhdel->ten_hinh_anh && Storage::exists('public/' . $hinhanhdel->ten_hinh_anh)) {
            Storage::delete('public/' . $hinhanhdel->ten_hinh_anh);
        }
        $hinhanh = HinhAnh::where('san_pham_id', $rq->san_pham_id)
        ->where('mau_sac_id', $rq->mau_sac_id)->where('isAvatarimage' , 1)
        ->delete();
        
        if($chitiet>0){
            return response()->json([
                'success' => true,
                'message' => 'thành công',
                'data' =>$chitietsp 
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'không thành công'
        ]);
    }
}
