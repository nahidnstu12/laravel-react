<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Level;
use App\Models\Notice;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\Institution;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Models\Section;
use App\Models\Student;
use App\Models\TeacherAssign;

class RoleSeeder extends Seeder
{
  public function run(): void
  {
    // Create users and store User objects
    $userObjects = [];
    $userData = [
      'super_admin' => [
        'first_name' => 'Super',
        'last_name' => 'Admin',
        'email' => 'super_admin@mail.com'
      ],
      'institution' => [
        'first_name' => 'The',
        'last_name' => 'institution',
        'email' => 'institution@mail.com'
      ],
      'teacher' => [
        'first_name' => 'regular',
        'last_name' => 'teacher',
        'email' => 'teacher@mail.com'
      ],
      'student' => [
        'first_name' => 'regular',
        'last_name' => 'student',
        'email' => 'student@mail.com'
      ],
    ];

    // Create users and store them
    foreach ($userData as $roleName => $data) {
      $user = User::create([
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'phone' => '01831767309',
        'email' => $data['email'],
        'status' => true,
        'password' => Hash::make('password123')
      ]);

      // Assign roles
    //   foreach (
    //     [
    //       'web',
    //       'api'
    //     ] as $guard
    //   ) {
    //     $role = Role::where([
    //       'name' => $roleName,
    //       'guard_name' => $guard
    //     ])->firstOrFail();
    //     $user->assignRole($role);
    //   }

    //   $userObjects[$roleName] = $user;
    // }

    // // Get all roles
    // $roles = [];
    // foreach (['web', 'api'] as $guard) {
    //   foreach (['super_admin', 'institution', 'teacher', 'student'] as $roleName) {
    //     $roles[$roleName][$guard] = Role::where([
    //       'name' => $roleName,
    //       'guard_name' => $guard
    //     ])->firstOrFail();
    //   }
    }

    // Create institution and related data
    Institution::factory(1)->create(['user_id' => $userObjects['institution']->id, 'name' => 'ABC Institute'])
      ->each(function ($institution) use ($userObjects, $roles) {
        $levels = Level::factory(1)->create(['institution_id' => $institution->id]);
        $firstLevel = $levels->first();

        $teacher = Teacher::factory()->create([
          'user_id' => $userObjects['teacher']->id,
          'institution_id' => $institution->id
        ]);

        // $sections = Section::factory(2)->create([
        //   'level_id' => $firstLevel->id,
        // ]);

        // Student::factory(1)->create([
        //   'user_id' => $userObjects['student']->id,
        //   'institution_id' => $institution->id,
        //   'roll_no' => 1,
        //   'status' => true,
        //   'level_id' => $firstLevel->id,
        //   'section_id' => $sections->first()->id,
        // ]);

        $levels->each(function ($level) use ($institution, $teacher, $sections, $userObjects, $roles) {
          // $teacher->levels()->attach($level);

          $subjects = Subject::factory(2)->create([
            'level_id' => $level->id,
            'institution_id' => $institution->id
          ]);

          // Assign teachers to subjects and sections using teacher_assigns table
          // TeacherAssign::create([
          //   'teacher_id' => $teacher->id,
          //   'level_id' => $level->id,
          //   'subject_id' => $subjects->first()->id,
          //   'section_id' => $sections->first()->id,
          // ]);


          // foreach ($subjects as $subject) {
          //   // $teacher->subjects()->attach($subject);

          //   // Section-specific notices for students
          //   Notice::factory(2)->create([
          //     'institution_id' => $institution->id,
          //     'level_id' => $level->id,
          //     'subject_id' => $subject->id,
          //     'created_by' => $userObjects['teacher']->id,
          //     'group_id' => null,
          //     'section_id' => $sections->first()->id,
          //     'shift_id' => null
          //   ])->each(function ($notice) use ($roles) {
          //     $notice->roles()->attach([
          //       $roles['student']['web']->id,
          //       $roles['student']['api']->id
          //     ]);
          //   });
          // }
        });

        // Teacher-personal notices
        // Notice::factory(2)->create([
        //   'institution_id' => $institution->id,
        //   'created_by' => $userObjects['institution']->id,
        //   'level_id' => null,
        //   'subject_id' => null,
        //   'group_id' => null,
        //   'section_id' => null,
        //   'shift_id' => null
        // ])->each(function ($notice) use (
        //   $userObjects,
        //   $roles
        // ) {
        //   $notice->users()->attach($userObjects['teacher']->id);
        //   $notice->roles()->attach([
        //     $roles['teacher']['web']->id,
        //     $roles['teacher']['api']->id
        //   ]);
        // });

        // // All-Teacher notices
        // Notice::factory(2)->create([
        //   'institution_id' => $institution->id,
        //   'created_by' => $userObjects['institution']->id,
        //   'level_id' => null,
        //   'subject_id' => null,
        //   'group_id' => null,
        //   'section_id' => null,
        //   'shift_id' => null
        // ])->each(function ($notice) use ($roles) {
        //   $notice->roles()->attach([
        //     $roles['teacher']['web']->id,
        //     $roles['teacher']['api']->id
        //   ]);
        // });

        // Create general notices
        // Notice::factory(3)->create([
        //   'institution_id' => $institution->id,
        //   'created_by' => $userObjects['institution']->id,
        //   'level_id' => null,
        //   'subject_id' => null,
        //   'group_id' => null,
        //   'section_id' => null,
        //   'shift_id' => null
        // ]);
      });
  }
}


// class RoleSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // Create super admin user
//         $superAdminUser = User::create([
//             'first_name' => 'Super',
//             'last_name' => 'Admin',
//             'phone' => '01831767309',
//             'email' => 'super_admin@mail.com',
//             'status' => true,
//             'password' => Hash::make('password123')
//         ]);

//         // Assign super admin role
//         foreach (['web', 'api'] as $guard) {
//             $role = Role::where([
//                 'name' => 'super_admin',
//                 'guard_name' => $guard
//             ])->firstOrFail();
//             $superAdminUser->assignRole($role);
//         }

//         // Get all roles for both guards
//         $roles = [];
//         foreach (['web', 'api'] as $guard) {
//             foreach (['super_admin', 'institution', 'teacher', 'student'] as $roleName) {
//                 $roles[$roleName][$guard] = Role::where([
//                     'name' => $roleName,
//                     'guard_name' => $guard
//                 ])->firstOrFail();
//             }
//         }

//         // Create 5 institutions
//         for ($i = 1; $i <= 5; $i++) {
//             // Create institution user
//             $institutionUser = User::create([
//                 'first_name' => "Institution{$i}",
//                 'last_name' => 'Admin',
//                 'phone' => "018317673{$i}0",
//                 'email' => "institution{$i}@mail.com",
//                 'status' => true,
//                 'password' => Hash::make('password123')
//             ]);

//             // Assign institution role
//             foreach (['web', 'api'] as $guard) {
//                 $institutionUser->assignRole($roles['institution'][$guard]);
//             }

//             // Create institution
//             $institution = Institution::factory()->create([
//                 'user_id' => $institutionUser->id
//             ]);

//             // Create 2 levels for each institution
//             for ($l = 1; $l <= 2; $l++) {
//                 $level = Level::factory()->create([
//                     'institution_id' => $institution->id
//                 ]);

//                 // Create 2 sections for each level
//                 for ($s = 1; $s <= 2; $s++) {
//                     $section = Section::factory()->create([
//                         'level_id' => $level->id,
//                     ]);

//                     // Create student for this section
//                     $studentUser = User::create([
//                         'first_name' => "Student{$i}{$l}{$s}",
//                         'last_name' => "Section{$section->id}",
//                         'phone' => "018317674{$i}{$l}{$s}",
//                         'email' => "student{$i}{$l}{$s}@mail.com",
//                         'status' => true,
//                         'password' => Hash::make('password123')
//                     ]);

//                     // Assign student role
//                     foreach (['web', 'api'] as $guard) {
//                         $studentUser->assignRole($roles['student'][$guard]);
//                     }

//                     // Create student
//                     Student::factory()->create([
//                         'user_id' => $studentUser->id,
//                         'institution_id' => $institution->id,
//                         'roll_no' => fake()->unique()->numberBetween(1, 1000),
//                         'status' => true,
//                         'level_id' => $level->id,
//                         'section_id' => $section->id,
//                     ]);

//                     // Create 2 subjects for each section
//                     for ($sub = 1; $sub <= 2; $sub++) {
//                         $subject = Subject::factory()->create([
//                             'institution_id' => $institution->id,
//                             'level_id' => $level->id
//                         ]);

//                         // Create teacher for this subject
//                         $teacherUser = User::create([
//                             'first_name' => "Teacher{$i}{$l}{$s}{$sub}",
//                             'last_name' => "Subject{$subject->id}",
//                             'phone' => "018317673{$i}{$l}{$s}{$sub}",
//                             'email' => "teacher{$i}{$l}{$s}{$sub}@mail.com",
//                             'status' => true,
//                             'password' => Hash::make('password123')
//                         ]);

//                         // Assign teacher role
//                         foreach (['web', 'api'] as $guard) {
//                             $teacherUser->assignRole($roles['teacher'][$guard]);
//                         }

//                         // Create teacher
//                         $teacher = Teacher::factory()->create([
//                             'user_id' => $teacherUser->id,
//                             'institution_id' => $institution->id
//                         ]);

//                         // Assign teacher to subject and section
//                         TeacherAssign::create([
//                             'teacher_id' => $teacher->id,
//                             'level_id' => $level->id,
//                             'subject_id' => $subject->id,
//                             'section_id' => $section->id,
//                         ]);

//                         // Create subject-specific notices
//                         Notice::factory(2)->create([
//                             'institution_id' => $institution->id,
//                             'level_id' => $level->id,
//                             'subject_id' => $subject->id,
//                             'created_by' => $teacherUser->id,
//                             'section_id' => $section->id,
//                             'group_id' => null,
//                             'shift_id' => null
//                         ])->each(function ($notice) use ($roles) {
//                             $notice->roles()->attach([
//                                 $roles['student']['web']->id,
//                                 $roles['student']['api']->id
//                             ]);
//                         });
//                     }
//                 }
//             }

//             // Create institution-wide notices
//             Notice::factory(3)->create([
//                 'institution_id' => $institution->id,
//                 'created_by' => $institutionUser->id,
//                 'level_id' => null,
//                 'subject_id' => null,
//                 'group_id' => null,
//                 'section_id' => null,
//                 'shift_id' => null
//             ]);

//             // Create teacher-specific notices
//             Notice::factory(2)->create([
//                 'institution_id' => $institution->id,
//                 'created_by' => $institutionUser->id,
//                 'level_id' => null,
//                 'subject_id' => null,
//                 'group_id' => null,
//                 'section_id' => null,
//                 'shift_id' => null
//             ])->each(function ($notice) use ($roles) {
//                 $notice->roles()->attach([
//                     $roles['teacher']['web']->id,
//                     $roles['teacher']['api']->id
//                 ]);
//             });
//         }
//     }
// }
