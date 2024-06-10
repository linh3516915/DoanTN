<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\APISanPhamController;
use App\Http\Controllers\APIChiTietSanPhamController;
use App\Http\Controllers\APIDonHangController;
use App\Http\Controllers\APIOTPController;
use App\Http\Controllers\AddressController;
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

});
Route::group([
    'prefix' => 'productdetail'
], function ($router) {

    Route::get('showLists', [APIChiTietSanPhamController::class,'Listproductdetails']);
    Route::get('showList', [APIChiTietSanPhamController::class,'Listproductdetail']);
    Route::get('top8hottrending', [APIChiTietSanPhamController::class,'top8hottrending']);
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

