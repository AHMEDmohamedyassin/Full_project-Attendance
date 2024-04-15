<?php

namespace App\Http\Controllers;

use App\Models\AttendancePermission;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendancePermissionController extends AttendanceController
{
    use ResponseTrait , PaginateTrait;
    

    /**
     * create permission for user to be able to record attendance instead of lecturer
     */
    public function CreateAtPre(){
        try{
            request()->validate([
                'token' => 'required|string',
                'lect_id' => 'required|numeric' ,
                'stud_id' => 'required|numeric' ,
                'expire_minutes' => 'numeric|between:1,100'
            ]);

            // check token
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);
            
            // check student id
            $stud = User::find(request('stud_id'));
            if(!$stud) throw new \Exception('student not found' , 6);

            // check lecture
            $lect = $user->lecture()->find(request('lect_id'));
            if(!$lect) throw new \Exception('lecture not found' , 6);

            $date = Carbon::now()->addMinutes(env('DEF_ATTN_PERMISSION_EXP'));
            if(request('expire_minutes'))
                $date = Carbon::now()->addMinutes(request('expire_minutes'));
            

            $permission = $lect->attendance_permission()->create([
                'user_id' => request('stud_id'),
                'expire_date' => $date
            ]);

            if($permission->id)
                $permission = AttendancePermission::with('user')->find($permission->id);

            return $this->SuccessResponse($permission);
        }catch(\Exception $e){
            return $this->ErrorResponse(5001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * delete permission
     */
    public function DeleteAtPre(){
        try{
            request()->validate([
                'token' => 'required|string',
                'attendance_id' => 'required|numeric' ,
            ]);

            // check token
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            // check attendance
            $att = AttendancePermission::find(request('attendance_id'));
            if(!$att) throw new \Exception('not found' , 6);

            // check user if own the lecture
            $lect = $att->lecture;
            if($lect->user != $user) throw new \Exception('not found' , 6);
            
            $att->delete();

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(5002 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * store attendance for students from the user not instructor
     */
    public function ManulaAttendanceAtPre(){
        try{
            request()->validate([
                'token' => 'required|string',
                'id' => 'required',              // lecture id
                'users_id' => 'required|array'   // array of student ids
            ]);

            // check token
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            $att = $user->attendance_permission()->where([
                'lecture_id' => request('id')
            ])->where('expire_date' , '>' , Carbon::now())->first();

            if(!$att) throw new \Exception('not found' , 6); 

            $data = $this->ManulaAttendanceHelper($att->lecture , request('users_id'));

            return $this->SuccessResponse($data);
        }catch(\Exception $e){
            return $this->ErrorResponse(5003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * list permissions for user not instructor
     */
    public Function ListPermissionsAtPre(){
        try{
            request()->validate([
                'token' => 'required|string',
                'page' => 'numeric'
            ]);

            // check token
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            $data = $user->attendance_permission()->with('lecture')->where('expire_date' , '>' , Carbon::now())->orderBy('id' , 'Desc');

            return $this->SuccessResponse($this->paginate($data , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(5004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * list permissions of lecture for instructor
     */
    public function ListInstructorPermissionsAtPre () {
        try{
            request()->validate([
                'token' => 'required|string',
                'id' => 'required',              // lecture id
                'page' => 'numeric'
            ]);

            // check token
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            // check lecture
            $lect = $user->lecture()->find(request('id'));
            if(!$lect) throw new \Exception('lecture not found' , 6);

            $data = $lect->attendance_permission()->with('user')->where('expire_date' , '>' , Carbon::now())->orderBy('id' , 'Desc');

            return $this->SuccessResponse($this->paginate($data , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(5004 , $e->getCode() , $e->getMessage());
        }
    }
}
