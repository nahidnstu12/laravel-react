<?php

namespace Database\Factories;

use App\Models\InstitutionInfo;
use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;

class InstitutionInfoFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = InstitutionInfo::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'institution_id' => Institution::factory(),
      'details' => json_encode([
        'founding_year' => $this->faker->year,
        'motto' => $this->faker->sentence,
        'accreditation' => $this->faker->word,
        'contact_info' => [
          'email' => $this->faker->email,
          'phone' => $this->faker->phoneNumber,
        ],
      ]),
      'brief_story' => $this->faker->paragraph,
      'current_students' => json_encode([
        'total' => $this->faker->numberBetween(100, 2000),
        'undergraduate' => $this->faker->numberBetween(50, 1500),
        'postgraduate' => $this->faker->numberBetween(50, 500),
      ]),
    ];
  }
}
