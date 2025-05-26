<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Institution;
use App\Models\Level;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class InstitutionSeeder extends Seeder
{
  public function run(): void
  {
    // Wrap everything in a transaction
    DB::beginTransaction();

    try {
      // Create 12 institutions
      for ($i = 1; $i <= 12; $i++) {
        // Create admin user for institution
        $adminUser = User::factory()->create([
          // 'first_name' => "Institution",
          // 'last_name' => "Admin {$i}",
          'name' => "Institution Admin {$i}",
          'email' => "institution{$i}@example.com",
        ]);

        // Create the institution with its admin user
        $institution = Institution::factory()->create([
          'user_id' => $adminUser->id,
          'name' => "Institution {$i}",
          'registration_no' => "REG" . str_pad($i, 5, '0', STR_PAD_LEFT),
          'no_of_teachers' => 10,
        ]);

        // Create 3 levels for each institution
        $levels = [];
        for ($j = 1; $j <= 3; $j++) {
          $levels[] = Level::factory()->create([
            'institution_id' => $institution->id,
            'name' => "Level {$j}",
          ]);
        }

        // Create 10 teachers for each institution
        for ($k = 1; $k <= 10; $k++) {
          // Create teacher user
          $teacherUser = User::factory()->create([
            // 'first_name' => "Teacher",
            // 'last_name' => "{$k} of Institution {$i}",
            'name' => "Teacher {$k} of Institution {$i}",
            'email' => "teacher{$k}_inst{$i}@example.com",
          ]);

          Teacher::factory()->create([
            'institution_id' => $institution->id,
            'user_id' => $teacherUser->id,
            'pds_id' => "PDS" . str_pad($k, 5, '0', STR_PAD_LEFT),
          ]);
        }

        // Create 5 subjects for each institution (associated with the first level)
        $subjects = [
          'Mathematics',
          'Science',
          'English',
          'History',
          'Geography'
        ];

        foreach ($subjects as $subject) {
          Subject::factory()->create([
            'institution_id' => $institution->id,
            'level_id' => $levels[0]->id,
            'name' => $subject,
            'description' => "Description for {$subject}",
          ]);
        }
      }

      DB::commit();
    } catch (\Exception $e) {
      DB::rollBack();
      throw $e;
    }
  }
}
