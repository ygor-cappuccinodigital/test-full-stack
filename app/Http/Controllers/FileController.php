<?php

namespace App\Http\Controllers;

use App\Services\FileService;

class FileController extends Controller
{
    private $fileService;

    public function __construct(
        FileService $fileService
    )
    {
        $this->fileService = $fileService;
    }

    public function getImage($path)
    {
        try {
            $image = $this->fileService->getImage($path);

            return response($image)
                ->header('Content-Type', 'image/png')
                ->header('Pragma', 'public')
                ->header('Cache-Control', 'max-age=60, must-revalidate');
        } catch (\Exception $e) {
            return response([
                'status' => 500,
                'data' => '',
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ]);
        }
    }
}
