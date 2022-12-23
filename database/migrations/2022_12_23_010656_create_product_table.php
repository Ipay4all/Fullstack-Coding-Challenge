<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->string('product_name');
            $table->float('sender_fee')->default(0);
            $table->float('sender_fee_percentage');
            $table->string('denomination_type');
            $table->string('recipient_currency_code');
            $table->json('logoUrls')->nullable();
            $table->string('brand');
            $table->string('country')->default('AE');
            $table->text('redeem_instruction')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};