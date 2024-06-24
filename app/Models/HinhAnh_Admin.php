<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HinhAnh_Admin extends Model
{
    use HasFactory;
    protected $table = "hinh_anh";
    public function chi_tiet_san_pham(){
        return $this->belongsTo(ChiTietSanPham_Admin::class,'ten');
    }
}
