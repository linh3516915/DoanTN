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
        $user-> name = $rq->name;
        $user-> email = $rq->email;
        $user -> password = Hash::make($rq->password);
        $user->save();
    }
}
