<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Http;

class ImportController extends Controller
{
    public function index()
    {
        $products = $this->fetchProducts();
        if($products){
            Product::truncate(); // Truncate Table
            foreach($products as $product){
                Product::create([
                    'product_id' => $product['productId'],
                    'product_name' => $product['productName'],
                    'sender_fee' => $product['senderFee'],
                    'sender_fee_percentage' => $product['senderFeePercentage'],
                    'denomination_type' => $product['denominationType'],
                    'recipient_currency_code' => $product['recipientCurrencyCode'],
                    'logoUrls' => $product['logoUrls'],
                    'brand' => isset($product['brand']['brandName']) ? $product['brand']['brandName'] : '',
                    'country' => isset($product['country']['name']) ? $product['country']['name'] : 'AE',
                    'redeem_instruction' => isset($product['redeemInstruction']['verbose']) ? $product['redeemInstruction']['verbose'] : '',
                ]);
            }
            return $this->success(count($products)." products imported");
        }
        return $this->error("Something Wrong!");
    }

    private function fetchProducts()
    {
        $tokenResponse = Http::post('https://auth.reloadly.com/oauth/token', [
            'client_id' => '5IlYhQTzSZL3Ax8TtSmMpnEEdCishQEJ',
            'client_secret' => 'rrBf89OkVL-3CX6HtuHnMct9I6sgTe-xtX9XV2dOkDRdIj7ECRBik4RHBCDmh4H',
            'grant_type' => 'client_credentials',
            'audience' => 'https://giftcards-sandbox.reloadly.com'
        ])->json();
        $accessToken = ($tokenResponse && isset($tokenResponse['access_token'])) ? $tokenResponse['access_token'] : '';
        if($accessToken){
            $response = Http::withToken($accessToken)->get("https://giftcards-sandbox.reloadly.com/countries/ae/products")->json();
            return ($response && is_array($response)) ? $response : false;
        }
        return false;
    }
}
