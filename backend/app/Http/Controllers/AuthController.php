<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Password;
use App\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;

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
            $user['collage'] = $user->collage;


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
                'phone' => 'nullable|regex:/^[0-9]{11}$/',
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
                    'bn' => 'max:150|nullable',
                    'sec' => 'max:100|nullable',
                    'code' => 'max:200|nullable',
                    'group' => 'max:40|nullable'
                ]);

                $std = array_merge([
                    'bn' => null ,
                    'sec' => null ,
                    'code' => null ,
                    'group' => null ,
                ] , $std) ;

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
            $user['collage'] = $user->collage;
            $user['token'] = request('token');

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
                'phone' => 'nullable|regex:/^[0-9]{11}$/',
                'collage_id' => 'max:8',
            ]);

            // get user form database
            $user = auth()->setToken(request('token'))->user();

            if(!$user) throw new \Exception('bad token' , 5);

            // more validation for students
            if($user->role == 2){
                if(Carbon::now()->diffInHours(Carbon::parse($user->updated_at)) < env('UPDATE_PERIOD'))
                    throw new \Exception('can not update before period expiration' , 2);

                $std = request()->validate([
                    'bn' => 'nullable|max:150',
                    'sec' => 'nullable|max:100',
                    'code' => 'nullable|max:200',
                    'group' => 'nullable|max:40'
                ]);

                $std = array_merge([
                    'bn' => null ,
                    'sec' => null ,
                    'code' => null ,
                    'group' => null ,
                ] , $std) ;
                
                $data['json_data'] = json_encode($std);
            }

            // submit update
            $user->update($data);
            $user['collage'] = $user->collage;
            $user['token'] = request('token');

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1005 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * reset Password email
     * token expiration time updated to 60 minute in @file config/auth.php : password => user => expire
     */
    public function password_reset(){
        try{
            request()->validate(['email' => 'required']);

            $user = User::where('email' , request('email'))->first();

            if(!$user) throw new \Exception('email not found' , 11);

            $token = Password::createToken($user);
            $user->notify(new ResetPassword($token , request('email')));

            $user->password_reset_token = $token;            
            
            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:1006 , msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }



    /**
     * method that check the token and user_email and password before resetting the password
     * method delete token after user updated
     */
    public function password_reset_save(){
        try{
            request()->validate([
                'email' => 'required' , 
                'token' => 'required' , 
                'password' => 'required|max:255|confirmed|min:8' ,
                'password_confirmation' => 'required|max:255' ,
            ]);
    
            $user = Password::getUser(request()->only('email', 'password', 'password_confirmation', 'token'));
    
            $tokenIsValid = Password::tokenExists($user, request('token'));
            
            if(!$tokenIsValid) throw new \Exception('error in validation' , 7);
    
            $user->password = bcrypt(request()->input('password'));

            $user->save();

            Password::deleteToken($user);
    
            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:1007 ,msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }


    /**
     * method shows the form that contains password and confirm password fields
     */
    // public function password_reset (){
    //     try{
    //         $token = $_GET['token'];
    //         $email = $_GET['email'];
    
    //         return view('Callback.ResetPassword' , ['email' => $email , 'token' => $token]);
    //     }catch(\Exception $e){
    //         return $this->ErrorResponse(code:1007 , msg:$e->getMessage() , msg_code:$e->getCode());
    //     }
    // }

}
