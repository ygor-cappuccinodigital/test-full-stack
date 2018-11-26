<?php

namespace App\Http\Controllers;

use App\Post;
use App\Product;
use App\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $users = User::count();
        $products = Product::count();
        $posts = Post::count();

        return response([
            'status' => 200,
            'data' => [
                'users' => $users,
                'products' => $products,
                'posts' => $posts
            ]
        ]);
    }
}
