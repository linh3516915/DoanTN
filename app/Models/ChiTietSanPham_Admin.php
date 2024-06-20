<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ChiTietSanPham_Admin extends Model
{
    use HasFactory;
    protected $table = "chi_tiet_san_pham";
    public function san_pham() {
        return $this->belongsTo(SanPham_Admin::class,'ten');
    }
    public function dung_luong() {
        return $this->belongsTo(DungLuong_Admin::class,'kich_thuoc');
    }
    public function mau_sac() {
        return $this->belongsTo(MauSac_Admin::class,'ten_mau_sac');
    }
    public function ram(){
        return $this->belongsTo(Ram_Admin::class,'loai_ram');
    }
}
