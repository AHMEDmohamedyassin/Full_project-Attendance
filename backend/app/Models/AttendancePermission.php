<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendancePermission extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id" ,
        "lecture_id" ,
        "expire_date" 
    ];

    public function user() {
        return $this->belongsTo(User::class , 'user_id' , 'id');
    }

    public function lecture(){
        return $this->belongsTo(Lecture::class , 'lecture_id' , 'id');
    }
}
