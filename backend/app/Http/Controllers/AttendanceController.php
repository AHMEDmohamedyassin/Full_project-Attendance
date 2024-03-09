<?php

namespace App\Http\Controllers;

use App\Traits\ResponseTrait;

class AttendanceController {
    use ResponseTrait;

    /**
     * Manual Attendancef 
     * instructor who get the attendace by camera or by writing student code
     */
    public function ManualAttendance(){
        try{
            $data = request()->validate([
                'token' => "required" ,
                'id' => 'required',
                'users_id' => 'required|array'
            ]);

            // get user and check if exists
            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token' , 5);

            // get lecture and check if exists
            $lec = $user->lecture()->find(request('id'));

            if(!$lec) throw new \Exception('lecture not found' , 4);

            // attach users to lecture
            $lec->attendance()->attach(request('users_id'));

            return $this->SuccessResponse($data);
        }catch(\Exception $e) {
            return $this->ErrorResponse(4001 , $e->getCode() , $e->getMessage());
        }
    }
    
    
    /**
     * AutoAttendance 
     * student who take the attendance immediately or by mobile app
     */
    public function AutoAttendance(){
        try{
            request()->validate([
                'id' => 'required',   // lecture id
                'qr_code_ids' => 'required|array',
                'token' => 'required',
                'app_token' => 'max:500'
            ]);

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(4001 , $e->getCode() , $e->getMessage());
        }
    }
}