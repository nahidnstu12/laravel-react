<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use App\Models\Institution;
use App\Models\Level;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory {
    protected $model = Student::class;

    public function definition(): array {
        return [
            'user_id' => User::factory(),
            'institution_id' => Institution::factory(),
            'level_id' => Level::factory(),
            'roll_no' => $this->faker->unique()->numberBetween(1, 100),
            'status' => true,
            'section_id' => Section::factory(),

        ];
    }
}
