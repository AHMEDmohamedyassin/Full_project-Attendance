<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Traits\ResponseTrait;
use Carbon\Carbon;

class AuthController {
    use ResponseTrait;


    /**
     * login method
     */
    public function LoginAuth(){
        try{
            $credentials = request()->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $token = auth()->attempt(['email' => request('email') , 'password' => request('password')]);

            if (!$token) {
                throw new \Exception('bad credentials' , 1);
            }

            $user = auth()->user();
            $user['token'] = $token;


            return $this->SuccessResponse($user);    
        }catch(\Exception $e){
            return $this->ErrorResponse(1001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * register method
     */
    public function RegisterAuth () {
        try{
            // public validation for users 
            $data = request()->validate([
                'name' => 'required|max:255',
                'phone' => 'required|regex:/^[0-9]{11}$/',
                'email' => 'required|email|max:255',
                'password' => 'required',
                'password_confirmation' => 'required|same:password',
                'collage_id' => 'required|max:8',
                'is_student' => 'required|boolean'
            ]);

            if(User::where('email' , request('email'))->first()) throw new \Exception('email already exists' , 10);

            // more validation for students
            if(request('is_student')){
                $std = request()->validate([
                    'bn' => 'required|max:150',
                    'sec' => 'required|max:100',
                    'code' => 'required|max:200',
                    'group' => 'required|max:40'
                ]);

                $data['json_data'] = json_encode($std);
            }else {
                $data['role'] = 1;     // set role as a instructor
            }

            // unset is_student from object 
            unset($data['is_student'] );

            User::create($data);

            return $this->LoginAuth();
        }catch(\Exception $e){
            return $this->ErrorResponse(1003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * logout method
     */
    public function LogoutAuth() {
        try{
            request()->validate(['token' => 'required']);
            
            auth()->setToken(request('token'))->logout();

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(1003 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * get user data from token
     */
    public function GetUserDataAuth(){
        try{
            $data = request()->validate(['token' => 'required']);

            $user = auth()->setToken(request('token'))->user();

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1004 , $e->getCode() , $e->getMessage());
        }
    }
    

    /**
     * update user data
     */
    public function UpdateAuth(){
        try{
            // public validation for users 
            $data = request()->validate([
                'token' => 'required',
                'name' => 'max:255',
                'phone' => 'regex:/^[0-9]{11}$/',
                'collage_id' => 'max:8',
            ]);

            // get user form database
            $user = auth()->setToken(request('token'))->user();

            // more validation for students
            if($user->role == 2){
                if(Carbon::now()->diffInHours(Carbon::parse($user->updated_at)) < env('UPDATE_PERIOD'))
                    throw new \Exception('can not update before period expiration' , 2);

                $std = request()->validate([
                    'bn' => 'required|max:150',
                    'sec' => 'required|max:100',
                    'code' => 'required|max:200',
                    'group' => 'required|max:40'
                ]);

                $data['json_data'] = json_encode($std);
            }

            // submit update
            $user->update($data);

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1005 , $e->getCode() , $e->getMessage());
        }
    }

}
