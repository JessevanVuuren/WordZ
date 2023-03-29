<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            "name" => "required|string",
            "email" => "required|string|unique:users,email",
            "password" => "required|string|confirmed|min:6"
        ]);

        $user = User::create([
            "name" => $fields["name"],
            "email" => $fields["email"],
            "password" => bcrypt($fields["password"])
        ]);

        $token = $user->createToken("myapptoken")->plainTextToken;

        $response = [
            "message" => "Valid token",
            "user" => $user,
            "token" => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            "email" => "required|string",
            "password" => "required|string|min:6"
        ]);

        $user = User::where("email", $fields["email"])->first();

        if (!$user || !Hash::check($fields["password"], $user->password)) {
            return response([
                "message" => "Invalid credentials"
            ], 401);
        }

        $token = $user->createToken("myapptoken")->plainTextToken;

        $response = [
            "message" => "Valid token",
            "user" => $user,
            "token" => $token
        ];

        return response($response, 201);
    }


    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            "message" => "Logged out"
        ];        
    }

    public function validate_token(Request $request)
    {
        $token = $request->bearerToken();
        $model = Sanctum::$personalAccessTokenModel;
        $user_model = $model::findToken($token);
        
        if ($user_model) {
            $user = User::where("id", $user_model->tokenable_id)->first();
            return response([
                "message" => "Valid token",
                "user" => $user,
                "token" => $token
            ], 200);
        }
        return response([
            "message" => "Invalid token"
        ], 401);
    }
}
