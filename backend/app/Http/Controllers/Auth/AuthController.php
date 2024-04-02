<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ResetPassword;
use App\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Password;


/**
 * Auth controller handling accout of users
 * error code : 0000
 */
class AuthController extends Controller
{
    use ResponseTrait;

    /**
     * regester , creating new user account then login
     */
    public function register () {
        
        try{
            request()->validate([
                'name' => 'required|max:255' , 
                'phone' => 'required|max:20' , 
                'whatsapp' => 'required|max:20' , 
                'email' => 'required|max:255' ,
                'password' => 'required|max:255|confirmed|min:8' ,
                'password_confirmation' => 'required|max:255' ,
            ]);

            if(User::where('email' , request('email'))->first())
                throw new \Exception('email exists before' , 21);

            request()->validate(['email' => 'required|unique:users|max:255']);

            $user = User::create([
                'name' => request('name'),
                'phone' => request('phone'),
                'whatsapp' => request('whatsapp'),
                'email' => request('email'),
                'password' => Hash::make(request('password')),
            ]);

            return $this->login();

        }catch(\Exception $e){
            return $this->ErrorResponse(code:0001 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * login 
     */
    public function login(){
        try{
            request()->validate([
                'email' => 'required|max:255' ,
                'password' => 'required|max:255|min:8' ,
            ]);

            $credentials = request(['email', 'password']);

            $token = auth()->attempt($credentials);
            
            $user_data = auth()->user();
            
            if(!$user_data) throw new \Exception('user not found' , 1);

            $user_data->token = $token;

            $user_data->products = $user_data->product()->get('id');

            return  $this->SuccessResponse($user_data);

        }catch(\Exception $e){
            return $this->ErrorResponse(code:0002 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * logout
     */
    public function logout(){
        try{
            request()->validate([
                'token' => 'required' ,
            ]);

            $user = auth()->setToken(request('token'));
            if(!$user->user()) throw new \Exception('token not valid' , 2);
            $user->logout(true);

            return $this->SuccessResponse(msg:'user loged out successfully');

        }catch(\Exception $e){
            return $this->ErrorResponse(code:0003 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * get user data from token
     */
    public function user_data () {
        try{
            request()->validate([
                'token' => 'required' ,
            ]);

            $user_data = auth()->setToken(request('token'))->user();
            if(!$user_data) throw new \Exception('token not valid' , 2);

            $user_data->token = request('token');

            $user_data->products = $user_data->product()->get('id');

            return $this->SuccessResponse($user_data );

        }catch(\Exception $e){
            return $this->ErrorResponse(code:0004 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * sending email message to verify email
     */
    public function email_verify(){
        try{
            request()->validate([
                'token' => 'required' ,
            ]);

            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('token not valid' , 2);
            if($user->email_verified_at != null) throw new \Exception('the email is already verified' , 3);

            $user->notify(new VerifyEmail($user));

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:0005 , msg:$e->getMessage() , msg_code:$e->getCode());
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

            if(!$user) throw new \Exception('email not found' , 22);

            $token = Password::createToken($user);
            $user->notify(new ResetPassword($token , request('email')));

            $user->password_reset_token = $token;            
            
            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:0006 , msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * update users name , phone , whatsapp
     * user can not update his data more than one time in 30 days
     */
    public function update_user(){
        try{
            request()->validate([
                'token' => 'required',
                'name' => 'required',
                'phone' => 'required',
                'whatsapp' => 'required',
            ]);

            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('token not valid' , 2);
            if($user->updated_at > \Carbon\Carbon::now()->subDays(env('USER_UPDATE_PERIOD' , 30))) throw new \Exception('user must not be updated twice in '.env('USER_UPDATE_PERIOD' , 30).' days' , 4);

            $user->update([
                'name' => request('name'),
                'phone' => request('phone'),
                'whatsapp' => request('whatsapp'),
            ]);

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:0007 , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    } 



    /**
     * updating user email if passed and setting user email_verified_at = null
     * updating user password if passed by checking the old password
     */
    public function update_email_password(){
        try{
            request()->validate([
                'token' => 'required',
                'old_password' => 'max:255|min:8',
                'password' => 'max:255|confirmed|min:8',
                'password_confirmation' => '',
                'email' => 'max:255',
            ]);

            // validating 
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('token not valid' , 2);
            if(request('password') && !request('old_password')) throw new \Exception('old password is required' , 5);

            // check if user need to change email
            if(request('email')){
                if(User::where('email' , request('email'))->first()) throw new \Exception('emial exists before' , 21);
                $user->email_verified_at = null;
                $user->email = request('email');
                request()->validate(['email' => 'unique:users|max:255']);
            }

            // check if user need to change password
            if(request('password')){
                if(!Hash::check(request('old_password'), $user->password)) throw new \Exception('old password is wrong' , 6);

                $user->password = Hash::make(request('password'));
            }

            $user->save();

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:'0008' , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

}
