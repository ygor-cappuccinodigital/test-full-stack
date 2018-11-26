<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryPostController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        try {
            $categories = $this->categoryService->getPostsCategories();

            return response([
                'status'    => 200,
                'data'      => $categories
            ]);
        } catch (\Exception $e) {
            return response([
                'status' => 500,
                'data' => '',
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ]);
        }
    }

    public function store(Request $request)
    {
        return response([
            'status' => 200,
            'data' => $this->categoryService->createPostCategory($request->all())
        ]);
    }

    public function destroy($id) {
        return response([
            'status' => 200,
            'data' => $this->categoryService->postDelete($id),
            'message' => 'Categoria deletada com sucesso',
            'icon' => 'success'
        ]);
    }
}
