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
        "capture_end_date" ,
    ];


    public function user () {
        return $this->belongsTo(User::class , 'user_id' , 'id');
    }

    public function attendance () {
        return $this->belongsToMany(User::class , 'attendances' , 'lecture_id' , 'user_id')->withTimestamps();
    }

    public function attendance_permission(){
        return $this->hasMany(AttendancePermission::class , 'lecture_id' , 'id');
    }
}
