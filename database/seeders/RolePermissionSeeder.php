<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enums\ModulesEnum;
use App\Enums\NoticePermissionsEnum;
use App\Enums\TeacherPermissionsEnum;
use App\Enums\StudentPermissionsEnum;
use App\Enums\InstitutionPermissionsEnum;

class RolePermissionSeeder extends Seeder
{
    private function getRolePermissions(): array
    {
        return [
            'institution' => [
                ModulesEnum::INSTITUTION->value => InstitutionPermissionsEnum::cases(),
                ModulesEnum::TEACHER->value => TeacherPermissionsEnum::cases(),
                ModulesEnum::STUDENT->value => StudentPermissionsEnum::cases(),
                ModulesEnum::NOTICE->value => [
                    NoticePermissionsEnum::INSTITUTION_NOTICE_CREATE,
                    NoticePermissionsEnum::INSTITUTION_NOTICE_LIST,
                    NoticePermissionsEnum::INSTITUTION_SHOW,
                    NoticePermissionsEnum::INSTITUTION_EDIT,
                    NoticePermissionsEnum::INSTITUTE_DELETE,
                ],
            ],
            'teacher' => [
                ModulesEnum::NOTICE->value => [
                    NoticePermissionsEnum::TEACHER_NOTICE_CREATE,
                    NoticePermissionsEnum::TEACHER_NOTICE_LIST,
                    NoticePermissionsEnum::TEACHER_SHOW,
                    NoticePermissionsEnum::TEACHER_EDIT,
                    NoticePermissionsEnum::TEACHER_DELETE,
                ],
            ],
            'student' => [
                ModulesEnum::NOTICE->value => [
                    NoticePermissionsEnum::STUDENT_NOTICE_LIST,
                    NoticePermissionsEnum::STUDENT_SHOW,
                ],
            ]
        ];
    }

    public function run(): void
    {
        foreach (['web', 'api'] as $guard) {
            // Setup super admin role
            $this->setupSuperAdminRole($guard);

            // Create regular roles and assign permissions
            foreach ($this->getRolePermissions() as $roleName => $modulePermissions) {
                $role = Role::firstOrCreate([
                    'name' => $roleName,
                    'guard_name' => $guard
                ]);

                $permissionNames = collect($modulePermissions)
                    ->flatten()
                    ->map(fn($permission) => $permission->value)
                    ->toArray();

                $permissions = Permission::where('guard_name', $guard)
                    ->whereIn('name', $permissionNames)
                    ->get();

                $role->syncPermissions($permissions);
            }
        }
    }

    private function setupSuperAdminRole(string $guard): void
    {
        $role = Role::firstOrCreate([
            'name' => 'super_admin',
            'guard_name' => $guard
        ]);

        $allPermissions = Permission::where('guard_name', $guard)->get();
        $role->syncPermissions($allPermissions);
    }
}
