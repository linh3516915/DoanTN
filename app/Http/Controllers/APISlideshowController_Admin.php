<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slideshow_Admin;

class APISlideshowController_Admin extends Controller
{
    //
    public function danhSach(){
        
        $dsslideshow = Slideshow_Admin::all();
            return response()-> json([
                    'success' => true,
                    'data'    => $dsslideshow
            ]);
    } 
    public function themSlideshow(Request $request)
    {
        $slideshow = new Slideshow_Admin();
        if ($request->hasFile('URL_anh')) {
            $image = $request->file('URL_anh');
            $imageName = $image->getClientOriginalName();
            $image->move(public_path('URL_anh'), $imageName);
            $slideshow -> ten_anh = $request -> ten_anh;
            $slideshow-> URL_anh = $imageName;
            $slideshow-> noi_dung = $request -> noi_dung;
            $slideshow->save();

            return response()->json(['message' => 'Thêm mới thành công'], 201);
        } else {
            return response()->json(['error' => 'Không có tệp hình ảnh nào được chọn.'], 400);
        }
    }
}
