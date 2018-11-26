<?php

namespace App\Http\Controllers;

use App\Product;
use App\Services\FileService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Mockery\Exception;

class ProductController extends Controller
{
    private $productService;
    private $fileService;

    public function __construct(
        ProductService $productService,
        FileService $fileService
    )
    {
        $this->productService = $productService;
        $this->fileService = $fileService;

//        $this->middleware('jwt.auth');
    }

    public function index()
    {
        try {

            $products = $this->productService->all();

            return response([
                'status' => 200,
                'data' => $products,
            ]);
        } catch (Exception $e) {
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
        try {
            $inputs = $request->all();
            // Para criar o produto
            if (! isset($inputs['id'])) {
                if ($request->file('photo')) {
                    $inputs['photo'] = $this->fileService->upload($request->file('photo'));
                } else {
                    unset($inputs['photo']);
                }
                $product = $this->productService->create($inputs);

                return response([
                    'status' => 200,
                    'data' => $product,
                    'message' => 'Produto adicionado com sucesso',
                    'icon' => 'success'
                ]);
            // Para editar
            } else {
                $product = $this->productService->find($inputs['id']);
                if ($request->file('photo')) {
                    $this->fileService->delete($product['photo']);

                    $inputs['photo'] = $this->fileService->upload($request->file('photo'));

                    $product = $this->productService->update($product, $inputs);
                } else {
                    $product = $this->productService->update($product, $inputs);
                }

                return response([
                    'status' => 200,
                    'data' => $product,
                    'message' => 'Alterações realizadas com sucesso',
                    'icon' => 'success'
                ]);
            }

        } catch (\Exception $e) {
            return response([
                'status' => 500,
                'data' => '',
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()
            ]);
        }
    }

    public function show(Product $product)
    {
        $product->load('categories');

        return response([
            'status' => 200,
            'data' => $product,
        ]);
    }

    public function destroy(Product $product)
    {
        if (isset($product->photo)) $this->fileService->delete($product->photo);
        if ($product->categories()->count() > 0) $product->categories()->detach();
        $product->delete();

        return response([
            'status' => 200,
            'data' => '',
            'message' => 'Produto deletado com sucesso',
            'icon' => 'success'
        ]);
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
