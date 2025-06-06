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
    Schema::create('subjects', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('institution_id');
      $table->unsignedBigInteger('level_id');
      $table->string('name');
      $table->string('description')->nullable();
      $table->boolean('status')->default(true);
      $table->timestamps();
      
      $table->foreign('institution_id')->references('id')->on('institutions')->onDelete('cascade');
      $table->foreign('level_id')->references('id')->on('levels')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('subjects');
  }
};
