<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietSanPham extends Model
{
    use HasFactory;
    protected $table = "chi_tiet_san_pham";
    public function mau_sac(){
        return $this->belongsTo(MauSac::class,$id);
    }
    public function dung_luong(){
        return $this->belongsTo(DungLuong::class,$id);
    }
    public function ram(){
        return $this->belongsTo(Ram::class,$id);
    }
}
