<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietCauHinh_Admin extends Model
{
    use HasFactory;
    protected $table = "chi_tiet_cau_hinh";
    public function san_pham() {
        return $this->belongsTo(SanPham_Admin::class);
    }
}
