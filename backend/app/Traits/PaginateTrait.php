<?php

namespace App\Traits;

Trait PaginateTrait {
    
    public function paginate($class , $page = 1){
        $data = $class->paginate(env('PER_PAGE') , ['*'] , 'page' , $page);

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