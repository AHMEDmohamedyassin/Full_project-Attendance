<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use App\Models\User;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class AttendanceController {
    use ResponseTrait , PaginateTrait;

    /**
     * Manual Attendancef 
     * instructor who get the attendace by camera or by writing student code
     */
    public function ManualAttendance(){
        try{
            request()->validate([
                'token' => "required" ,
                'id' => 'required',              // lecture id
                'users_id' => 'required|array'   // array of student ids
            ]);

            // get user and check if exists
            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token' , 5);

            // get lecture and check if exists
            $lec = $user->lecture()->find(request('id'));

            if(!$lec) throw new \Exception('lecture not found' , 4);

            // attach users to lecture
            $attached_ids = [];
            for($i = 0 ; $i<count(request('users_id')) ; $i ++){
                $id = request('users_id')[$i];
                if(!User::find($id)) continue;
                $lec->attendance()->attach($id);
                $attached_ids[] = $id;
            }
            $data = [];
            $data['attached_ids'] = $attached_ids;
            $data['attached_ids_count'] = count($attached_ids);
            $data['not_attached_ids'] = array_diff(request('users_id') , $attached_ids);

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
                'token' => 'required',          // student token
                'app_token' => 'max:500'
            ]);

            // finding user
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            // finding lecture
            $lec = Lecture::find(request('id'));
            if(!$lec) throw new \Exception('lecture not found' , 4);

            $is_mobile = false;

            // check if student captured the qr_code form app or web
            if(request('app_token') == env('APP_TOKEN') ){
                $is_mobile = true;

                // check if lecture has expire date 
                if(!$lec->expire_date) throw new \Exception('error' , 9);
                $valid_date = Carbon::parse($lec->expire_date)->greaterThan(Carbon::now());   // check if attendance not expired
                
                // check if attendance is expired
                if(!$valid_date) throw new \Exception('attendance expired' , 8);
                
            }else{
                // check if lecture has capture_end_date and get difference in capture date and end showing qrcode date in minutes for web user
                if(!$lec->capture_end_date) throw new \Exception('error' , 9);
                $diff_in_min = Carbon::parse($lec->capture_end_date)->diffInMinutes(Carbon::now());

                // check if attendance is expired
                if($diff_in_min > env('GAP_SEND_MINUTES' , 2)) throw new \Exception('attendance expired' , 8);
            }

            // checking the sent ids similar to lecture ids and send the attendance
            $this->AutoAttendanceHelper($lec , $user , $is_mobile);


            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(4002 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * helper function for auto attendance method
     */
    public function AutoAttendanceHelper($lec , $user , $is_mobile = true){
        $path = $lec->qr_file;
        if (isset(request('qr_code_ids')['ids']) && isset(request('qr_code_ids')['end']) && Storage::exists($path)) {
            $content = Storage::get($path);     // get ids file content
            $json = json_decode($content);      // convert content to json     
            $ids = $json->ids;                  // get ids from json
            $end = $json->end;                  // get end from json
            $sent_ids = request('qr_code_ids')['ids'];  // get ids from user request
            $sent_end = request('qr_code_ids')['end'];  // get end from user request

            $good_ids_cout = 0;                 // count of succeed ids

            // check of sent end
            if($end != $sent_end) throw new \Exception('bad attendance request' , 7);

            // check of sent ids length if it is larger than minimum
            if(count($sent_ids) < env('LEAST_NEEDED_IDS')) throw new \Exception('bad attendance request' , 7);

            // looping for first 10 sent ids and breaking if found that one of this is not found 
            for($i = 0 ; $i < count($sent_ids) ; $i++){
                $id = $sent_ids[$i];
                    
                if(in_array($id , $ids)) $good_ids_cout += 1;
                else throw new \Exception('bad attendance request' , 7);

                if($i > env('MAX_CREATED_IDS' , 10)) break;
            }

            // check if user has minimum number of success ids
            if($good_ids_cout < env('LEAST_NEEDED_IDS' , 3))
                throw new \Exception('bad attendance request' , 7);
                    
            // submit attendance
            $lec->attendance()->attach($user , ['is_mobile' => $is_mobile]);

            return $this->SuccessResponse(); 
        }else throw new \Exception('bad attendance request' , 7);
    }    



    /**
     * update expire date of qrcode 
     */
    public function QRActivateAttendance () {
        try{
            request()->validate([
                'token' => 'required' ,
                'id' => 'required'               // lecture id
            ]);

            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            $lecture = $user->lecture()->find(request('id'));
            if(!$lecture) throw new \Exception('not found' , 6);

            $lecture->update([
                'capture_end_date' => Carbon::now()
            ]);

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(4003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * get student attendances
     * required student token
     */
    public function StudentAttendance() {
        try{
            request()->validate([
                'token' => 'required' ,
                'page' => 'integer'
            ]);

            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token'  , 5);

            // $attendance = $user->attendance()->orderBy('created_at' , 'Desc');
            $attendance = $user->attendance()->orderBy('pivot_created_at' , 'Desc');

            return $this->SuccessResponse($this->paginate($attendance , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(4004 , $e->getCode() , $e->getMessage());
        }
    }
}