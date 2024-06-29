<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPham_Admin extends Model
{
    use HasFactory;
    protected $table = "san_pham";

    public function nha_cung_cap_ten() {
        return $this->belongsTo(NhaCungCap_Admin::class,'ten');
    }
    public function loai_san_pham_ten() {
        return $this->belongsTo(NhaCungCap::class,'ten_loai');
    }
}
