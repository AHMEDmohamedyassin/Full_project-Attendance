<?php

namespace App\Traits;

Trait PaginateTrait {
    
    public function paginate($class , $page = 1 , $perPage = 0){
        if(!$perPage) $perPage = env('PER_PAGE');

        $data = $class->paginate($perPage , ['*'] , 'page' , $page);

        $result = [
            'current' => $data->currentPage(),
            'last' => $data->lastPage(),
            'total' => $data->total(),
            'perPage' => $data->perPage(),
            'hasMore' => $data->hasMorePages(),
            'items' => $data->items()
        ];

        return $result;
    }
}