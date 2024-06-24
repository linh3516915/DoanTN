<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ChiTietSanPham_Admin extends Model
{
    use HasFactory;
    protected $table = "chi_tiet_san_pham";
    public function san_pham_ten() {
        return $this->belongsTo(SanPham_Admin::class,'ten');
    }
    public function dung_luong_ten() {
        return $this->belongsTo(DungLuong_Admin::class,'kich_thuoc');
    }
    public function mau_sac_ten() {
        return $this->belongsTo(MauSac_Admin::class,'ten_mau_sac');
    }
    public function ram_ten(){
        return $this->belongsTo(Ram_Admin::class,'loai_ram');
    }
}
