<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function success($message = null, $data = [])
    {
        return response()->json(array_merge([
            'type' => 'success',
        ], $message ? [
            'message' => $message,
        ] : [], $data));
    }

    public function error($message = null, $data = [], $statusCode = 400)
    {
        return response()->json(array_merge([
            'type' => 'error',
        ], $message ? [
            'message' => $message,
        ] : [], $data), $statusCode);
    }
}
