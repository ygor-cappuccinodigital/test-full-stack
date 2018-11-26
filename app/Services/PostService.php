<?php

namespace App\Services;

use App\CategoryPost;
use App\Post;

class PostService
{
    private $post;
    private $category;

    public function __construct(
        Post $post,
        CategoryPost $categoryPost
    )
    {
        $this->post = $post;
        $this->category = $categoryPost;
    }

    public function create($data)
    {
        $post = $this->post->fill($data);
        $post->save();


        $categories = json_decode($data['categories']);
        $post->categories()->sync($categories);

        $post->load('categories');

        return $post;
    }

    public function find($id) {
        $post = $this->post->find($id);

        return $post;
    }

    public function update($post, $data) {
        $post->fill($data);
        $post->save();


        $categories = json_decode($data['categories']);
        $post->categories()->sync($categories);

        $post->load('categories');

        return $post;
    }
}