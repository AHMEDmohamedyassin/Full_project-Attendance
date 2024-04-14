<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AttendancePermissionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollageController;
use App\Http\Controllers\LectureController;

Route::post('/auth/login' , [AuthController::class , 'LoginAuth']);
Route::post('/auth/register' , [AuthController::class , 'RegisterAuth']);
Route::post('/auth/logout' , [AuthController::class , 'LogoutAuth']);
Route::post('/auth/update' , [AuthController::class , 'UpdateAuth']);
Route::post('/auth/getdata' , [AuthController::class , 'GetUserDataAuth']);
Route::post('/auth/forgetpassword' , [AuthController::class , 'password_reset']);
Route::post('/auth/passwordreset' , [AuthController::class , 'password_reset_save']);


Route::post('/lecture/create' , [LectureController::class , 'CreateLecture']);
Route::post('/lecture/delete' , [LectureController::class , 'DeleteLecture']);
Route::post('/lecture/read' , [LectureController::class , 'ReadLecture']);
Route::post('/lecture/attendance' , [LectureController::class , 'AttendanceLecture']);
Route::post('/lecture/search' , [LectureController::class , 'SearchLecture']);

Route::post('/attendance/manual' , [AttendanceController::class , 'ManualAttendance']);
Route::post('/attendance/auto' , [AttendanceController::class , 'AutoAttendance']);
Route::post('/attendance/Qr' , [AttendanceController::class , 'QRActivateAttendance']);
Route::post('/attendance/student' , [AttendanceController::class , 'StudentAttendance']);

// collage routes
Route::middleware(['Admin'])->group(function () {
    Route::post('/collage/create' , [CollageController::class , 'CreateCollage']);
    Route::post('/collage/update' , [CollageController::class , 'UpdateCollage']);
    Route::post('/collage/delete' , [CollageController::class , 'DeleteCollage']);
    Route::post('/collage/masscreate' , [CollageController::class , 'MassCreateCollage']);
});
Route::post('/collage/read' , [CollageController::class , 'ReadCollage']);


// attendance permission
Route::post('/attendance/permission/create' , [AttendancePermissionController::class , 'CreateAtPre']);
Route::post('/attendance/permission/delete' , [AttendancePermissionController::class , 'DeleteAtPre']);
Route::post('/attendance/permission/manualattendance' , [AttendancePermissionController::class , 'ManulaAttendanceAtPre']);
Route::post('/attendance/permission/user/list' , [AttendancePermissionController::class , 'ListPermissionsAtPre']);
Route::post('/attendance/permission/instructor/list' , [AttendancePermissionController::class , 'ListInstructorPermissionsAtPre']);