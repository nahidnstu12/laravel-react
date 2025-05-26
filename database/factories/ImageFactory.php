<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\Institution;
use Illuminate\Database\Eloquent\Factories\Factory;

class ImageFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Image::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'path' => $this->faker->randomElement(['1.png', '2.png', '3.png']),
    ];
  }
}
