<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id" ,
        "title" ,
        "qr_file" ,
        "expire_date" ,
        "student_count" ,
    ];


    public function user () {
        return $this->belongsTo(User::class , 'user_id' , 'id');
    }

    public function attendance () {
        return $this->belongsToMany(User::class , 'attendances' , 'lecture_id' , 'user_id');
    }
}
