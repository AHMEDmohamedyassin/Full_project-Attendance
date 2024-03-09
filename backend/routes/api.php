<?php

use App\Http\Controllers\AttendanceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollageController;
use App\Http\Controllers\LectureController;

Route::post('/auth/login' , [AuthController::class , 'LoginAuth']);
Route::post('/auth/register' , [AuthController::class , 'RegisterAuth']);
Route::post('/auth/logout' , [AuthController::class , 'LogoutAuth']);
Route::post('/auth/update' , [AuthController::class , 'UpdateAuth']);
Route::post('/auth/getdata' , [AuthController::class , 'GetUserDataAuth']);


Route::post('/lecture/create' , [LectureController::class , 'CreateLecture']);
Route::post('/lecture/delete' , [LectureController::class , 'DeleteLecture']);
Route::post('/lecture/read' , [LectureController::class , 'ReadLecture']);
Route::post('/lecture/attendance' , [LectureController::class , 'AttendanceLecture']);
Route::post('/lecture/search' , [LectureController::class , 'SearchLecture']);

Route::post('/attendance/manual' , [AttendanceController::class , 'ManualAttendance']);
Route::post('/attendance/auto' , [AttendanceController::class , 'AutoAttendance']);

Route::get('/collage/read' , [CollageController::class , 'ReadCollage']);
Route::post('/collage/create' , [CollageController::class , 'CreateCollage']);
Route::post('/collage/update' , [CollageController::class , 'UpdateCollage']);
Route::post('/collage/delete' , [CollageController::class , 'DeleteCollage']);