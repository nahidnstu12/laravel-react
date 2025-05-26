<?php

namespace Database\Factories;

use App\Models\Subject;
use App\Models\Institution;
use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubjectFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Subject::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'institution_id' => Institution::factory(),
      'level_id' => Level::factory(),
      'name' => $this->faker->word,
      'description' => $this->faker->sentence,
      'status' => true,
    ];
  }
}
