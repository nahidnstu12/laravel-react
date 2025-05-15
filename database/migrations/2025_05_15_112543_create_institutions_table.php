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
    Schema::create('institutions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->uuid('uuid');
      $table->string('name');
      $table->string('registration_no')->nullable();
      $table->integer('no_of_students')->nullable();
      $table->integer('no_of_teachers')->nullable();
      $table->string('type')->default("primary"); // have to make it integer
      $table->unsignedBigInteger('cover_photo')->nullable();
      $table->unsignedBigInteger('logo')->nullable();
      $table->string('location')->nullable();
      $table->boolean('status')->default(true);
      $table->integer('limit')->nullable();
      $table->json('extra_infos')->nullable();
      $table->timestamps();
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('cover_photo')->references('id')->on('images')->onDelete('cascade');
      $table->foreign('logo')->references('id')->on('images')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('institutions');
  }
};
