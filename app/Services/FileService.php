<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Mockery\Exception;
use phpDocumentor\Reflection\DocBlock\Tags\Throws;

class FileService
{
    public function upload($file, $name = null)
    {
        try {
            if(! $name) $name = md5(rand(0, 9999)).".png";

            Storage::disk('local')->putFileAs('/images/products', $file, $name);
            return $name;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete($file)
    {
        return Storage::delete("images/products/{$file}");
    }

    public function getImage($file)
    {
        return Storage::get("images/products/{$file}");
    }
}