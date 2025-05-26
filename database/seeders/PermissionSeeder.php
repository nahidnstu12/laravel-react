<?php

namespace Database\Seeders;

use App\Enums\GroupPermissionsEnum;

use App\Enums\LevelPermissionsEnum;
use App\Enums\PermissionsEnum;
use App\Enums\SectionPermissionsEnum;
use App\Enums\ShiftPermissionsEnum;
use App\Enums\StudentPermissionsEnum;
use App\Enums\SubjectPermissionsEnum;
use App\Enums\TeacherPermissionsEnum;
use Illuminate\Database\Seeder;
use App\Enums\UserPermissionsEnum;
use App\Enums\InstitutionPermissionsEnum;
use App\Enums\ModulesEnum;
use App\Enums\NoticePermissionsEnum;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
  public function run(): void
  {
    // Reset cached roles and permissions
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    // Batch create all permissions
    $allPermissions = [];
    foreach ($this->getPermissionEnums() as $enumData) {
      foreach ($enumData['enum']::cases() as $permissionName) {
        foreach (['web', 'api'] as $guard) {
          $allPermissions[] = [
            'name' => $permissionName->value,
            'module' => $enumData['module'],
            'guard_name' => $guard,
            'created_at' => now(),
            'updated_at' => now()
          ];
        }
      }
    }

    // Bulk insert all permissions
    DB::table('permissions')->insert($allPermissions);
  }

  private function getPermissionEnums(): array
  {
    return [
      ['enum' => PermissionsEnum::class, 'module' => ModulesEnum::PERMISSION],
      ['enum' => UserPermissionsEnum::class, 'module' => ModulesEnum::USER],
      ['enum' => InstitutionPermissionsEnum::class, 'module' => ModulesEnum::INSTITUTION],
      ['enum' => LevelPermissionsEnum::class, 'module' => ModulesEnum::LEVEL],
      ['enum' => GroupPermissionsEnum::class, 'module' => ModulesEnum::GROUP],
      ['enum' => SectionPermissionsEnum::class, 'module' => ModulesEnum::SECTION],
      ['enum' => ShiftPermissionsEnum::class, 'module' => ModulesEnum::SHIFT],
      ['enum' => SubjectPermissionsEnum::class, 'module' => ModulesEnum::SUBJECT],
      ['enum' => TeacherPermissionsEnum::class, 'module' => ModulesEnum::TEACHER],
      ['enum' => StudentPermissionsEnum::class, 'module' => ModulesEnum::STUDENT],
      ['enum' => NoticePermissionsEnum::class, 'module' => ModulesEnum::NOTICE],
    ];
  }
}

