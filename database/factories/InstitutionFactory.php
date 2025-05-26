<?php

namespace Database\Factories;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class InstitutionFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Institution::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'user_id' => User::factory(),
      'uuid' => (string) Str::uuid(),
      'name' => $this->faker->company,
      'registration_no' => $this->faker->unique()->numberBetween(100000, 999999),
      'no_of_students' => $this->faker->numberBetween(50, 2000),
      'no_of_teachers' => $this->faker->numberBetween(5, 200),
      'type' => $this->faker->randomElement(['primary', 'secondary', 'tertiary']),
      // 'cover_photo' => $this->faker->randomElement(['3', '2', '1']),
      // 'logo' => $this->faker->randomElement(['3', '2', '1']),
      'location' => $this->faker->address,
      'status' => true,
      'limit' => $this->faker->numberBetween(100, 10000),
    ];
  }
}
