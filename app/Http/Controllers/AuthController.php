<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AuthController extends Controller
{
    private $user;

    public function __construct(
        User $user
    )
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) return response()->json(['error' => 'invalid_credentials'], 401);
            $user = JWTAuth::toUser($token);
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response([
            'status' => '200',
            'data' => [
                'token' => $token,
                'user' => $user
            ]
        ]);
    }

    public function register(Request $request)
    {
        try {
            if ($this->user->where('email', $request->email)->first()) throw new \Exception('E-mail já cadastrado');

            $user = $this->user->create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            return response([
                'status' => 200,
                'data' => '',
                'message' => 'Usuário registrado com sucesso'
            ]);
        } catch (\Exception $e) {
            return response([
                'status' => 500,
                'data' => '',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getAuthenticatedUser()
    {
        $user = JWTAuth::parseToken()->authenticate();
        return response([
            'user' => $user
        ]);
    }
}