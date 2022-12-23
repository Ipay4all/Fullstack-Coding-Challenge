<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class CreateProductRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'product_id' => 'required|integer|unique:product,product_id,'.$this->id,
            'product_name' => 'required|max:2000',
            'sender_fee' => 'required',
            'sender_fee_percentage' => 'required',
            'denomination_type' => 'required',
            'recipient_currency_code' => 'required',
            'logoUrls' => 'required',
            'brand' => 'required',
            'country' => 'required',
            'redeem_instruction' => 'required'
        ];
    }

    public function getProduct() : Product
    {
        $logoUrls = [];
        if($this->file('logoUrls') !== null){
            $extension = $this->file('logoUrls')->getClientOriginalExtension();
            $path = $this->file('logoUrls')->storeAs('logos', 'logo_'.time().'.'.$extension);
            $logoUrls = [Storage::url($path)];
        }
        return new Product([
            'product_id' => $this->product_id,
            'product_name' => $this->product_name,
            'sender_fee' => $this->sender_fee,
            'sender_fee_percentage' => $this->sender_fee_percentage,
            'denomination_type' => $this->denomination_type,
            'recipient_currency_code' => $this->recipient_currency_code,
            'logoUrls' => $logoUrls,
            'brand' => $this->brand,
            'country' => $this->country,
            'redeem_instruction' => $this->redeem_instruction
        ]);
    }
    
}