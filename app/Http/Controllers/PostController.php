<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use Illuminate\Http\Request;

use App\Post;
use App\Services\FileService;

class PostController extends Controller
{
    private $post;
    private $postService;
    private $fileService;

    public function __construct(
        Post $post,
        FileService $fileService,
        PostService $postService
    )
    {
        $this->post = $post;
        $this->fileService = $fileService;
        $this->postService = $postService;
    }

    public function index()

        
    {
        try {
            $posts = $this->post->all();

            $posts->load('categories');

            return response([
                'status' => 200,
                'data' => $posts,
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
        try {
            $inputs = $request->all();

            // para criar
            if (!isset($inputs['id'])) {
                if (isset($inputs['photo'])) {
                    $inputs['photo'] = $this->fileService->upload($request->file('photo'));
                } else {
                    unset($inputs['photo']);
                }

                $post = $this->postService->create($inputs);

                return response([
                    'status' => 200,
                    'data' => $post,
                    'message' => 'Produto adicionado com sucesso',
                    'icon' => 'success'
                ]);
                // para editar
            } else {
                $product = $this->postService->find($inputs['id']);

                if ($request->file('photo')) {
                    $this->fileService->delete($product['photo']);

                    $inputs['photo'] = $this->fileService->upload($request->file('photo'));

                    $post = $this->postService->update($product, $inputs);
                } else {
                    $post = $this->postService->update($product, $inputs);
                }

                return response([
                    'status' => 200,
                    'data' => $post,
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

    public function show(Post $post)
    {
        $post->load('categories');

        return response([
            'status' => 200,
            'data' => $post
        ]);
    }

    public function destroy(Post $post)
    {
        if (isset($post->photo)) $this->fileService->delete($post->photo);
        $post->categories()->detach();
        $post->delete();

        return response([
            'status' => 200,
            'data' => $post,
            'message' => 'Produto deletado com sucesso',
            'icon' => 'success'
        ]);
    }
}
