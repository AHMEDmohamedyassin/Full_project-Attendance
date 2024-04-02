<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;

/**
 * verification method check email , password_email_reset
 */
class VerifyController{
    use ResponseTrait ;


    /**
     * method used to verify the email 
     * url sent to user at email
     * the url contains signature and user_id 
     * method check the signature then validate the email
     */
    public function email_verification ($id , $hash) {
        try{
            $expires = $_GET['expires'];
            if(!URL::hasValidSignature(request()) || Carbon::createFromTimestamp($expires) < Carbon::now()){
                throw new \Exception('error in validation' , 7);
            }

            $user = User::find($id);
            $email_hashed = sha1($user->email);

            if($email_hashed != $hash)
                throw new \Exception('error in validation' , 7);

            $user->email_verified_at = (new Carbon())->now(); 
            $user->save();

            return $this->SuccessResponse(msg:'email verified successfully');

        }catch(\Exception $e){
            return $this->ErrorResponse(code:1001  , msg:$e->getMessage() , msg_code:$e->getCode());
        }
    }

    /**
     * method shows the form that contains password and confirm password fields
     */
    public function password_reset (){
        try{
            $token = $_GET['token'];
            $email = $_GET['email'];
    
            return view('Callback.ResetPassword' , ['email' => $email , 'token' => $token]);
        }catch(\Exception $e){
            return $this->ErrorResponse(code:1002 , msg:$e->getMessage() , msg_code:$e->getCode());
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
    
            return redirect('password_reset/done');
        }catch(\Exception $e){
            return $this->ErrorResponse(code:1003 ,msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }

}