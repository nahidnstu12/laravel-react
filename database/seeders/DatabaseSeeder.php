<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
  public function run(): void
  {
    // Start transaction
    DB::beginTransaction();

    try {
      // Disable foreign key constraints
      Schema::disableForeignKeyConstraints();

      // Truncate tables individually
      $tables = [
        'users',
        'levels',
        'institutions',
        'subjects',
        'teachers',
      ];

      foreach ($tables as $table) {
        DB::table($table)->truncate();
      }

      // Re-enable foreign key constraints
      Schema::enableForeignKeyConstraints();

      // Run seeders
      $this->call([
        InstitutionSeeder::class,
      ]);

      DB::commit();
    } catch (\Exception $e) {
      DB::rollBack();
      throw $e;
    }
  }
}
