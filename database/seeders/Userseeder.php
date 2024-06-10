<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class Userseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user= new User();
        $user-> name = 'Phan Chí Đạt';
        $user-> email = 'dat0335405877@gmail.com';
        $user -> password = Hash::make('123456');
        $user->save();
    }
}
