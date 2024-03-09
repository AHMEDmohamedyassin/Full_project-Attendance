<?php


namespace App\Http\Controllers;

use App\Models\Collage;
use App\Traits\PaginateTrait;
use App\Traits\ResponseTrait;

class CollageController{
    use ResponseTrait , PaginateTrait;

    /**
     * create collage
     * @method for admin
     */
    public function CreateCollage() {
        try{
            $data = request()->validate([
                "ar_name" => 'max:255' ,
                "en_name" => 'max:255' ,
                "slug" => 'max:255' ,
                "ar_university" => 'max:255' ,
                "en_university" => 'max:255' ,
            ]);

            $col = Collage::create($data);

            return $this->SuccessResponse($col);
        }catch(\Exception $e){
            return $this->ErrorResponse(3001 , $e->getCode() , $e->getMessage());
        }
    }

    /**
     * delete collage
     * @method for admin
     */
    public function DeleteCollage() {
        try{
            request()->validate(['id' => 'required|integer']);

            $col = Collage::find(request('id'));

            // check if collage found
            if(!$col) 
                throw new \Exception('not found' , 6);


            $col->delete();
            
            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(3002 , $e->getCode() , $e->getMessage());
        }
    }

    /**
     * update collage
     * @method for admin
     */
    public function UpdateCollage() {
        try{
            $data = request()->validate([
                "id" => "required|integer",
                "ar_name" => 'max:255' ,
                "en_name" => 'max:255' ,
                "slug" => 'max:255' ,
                "ar_university" => 'max:255' ,
                "en_university" => 'max:255' ,
            ]);

            $col = Collage::find(request('id'));

            // check if collage found
            if(!$col) throw new \Exception('not found' , 6);

            // remove collage id from $data
            unset($data['id']);

            // updating
            $col->update($data);

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(3003 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * search and listing collages 
     */
    public function ReadCollage() {
        try{
            request()->validate(['title' => 'max:255' , 'page' => 'integer']);


            $col = Collage::where('ar_name' , 'LIKE' , '%'.request('title').'%' )
            ->orWhere('en_name' , 'LIKE' , '%'.request('title').'%' )
            ->orWhere('slug' , 'LIKE' , '%'.request('title').'%' )
            ->orWhere('ar_university' , 'LIKE' , '%'.request('title').'%' )
            ->orWhere('en_university' , 'LIKE' , '%'.request('title').'%' );

            return $this->SuccessResponse($this->paginate($col , request('page')));
        }catch(\Exception $e){
            return $this->ErrorResponse(3004 , $e->getCode() , $e->getMessage());
        }
    }

}