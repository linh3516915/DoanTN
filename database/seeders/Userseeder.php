<?php

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
class Userseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Request $rq): void
    {
        $user= new User();
        $user-> name = 'Admin';
        $user-> email = '0306211446@caothang.edu.vn';
        $user -> password = Hash::make('123456');
        $user->save();
    }
}
