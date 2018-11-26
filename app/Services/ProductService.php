<?php

namespace App\Services;

use App\Product;
use App\CategoryProduct;
use App\Services\FileService;


class ProductService
{
    private $product;
    private $category;

    private $fileService;

    public function __construct(
        Product $product,
        CategoryProduct $categoryProduct,
        FileService $fileService
    )
    {
        $this->product = $product;
        $this->category = $categoryProduct;
        $this->fileService = $fileService;
    }

    public function all()
    {
        $products = $this->product->all()->load('categories');

        return $products;
    }

    public function find($id)
    {
        $product = $this->product->find($id);

        return $product;
    }

    public function create($inputs)
    {
        $product = $this->product->fill($inputs);
        $product->save();

        $categories = json_decode($inputs['categories']);
        $product->categories()->sync($categories);

        $product->load('categories');

        return $product;
    }

    public function update($product, $params)
    {
        if (isset($params['categories'])) {
            $categories = json_decode($params['categories']);
            $product->categories()->sync($categories);
        }

        $product->fill($params);
        $product->save();

        return $product;
    }
}