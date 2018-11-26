<?php

namespace App\Services;

use App\CategoryPost;
use App\CategoryProduct;

class CategoryService
{
    private $categoryProduct;
    private $categoryPost;

    public function __construct(
        CategoryProduct $categoryProduct,
        CategoryPost $categoryPost
    )
    {
        $this->categoryProduct = $categoryProduct;
        $this->categoryPost = $categoryPost;
    }

    public function getProductsCategories()
    {
        $categories = $this->categoryProduct->all();

        return $categories;
    }

    public function getPostsCategories()
    {
        $posts = $this->categoryPost->all();

        return $posts;
    }

    public function createProductCategory($inputs)
    {
        $category = $this->categoryProduct->fill($inputs);
        $category->save();
        return $category;
    }

    public function createPostCategory($inputs)
    {
        $category = $this->categoryPost->fill($inputs);
        $category->save();
        return $category;
    }

    public function postDelete($id)
    {
        $category = $this->categoryPost->find($id);

        $category->posts()->detach();

        $category->delete();

        return $category;
    }

    public function productDelete($id)
    {
        $category = $this->categoryProduct->find($id);

        $category->products()->detach();

        $category->delete();

        return $category;
    }
}