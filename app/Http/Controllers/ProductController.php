<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductRequest;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return $this->success(null, [
            'data' => product::all()->toArray()
        ]);
    }

    public function create(CreateProductRequest $request)
    {
        $product = $request->getProduct();
        $product->save();

        return $this->success('Product created.', [
            'data' => $product->id
        ]);
    }

    public function update(CreateProductRequest $request)
    {
        $product = Product::findOrFail($request->get('id'));
        $request->validated();
        $newData = $request->all();
        if($request->file('logoUrls') !== null){
            $extension = $request->file('logoUrls')->getClientOriginalExtension();
            $path = $request->file('logoUrls')->storeAs('logos', 'logo_'.time().'.'.$extension);
            $newData['logoUrls'] = [Storage::url($path)];
        }else{
            $newData['logoUrls'] = $product->logoUrls;
        }

        $product->update($newData);

        return $this->success('Product updated.', [
            'data' => $product->id
        ]);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return $this->success('Product deleted.');
    }
}
