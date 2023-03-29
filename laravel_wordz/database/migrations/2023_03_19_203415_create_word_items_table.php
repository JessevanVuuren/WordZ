<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('word_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("word_list_id");
            $table->string("word");
            $table->string("translation");
            $table->foreign("word_list_id")->references("id")->on("word_lists")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('word_items');
    }
};
