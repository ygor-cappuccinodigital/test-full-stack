<?php

namespace App\Http\Controllers;

use App\CategoryProduct;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryProductController extends Controller
{
    private $categoryService;

    public function __construct(
        CategoryService $categoryService
    )
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        try {
            $categories = $this->categoryService->getProductsCategories();

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
            'data' => $this->categoryService->createProductCategory($request->all())
        ]);
    }

    public function destroy($id) {
        return response([
            'status' => 200,
            'data' => $this->categoryService->productDelete($id),
            'message' => 'Categoria deletada com sucesso',
            'icon' => 'success'
        ]);
    }
}
