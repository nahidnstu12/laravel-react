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
    Schema::create('teachers', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('institution_id');
      $table->unsignedBigInteger('user_id');
      $table->string('pds_id')->nullable();
      $table->string('designation')->nullable();
      $table->string('joining_date')->nullable();
      $table->string('address')->nullable();
      $table->string('district')->nullable();
      $table->boolean('status')->default(true);
      $table->timestamps();
      
      $table->foreign('institution_id')->references('id')->on('institutions')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('teachers');
  }
};
