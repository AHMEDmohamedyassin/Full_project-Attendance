<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collage extends Model
{
    use HasFactory;

    protected $fillable = [
        "ar_name" ,
        "en_name" ,
        "slug" ,
        "ar_university" ,
        "en_university" ,
    ];

    public function user (){
        return $this->hasMany(User::class , 'collage_id' , 'id');
    } 
}
