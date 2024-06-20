<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UaThich_Admin extends Model
{
    use HasFactory;
    protected $table = "ua_thich";
    // public function chiTietSanPham()
    // {
    //     return $this->belongsTo(ChiTietSanPham::class, 'chi_tiet_san_pham_id');
    // }
}
