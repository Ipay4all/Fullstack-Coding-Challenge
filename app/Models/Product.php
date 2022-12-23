<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'product';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_id',
        'product_name',
        'sender_fee',
        'sender_fee_percentage',
        'denomination_type',
        'recipient_currency_code',
        'logoUrls',
        'brand',
        'country',
        'redeem_instruction'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'logoUrls' => 'array',
    ];
}
