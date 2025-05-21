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
    Schema::create('levels', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('institution_id');
      $table->string('name');
      $table->boolean('status')->default(true);
      $table->timestamps();
      
      $table->foreign('institution_id')->references('id')->on('institutions')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('levels');
  }
};
