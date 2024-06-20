<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\APISanPhamController;
use App\Http\Controllers\APIChiTietSanPhamController;
use App\Http\Controllers\APIDonHangController;
use App\Http\Controllers\APIOTPController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\APIHinhAnhController;
use App\Http\Controllers\APISoTongDaiController_Admin;
use App\Http\Controllers\APIChiNhanhController_Admin;
use App\Http\Controllers\APISanPhamController_Admin;
use App\Http\Controllers\APINhaCungCapController_Admin;
use App\Http\Controllers\APIChiTietSanPhamController_Admin;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class,'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::get('profile', [AuthController::class,'profile']);

});
Route::group([
    'prefix' => 'product'
], function ($router) {

    Route::get('showList', [APISanPhamController::class,'Listproduct']);
    Route::post('themmoi', [APISanPhamController::class,'themmoi']);
    Route::post('capnhat', [APISanPhamController::class,'capnhat']);
    Route::get('capnhattatca', [APISanPhamController::class,'capnhattatca']);

});
Route::group([
    'prefix' => 'productdetail'
], function ($router) {

    Route::get('showLists', [APIChiTietSanPhamController::class,'Listproductdetails']);
    Route::post('productdetail', [APIChiTietSanPhamController::class,'productdetail']);
    Route::get('showList', [APIChiTietSanPhamController::class,'Listproductdetail']);
    Route::post('listdungluong', [APIChiTietSanPhamController::class,'listdungluong']);
    Route::post('listmausac', [APIChiTietSanPhamController::class,'listmausac']);
    Route::get('top8hottrending', [APIChiTietSanPhamController::class,'top8hottrending']);
    Route::get('latesproduct', [APIChiTietSanPhamController::class,'latesproduct']);
    Route::get('topseller', [APIChiTietSanPhamController::class,'topseller']);
});

Route::group([
    'prefix' => 'donhang'
], function ($router) {

    Route::post('addnew', [APIDonHangController::class,'DatHang']);
    Route::get('showLists', [APIChiTietSanPhamController::class,'Listproductdetails']);
    Route::get('showList', [APIChiTietSanPhamController::class,'Listproductdetail']);
    
});

Route::group([
    'prefix' => 'otp'
], function ($router) {

    Route::post('sendotp', [APIOTPController::class,'sendOTP']);
    Route::post('delotp', [APIOTPController::class,'delOTP']);
    Route::post('sendotpagain', [APIOTPController::class,'sendOTPAgain']);
    Route::post('checkotp', [APIOTPController::class,'checkOTP']);
});
Route::group([
    'prefix' => 'address'
], function ($router) {

    Route::get('province', [AddressController::class,'province']);
    Route::post('district', [AddressController::class,'district']);
    Route::post('ward', [AddressController::class,'ward']);
});
Route::group([
    'prefix' => 'hinhanh'
], function ($router) {

    Route::post('anhsanpham', [APIHinhAnhController::class,'laydanhsach']);
});


//Admin

Route::group([
    'prefix' => 'diachi'
], function ($router) {

    Route::get('chinhanh-admin', [APIChiNhanhController_Admin::class, 'danhSach']);
    
});
Route::group([
    'prefix' => 'tongdai'
], function ($router) {

    Route::get('tongdai-admin', [APISoTongDaiController_Admin::class, 'danhSach']);
    
});
Route::group([
    'prefix' => 'sanpham'
], function ($router) {

    Route::get('sanpham-admin', [APISanPhamController_Admin::class, 'danhSach']);
    Route::post('themmoi-sanpham', [APISanPhamController_Admin::class, 'themSanPham']);
    Route::post('capnhat-sanpham/{id}', [APISanPhamController_Admin::class, 'capNhat']);
    Route::get('xoa-sanpham/{id}', [APISanPhamController_Admin::class, 'xoa']);
    
});
Route::group([
    'prefix' => 'nhacungcap'
], function ($router) {

    Route::get('nhacungcap-admin', [APINhaCungCapController_Admin::class, 'danhSach']);
    Route::post('themmoi-nhacungcap', [APINhaCungCapController_Admin::class, 'themNCC']);
    Route::post('capnhat-nhacungcap/{id}', [APINhaCungCapController_Admin::class, 'capNhat']);
    Route::get('xoa-nhacungcap/{id}', [APINhaCungCapController_Admin::class, 'xoa']);
    
});
Route::group([
    'prefix' => 'ctsp'
], function ($router) {

    Route::get('ctsp-admin/{id}', [APIChiTietSanPhamController_Admin::class, 'danhSach']);
    Route::post('themmoi-ctsp/{id}', [APIChiTietSanPhamController_Admin::class, 'themctsp']);
    Route::post('capnhat-nhacungcap/{id}', [APIChiTietSanPhamController_Admin::class, 'capNhat']);
    Route::get('xoa-nhacungcap/{id}', [APIChiTietSanPhamController_Admin::class, 'xoa']);
    
});