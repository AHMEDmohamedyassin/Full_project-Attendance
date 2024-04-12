<?php

namespace App\Http\Controllers;

use App\Models\Lecture;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class LectureController {
    use ResponseTrait , PaginateTrait;


    /**
     * creating lecture method
     */
    public function CreateLecture () {
        try{
            request()->validate([
                'token' => 'required' ,
                'title' => 'required|max:255',
                'exp_hours' => 'required|integer|max:720'
            ]);

            // get user
            $user = auth()->setToken(request('token'))->user();
            
            if(!$user) throw new \Exception('bad token' , 5);

            // check if user is instructor or admin
            if($user->role == 2) throw new \Exception('not instructor' , 3);

            // create lectrue
            $lec = Lecture::create([
                'title' => request('title'),
                'user_id' => $user->id,
                'expire_date' => Carbon::now()->addHours(env('EXPIRE_DATE' , 1))
            ]);

            // creating and storing qrcode tokens
            $file_name = $this->CreatingStoringQrcodeTokens($lec->id);

            $lec->update(['qr_file' => $file_name]);

            return $this->SuccessResponse($lec);
        }catch(\Exception $e){
            return $this->ErrorResponse(2001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * delete lectures method
     */
    public function DeleteLecture () {
        try{
            request()->validate([
                'token' => 'required',
                'lecture_id' => 'required'
            ]);


            $user = auth()->setToken(request('token'))->user();
            
            if(!$user) throw new \Exception('bad token' , 5);

            $lec = $user->lecture()->find(request('lecture_id'));

            // check if lecture exists
            if(!$lec) 
                throw new \Exception('lecture not found' , 4);

            // delete qr_file
            if($lec->qr_file)
                Storage::delete($lec->qr_file);

            $lec->delete();

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(2002 , $e->getCode() , $e->getMessage());
        }
    }
    
    /**
     * read lectures data
     */
    public function ReadLecture () {
        try{
            request()->validate([
                'id' => 'integer|required' ,
                'token' => 'required',
            ]);

            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token' , 5);

            $lecture = $user->lecture()->find(request('id'));

            if(!$lecture) throw new \Exception('not found' , 6);

            if(Storage::fileExists($lecture->qr_file))
                $lecture->qr_ids = Storage::get($lecture->qr_file);
            
            return $this->SuccessResponse($lecture);
        }catch(\Exception $e){
            return $this->ErrorResponse(2003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * lecture attendance
     */
    public function AttendanceLecture(){
        try{
            request()->validate([
                'id' => 'integer|required' ,
                'token' => 'required',
                'page' => 'integer',
                'perpage' => 'integer'
            ]);

            
            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token' , 5);

            $lecture = $user->lecture()->find(request('id'));

            if(!$lecture) throw new \Exception('not found' , 6);

            $attendance = $lecture->attendance()->orderBy('created_at' , 'Desc');

            if(!request('page')){
                return $this->SuccessResponse($attendance->get());
            }

            return $this->SuccessResponse($this->paginate($attendance , request('page') , perPage:request('perpage')));
        }catch(\Exception $e){
            return $this->ErrorResponse(2003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * search Lecture
     */
    public function SearchLecture () {
        try{
            request()->validate([
                'title' => 'max:255' ,
                'token' => 'required',
                'page' => 'integer'
            ]);

            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token' , 5);

            $lecture = $user->lecture()->where('title' , 'LIKE' , '%'.request('title').'%')->orderBy("created_at" , "Desc");

            return $this->SuccessResponse($this->paginate($lecture , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(2003 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * helper @method for creating qrcode tokens and storing  it into json files
     */
    public function CreatingStoringQrcodeTokens ($lec_id) {
        $file_name = 'qrcode_ids/' . $lec_id . '.json';
        $ids = [];
        
        for($i = 0 ; $i < random_int(6 , 10) ; $i ++ ){
            $uuid = Uuid::uuid4();
            $ids[] = $uuid;
        }

        $data = [
            'ids' => $ids,
            'end' => Uuid::uuid4()
        ];

        Storage::put($file_name , json_encode($data));

        return $file_name;
    }
}