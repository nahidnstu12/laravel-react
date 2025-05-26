<?php

namespace Database\Factories;

use App\Models\Level;
use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;

class LevelFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Level::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'institution_id' => Institution::factory(),
      'name' => $this->faker->word,
      'status' => true,
    ];
  }
}
