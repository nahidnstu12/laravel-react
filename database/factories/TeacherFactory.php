<?php

namespace Database\Factories;

use App\Models\Teacher;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeacherFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Teacher::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'institution_id' => Institution::factory(),
      'user_id' => User::factory(),
      'pds_id' => $this->faker->uuid,
      'designation' => $this->faker->jobTitle,
      'joining_date' => $this->faker->date(),
      'address' => $this->faker->address,
      'district' => $this->faker->city,
      'status' => true,
    ];
  }
}
