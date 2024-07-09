<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        
    }
    public static function ucfirstString($string)
            {
                $words = explode(' ', $string);
                $data=[];
                foreach ($words as &$word) {
                    $word = ucfirst(strtolower($word));
                    array_push($data,$word);
                }
                return  trim(implode(' ', $data));
            }
}
